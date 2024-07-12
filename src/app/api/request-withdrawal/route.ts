import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import RequestWithdrawalEmail from "@/components/emails/recipient_withdrawal_email";
import AdminWithdrawRequestEmail from "@/components/emails/admin_withdrawal_request";

type Withdrawal = {
  user: {
    fullName: string;
    email: string;
  };
  withdrawaldetails: {
    amount: number;
    channel: string;
    accountNumber: string;
    accountName: string;
  };
};
export async function POST(req: NextRequest) {
  const { user, withdrawaldetails } = (await req.json()) as Withdrawal;

  if (!user || !user.email || !user.fullName) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  if (
    Object.keys(withdrawaldetails).some(
      (key) => !withdrawaldetails[key as keyof Withdrawal["withdrawaldetails"]]
    )
  ) {
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
    const emailHtml = render(
      RequestWithdrawalEmail({ user, withdrawaldetails })
    );

    const adminEmailHTML = render(
      AdminWithdrawRequestEmail({ user, withdrawaldetails })
    );

    const creatorOptions = {
      from: `Yaw From JED<${process.env.NEXT_PUBLIC_SMTP_USERNAME}>`,
      to: user.email,
      subject: "Withdrawal Request Receipt",
      html: emailHtml,
    };

    const adminOptions = {
      from: `Yaw From JED<${process.env.NEXT_PUBLIC_SMTP_USERNAME}>`,
      to: [
        "addodiabene69@gmail.com",
        "owusujoshua209@gmail.com",
        "ellaboevans@gmail.com",
      ],
      subject: "New revenue settlement request.",
      html: adminEmailHTML,
    };

    const [value] = await Promise.all([
      transporter.sendMail(creatorOptions),
      transporter.sendMail(adminOptions),
    ]);

    if (value.accepted.length > 0) {
      return NextResponse.json(
        {
          message:
            "Your request has been sent successfully. Check your email for confirmation",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
