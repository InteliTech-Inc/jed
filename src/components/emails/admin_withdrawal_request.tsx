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

export const AdminWithdrawRequestEmail = ({
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
                Hello
              </Text>

              <Text>
                {user.fullName} has made a request to withdraw money from their
                account. Here are the details of the request.
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

              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This email was meant to be sent to the admins of JED You can
                disregard this email if you weren't anticipating this
                invitation.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AdminWithdrawRequestEmail;
