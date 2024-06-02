import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import WaitlistEmail from "@/components/emails/waitlist_confirmation";
import { addEmailToWaitlist } from "@/lib/server_endpoints";

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email: string };

  if (!email) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USERNAME,
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
  });

  try {
    const data = await addEmailToWaitlist(email);

    const emailHtml = render(WaitlistEmail({ email }));

    const options = {
      from: `Yaw from JED <${process.env.NEXT_PUBLIC_SMTP_USERNAME}>`,
      to: email,
      subject: "You have been added to the JED waitlist!🎉",
      html: emailHtml,
    };

    const value = await transporter.sendMail(options);

    if (value.accepted.length > 0) {
      return NextResponse.json(
        {
          message:
            "Welcome to the JED waitlist!🎉 A confirmation email has been sent to you.",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
