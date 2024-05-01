import Link from "next/link";

const TERMS_CONTENT = [
  {
    id: 0,
    title: "Personal Information",
    text: `  We may collect personal information, such as your
name, contact details (address, email address, phone number), and payment
information when you use our JED services.`,
  },
  {
    id: 1,
    title: "JED Details",
    text: ` We collect information about your JED, including fabric
types, special care instructions, stains, and damages, to ensure proper handling
and processing.`,
  },
  {
    id: 2,
    title: "Usage Information",
    text: `We may collect information about how you use our website
or mobile application, including IP addresses, browser type, device information,
and page views, to improve our services and enhance user experience.`,
  },
  {
    id: 3,
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
          JED Votes ("we," "us," or "our") is committed to protecting the
          privacy of our customers ("you" or "your"). This Privacy policy shall
          explains how we collect, use, disclose, and protect your personal
          information in connection with our JED services. By using our
          services, you consent to the practices described in this Privacy
          Policy.
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
      <section>
        <h1 className=" text-primary text-xl lg:text-3xl heading py-2 border-b">
          5. How we use collected information.
        </h1>
        <ul>
          <h4 className="py-4 ">
            <Link className=" text-primary" href="/">
              JED
            </Link>{" "}
            may collect and use Users' personal information for the following
            purposes:
          </h4>
          <li className=" my-2">
            &bull; We use the collected information to provide and improve our
            JED services, process payments, schedule pickups and deliveries, and
            communicate with you regarding your orders.
          </li>
          <li className=" my-2">
            &bull; Your JED details are used to ensure proper cleaning, drying,
            and folding according to your preferences and any specific care
            instructions.
          </li>
          <li className=" my-2">
            &bull; We may use your contact information to send you
            service-related notifications, updates, promotional offers, or
            customer surveys, unless you opt out of such communications.
          </li>
          <li className=" my-2">
            &bull; We may analyze usage information to monitor and improve our
            website or application, identify technical issues, and personalize
            user experiences. e. We will not sell, rent, or lease your personal
            information to third parties without your consent, except as
            required by law.
          </li>
        </ul>
      </section>
      <section>
        <h1 className=" text-primary text-2xl lg:text-3xl heading py-2 border-b">
          6. Data Retention
        </h1>
        <ul>
          <li className=" my-2">
            &bull; We retain your personal information for as long as necessary
            to fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law.
          </li>
          <li className=" my-2">
            &bull; JED details, such as fabric preferences or care instructions,
            may be stored for future reference or to enhance the quality of our
            services.
          </li>
        </ul>
      </section>
      <section>
        <h1 className=" text-primary text-2xl lg:text-3xl heading py-2 border-b">
          7. Data Security
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
          8. Third Party Services
        </h1>
        <ul>
          <li className=" my-2">
            &bull; We may engage third-party service providers to assist us in
            providing JED services, process payments, or analyze website usage.
            These providers may have access to your personal information but are
            obligated to maintain its confidentiality and use it only for the
            purposes we specify.
          </li>
          <li className=" my-2">
            &bull;Our website or application may contain links to third-party
            websites or services. We are not responsible for the privacy
            practices or content of such websites.
          </li>
        </ul>
      </section>
      <section>
        <h1 className=" text-primary text-2xl lg:text-3xl heading py-2 border-b">
          9. Children's Privacy
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
          10. Changes To This Privacy Policy
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
            The Privacy Policy was last updated on Monday, July 10 , 2023.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
