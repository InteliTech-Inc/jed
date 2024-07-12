import Link from "next/link";

const TERMS_CONTENT = [
  {
    id: 0,
    title: "About JED",
    text: `At JED, we provide an innovative online platform that empowers individuals and organizations to conduct voting, ticketing, and nomination events with utmost confidentiality and security.`,
  },
  {
    id: 2,
    title: "License",
    text: `Upon accepting these Terms and Conditions, you are granted a limited, non-exclusive, and non-transferable license to access and utilize JED's online platform as per the terms specified in a separate Services Agreement mutually agreed upon by both parties`,
  },
  {
    id: 3,
    title: "Payments, Cancellation, and Refund Policy",
    text: `Payment processing services are facilitated by Paystack, governed by their terms and conditions. Refunds are subject to review and applicable laws. Fraudulent transactions are promptly identified and canceled to protect both JED and its clients.
`,
  },
  {
    id: 4,
    title: "Right to Refund",
    text: `Customers have the right to request a refund if services are not delivered as per the agreed terms. Refund requests must be submitted via info.jedvotes@gmail.com. Approved refunds will be processed promptly.

`,
  },
  {
    id: 5,
    title: "Prohibited Acts",
    text: `Users must not engage in tampering, interference, infringement, spamming, malware installation, harming minors, impersonation, violating laws, or disabling security features.`,
  },
  {
    id: 6,
    title: "Your Content",
    text: `By submitting Content to JED, you grant us the right to use it in connection with our services. Prohibited content includes illegal, infringing, offensive, or harmful material.`,
  },
  {
    id: 7,
    title: "Changes and Updates",
    text: `JED reserves the right to update, modify, or discontinue services with prior notice. Temporary suspensions for maintenance purposes may occur.`,
  },
  {
    id: 8,
    title: "Copyright and Intellectual Property Rights",
    text: `All rights to JED's services and content are reserved. Users may access the website for informational purposes only.`,
  },
  {
    id: 9,
    title: "Cancellation and Termination",
    text: `Accounts may be terminated for illegal compliance, technical issues, fraudulent activities, or at JED's discretion.`,
  },
  {
    id: 10,
    title: "Terms for Certain Customers and Countries",
    text: `JED operates under Ghanaian laws. Users accessing our services from other locations do so at their own risk and must comply with local laws.`,
  },
];

function TermsAndConditionsPage() {
  return (
    <div className=" w-full lg:w-4/5 p-4 mx-auto pt-20">
      <section>
        <h1 className="text-4xl lg:text-6xl text-center py-8 font-bold text-primary">
          Terms & Conditions
        </h1>
        <p className=" ">
          JED ("we," "us," or "our") is committed to protecting the privacy of
          our customers ("you" or "your"). Please carefully review the following
          Terms and Conditions, which govern your use of JED's services. By
          accessing or using our services, you agree to be bound by these Terms
          and Conditions. If you do not agree with any part of these Terms and
          Conditions, please refrain from using our services.
        </p>
      </section>
      {TERMS_CONTENT.map((content, index) => {
        return (
          <section className="my-4" key={content.id}>
            <h1 className=" text-primary text-xl  lg:text-3xl heading py-2 border-b">
              {`${index + 1}.  ${content.title}`}
            </h1>
            <p className="py-4 ">{content.text}</p>
          </section>
        );
      })}
    </div>
  );
}

export default TermsAndConditionsPage;
