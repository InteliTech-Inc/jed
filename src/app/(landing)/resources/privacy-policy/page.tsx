import Link from "next/link";

const TERMS_CONTENT = [
  {
    id: 0,
    title: "Personal Information",
    text: `  We may collect personal information, such as your
name, contact details (address, email address, phone number), and payment
information such as amount when you use our JED services.`,
  },

  {
    id: 1,
    title: "Usage Information",
    text: `We may collect information about how you use our website
or mobile application, including IP addresses, browser type, device information,
and page views, to improve our services and enhance user experience.`,
  },
  {
    id: 2,
    title: "Cookies and Tracking Technologies",
    text: ` We use cookies and similar tracking
technologies to collect information about your interactions with our website or
application and deliver personalized content.`,
  },
];

function PrivacyPolicyPage() {
  return (
    <div className=" w-full lg:w-4/5 p-4 mx-auto pt-20">
      <section>
        <h1 className="text-4xl lg:text-6xl text-center py-8 font-bold text-primary">
          Privacy Policy
        </h1>
        <p className=" ">
          JED ("we," "us," or "our") is committed to protecting the privacy of
          our customers ("you" or "your"). This Privacy policy shall explain how
          we collect, use, disclose, and protect your personal information in
          connection with our JED services. By using our services, you consent
          to the practices described in this Privacy Policy.
        </p>
      </section>
      {TERMS_CONTENT.map((content, index) => {
        return (
          <section className="my-4" key={content.id}>
            <h1 className=" text-primary text-xl  lg:text-3xl heading py-2 border-b">
              {`${content.title}`}
            </h1>
            <p className="py-4 ">{content.text}</p>
          </section>
        );
      })}
      <section>
        <h1 className=" text-primary text-xl lg:text-3xl heading py-2 border-b">
          Information we may collect
        </h1>
        <ul>
          <h4 className="py-4 ">
            <Link className=" text-primary" href="/">
              JED
            </Link>{" "}
            may collect various types of information from users, including:
          </h4>
          <li className=" my-2">
            &bull; Personal Information: Name, email address, contact number,
            and other identifying details
          </li>
          <li className=" my-2">
            &bull; Payment Information: Information necessary for processing
            payments securely.
          </li>
          <li className=" my-2">
            &bull; Usage Information: Data related to your interactions with our
            platform, such as voting activity and event participation.
          </li>
        </ul>
      </section>
      <section>
        <h1 className=" text-primary text-xl lg:text-3xl heading py-2 border-b">
          How We Use Your Information
        </h1>
        <ul>
          <h4 className="py-4 ">
            We use the information collected for the following purposes:
          </h4>
          <li className=" my-2">
            &bull; To provide and maintain our services, including event
            management and voting functionalities.
          </li>
          <li className=" my-2">
            &bull; To process payments and facilitate secure transactions.
          </li>
          <li className=" my-2">
            &bull; To communicate with you regarding account updates, events,
            and promotions.
          </li>
          <li className=" my-2">
            &bull; To improve and optimize our platform, services, and user
            experience.
          </li>
          <li className=" my-2">
            &bull; To comply with legal obligations and resolve disputes.
          </li>
        </ul>
      </section>
      <section>
        <h1 className=" text-primary text-xl lg:text-3xl heading py-2 border-b">
          Information Sharing
        </h1>
        <ul>
          <h4 className="py-4 ">
            We may share your information in the following circumstances:
          </h4>
          <li className=" my-2">
            &bull; With service providers: Third-party service providers who
            assist us in delivering our services, subject to confidentiality
            agreements.
          </li>
          <li className=" my-2">
            &bull; With event organizers: Limited information necessary for
            event coordination and management.
          </li>
          <li className=" my-2">
            &bull; With legal authorities: When required to comply with legal
            obligations or respond to lawful requests.
          </li>
        </ul>
      </section>
      <section>
        <h1 className="text-primary text-xl lg:text-3xl heading py-2 border-b">
          Data Security
        </h1>
        <p className="py-4">
          We prioritize the security of your information and implement
          appropriate measures to protect against unauthorized access,
          disclosure, alteration, or destruction.
        </p>
      </section>
      <section>
        <h1 className=" text-primary text-2xl lg:text-3xl heading py-2 border-b">
          Your Rights
        </h1>
        <ul>
          <h4 className=" py-2">You have the right to:</h4>
          <li className=" my-2">
            &bull; Access, update, or correct your personal information.
          </li>
          <li className=" my-2">
            &bull; Request deletion of your information, subject to legal
            obligations.
          </li>
          <li className=" my-2">
            &bull; Opt-out of receiving promotional communications.
          </li>
          <li className=" my-2">
            &bull; Request information about the types of data we collect and
            how it's used.
          </li>
        </ul>
      </section>
      <section>
        <h1 className=" text-primary text-2xl lg:text-3xl heading py-2 border-b">
          Data Retention
        </h1>
        <ul>
          <li className=" my-2">
            &bull;We retain your information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law.
          </li>
        </ul>
      </section>
      <section>
        <h1 className=" text-primary text-2xl lg:text-3xl heading py-2 border-b">
          Data Security
        </h1>
        <ul>
          <li className=" my-2">
            &bull; We implement reasonable security measures to protect your
            personal information from unauthorized access, disclosure,
            alteration, or destruction.
          </li>
          <li className=" my-2">
            &bull; However, no data transmission or storage method is 100%
            secure. While we strive to protect your information, we cannot
            guarantee its absolute security.
          </li>
        </ul>
      </section>
      <section>
        <h1 className=" text-primary text-2xl lg:text-3xl heading py-2 border-b">
          Children's Privacy
        </h1>
        <ul>
          <li className=" my-2">
            &bull; Our services are not intended for individuals under the age
            of 16. We do not knowingly collect personal information from
            children. If you become aware that a child has provided us with
            personal information without parental consent, please contact us,
            and we will take steps to remove the information from our systems
          </li>
        </ul>
      </section>
      <section>
        <h1 className=" text-primary text-2xl lg:text-3xl heading py-2 border-b">
          Changes To This Privacy Policy
        </h1>
        <ul>
          <li className=" my-2">
            &bull; We may update this Privacy Policy from time to time. We will
            notify you of any material changes by posting the updated Privacy
            Policy on our website or application and updating the "Effective
            Date" at the top.
          </li>
          <li className=" my-2">
            &bull; Please review this Privacy Policy periodically for any
            changes. Your continued use of our services after the posting of
            changes constitutes your acceptance of the updated policy
          </li>
          <li className=" my-2">
            The Privacy Policy was last updated on Monday, May 13 , 2024.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
