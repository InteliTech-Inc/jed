import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";
import * as React from "react";

interface WaitlistEmailProps {
  email: string;
}

export const WaitlistEmail = ({ email }: WaitlistEmailProps) => {
  const previewText = `Welcome to JED 🎉🎊`;

  return (
    <Html>
      <Head />
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://cbboxofzpwjfpihaoyhn.supabase.co/storage/v1/object/public/events/static/logo.png`}
                width="80"
                height="37"
                alt="JED"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to JED 🎉🎊
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              We appreciate your interest in joining the JED waitlist, the best
              platform for planning events! Having you on board makes us very
              happy, and we can't wait to show you all the incredible things
              we've been building.
            </Text>
            <Section className="bg-green-50 p-4 rounded-lg">
              <Heading className=" text-green-500 text-[18px]">
                WHAT IS JED
              </Heading>
              <Text>
                <Link
                  href={"https://jedvotes.com"}
                  className="text-green-600 no-underline"
                >
                  JED
                </Link>{" "}
                is a feature-rich platform for organizing events that is
                intended to make all parts of the planning process more
                efficient. JED offers comprehensive solutions for managing
                nominations, facilitating voting, and handling ticketing.
              </Text>
            </Section>
            <Section className="mt-[16px] mb-[32px]">
              <Text>
                As a member of our waitlist, you'll be among the first to get
                exclusive access to JED when we launch. We'll keep you updated
                with the latest news and developments, so keep an eye on your
                inbox. In the meantime, feel free to reach out to us if you have
                any questions or suggestions. We are here to make your event
                planning experience as smooth and enjoyable as possible.
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              It was intended that this email be sent to{" "}
              <span className="text-black">{email}</span>. You can disregard
              this email if you weren't expecting this message. Kindly reply to
              this email if you have any questions or concerns about the
              security of your account.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WaitlistEmail;
