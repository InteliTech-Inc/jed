import { NextRequest, NextResponse } from "next/server";
import { generateFilePath, formDataToObject } from "@/lib/utils";
import { Payload } from "@/types/types";
import { updateEvent, uploadImage } from "@/lib/server_endpoints";
import { NextApiRequest } from "next";

export async function POST(req: NextRequest, { query }: NextApiRequest) {
  const { id } = query;

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

  let updatedPayload = {
    name,
    description,
    amount_per_vote,
    voting_period: JSON.parse(voting_period),
    nomination_period: JSON.parse(nomination_period || "{}"),
    user_id,
    is_completed,
    img_url: "",
  };

  if (img_file) {
    const { filePath } = generateFilePath(img_file);
    updatedPayload = { ...updatedPayload, img_url: filePath };
    const imageRes = await uploadImage({ file: img_file, path: filePath });
    if (imageRes instanceof Error) {
      return NextResponse.json(
        { message: "Something went wrong with the image upload" },
        { status: 400 }
      );
    }
  }

  const eventRes = await updateEvent(id as string, updatedPayload);

  if (eventRes instanceof Error) {
    return NextResponse.json(
      { message: "Something went wrong with updating the event" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: eventRes }, { status: 200 });
}
