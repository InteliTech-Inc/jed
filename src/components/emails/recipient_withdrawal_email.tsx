import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Tailwind,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

type WithdrawalRequestEmailProps = {
  user: any;
  withdrawaldetails: any;
};

export const RequestWithdrawalEmail = ({
  user,
  withdrawaldetails,
}: WithdrawalRequestEmailProps) => {
  const previewText = `Withdrawal Request`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-gray-200 rounded my-[40px] mx-auto max-w-[465px]">
            <Section className=" bg-green-600 w-full text-center text-white h-32">
              <Text className=" text-lg text-white">
                JED received your withdrawal request of
              </Text>
              <Heading>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "GHC",
                }).format(Number(withdrawaldetails.amount))}
              </Heading>
            </Section>
            <Section className=" p-6">
              <Text className="text-black text-[14px] leading-[24px]">
                Hello, {user.fullName}
              </Text>

              <Text>
                We have received your withdrawal request and are currently
                processing it. Below are the details of your request:
              </Text>
              <Section className="p-4 rounded-lg bg-gray-50">
                <Row>
                  <Column>
                    <Text>Channel</Text>
                  </Column>
                  <Column align="right">
                    <Text>
                      {withdrawaldetails.channel === "bank_transfer"
                        ? "Bank"
                        : "Mobile Money"}
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Text>Provider</Text>
                  </Column>
                  <Column align="right">
                    <Text>{withdrawaldetails.provider}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Text>Account Number</Text>
                  </Column>
                  <Column align="right">
                    <Text>{withdrawaldetails.accountNumber}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Text>Account Name</Text>
                  </Column>
                  <Column align="right">
                    <Text>{withdrawaldetails.accountName}</Text>
                  </Column>
                </Row>
              </Section>
              <Section className="mt-[24px] mb-[32px]">
                <Text>
                  Please note that it may take at most 3 business days for the
                  funds to be transferred to your account. Please keep an eye on
                  your email for further updates regarding the status of your
                  request. We will notify you as soon as there is any progress
                  or if additional information is required.
                </Text>
              </Section>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This email was meant to be sent to{" "}
                <span className="text-black">{user.email}</span>. You can
                disregard this email if you weren't anticipating this
                invitation. To contact us if you have any concerns regarding the
                security of your account, please{" "}
                <Link
                  href={`mailto:info.jedvotes@gmail.com`}
                  className="text-[#72c472] no-underline"
                >
                  send us a message here
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RequestWithdrawalEmail;
