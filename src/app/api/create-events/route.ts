import { NextRequest, NextResponse } from "next/server";
import { generateFilePath, formDataToObject } from "@/lib/utils";
import { Payload } from "@/types/types";
import { createEvent, uploadImage } from "@/lib/server_endpoints";
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const {
    name,
    description,
    amount_per_vote,
    voting_period,
    nomination_period,
    img_file,
    user_id,
    is_completed,
  } = formDataToObject(formData) as unknown as Payload;

  const { filePath } = generateFilePath(img_file);

  const updatedPayload = {
    name,
    description,
    amount_per_vote,
    voting_period: JSON.parse(voting_period),
    nomination_period: JSON.parse(nomination_period || "{}"),
    img_url: filePath,
    user_id,
    is_completed,
  };

  const [imageRes, eventRes] = await Promise.all([
    uploadImage({ file: img_file, path: filePath }),
    createEvent(updatedPayload),
  ]);

  if (imageRes instanceof Error || eventRes instanceof Error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: eventRes }, { status: 201 });
}
