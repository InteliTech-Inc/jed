"use client";

import { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";
import { Metadata } from "next";

const PageHashedLinks = {
  Introduction: "Introduction to JED App",
  Booking: "Placing a booking",
  Payment: "Making payment",
  Address: "Save address",
  Subscription: "Subscribing to a package",
};

function slugify(str: string) {
  return str.toLocaleLowerCase().replace(/\s+/g, "-");
}

export default function Guide() {
  const url = new URL(window !== undefined ? window.location.href : "");
  const [activeHash, setActiveHash] = useState(url.hash);

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    const handleScroll = throttle(() => {
      const elements = Object.values(PageHashedLinks).map(
        (item) => document.querySelector(`#${slugify(item)}`) as HTMLElement
      );
      // biome-ignore lint/complexity/noForEach: <it works>
      elements.forEach((element) => {
        const rect = element?.getBoundingClientRect();
        const isLess = rect?.top <= 80;
        isLess ? setActiveHash(`#${element.id}`) : "";
      });
    }, 200);

    const debouncedHashChange = debounce(handleHashChange, 200);

    window.addEventListener("hashchange", debouncedHashChange);
    document.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", debouncedHashChange);
      document.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <section className=" w-full p-6 max-w-[1200px] mx-auto lg:grid gap-4 grid-cols-[70%_auto] ">
      <div>
        <h1 className="text-3xl main-heading py-6">
          Welcome to <mark className=" text-secondary">JED!</mark>
        </h1>
        <section>
          <p className=" text-xl lg:text-2xl pb-6 text-neutral-600">
            We're thrilled to have you here and eager to guide you through our
            events management app. JED is your solution for effortless events
            organization and management, designed to make your events tasks a
            breeze.
          </p>
          <ul className="list-disc list-inside border border-secondary bg-green-50 space-y-4 p-6 rounded-md">
            <h3 className=" text-xl font-bold">Content on this page</h3>
            {Object.values(PageHashedLinks).map((item) => {
              return (
                <li key={item} className=" w-fit text-primary hover:underline">
                  <a href={`/app/help#${slugify(item)}`}>{item}</a>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="py-6" id={slugify(PageHashedLinks.Introduction)}>
          <h2 className="text-2xl pb-3 text-secondary font-semibold">
            Introduction to JED-App.
          </h2>
          <p>
            The application features a dashboard where you can oversee your
            personal activities. This includes tracking total bookings, recent
            subscriptions, and items in the basket. The app workflow initiates
            by adding items to the basket from the dedicated basket page. Here,
            you can conveniently add various events items with their respective
            quantities.
          </p>
          <br />
          <p>
            The system automatically computes individual and total prices. Once
            items are added to the basket, the next step is the checkout
            process.
          </p>
          <br />
          <p>
            'Checkout' confirms an order for JED (JED) to launder all items in
            the basket. Upon successful checkout, the order transitions into a
            booking, offering your a summary of the booking which is accessible
            via the bookings page.
          </p>
          <br />
          <p>
            If everything looks good, you can proceed to make payments, leaving
            JED to handle the rest with ease!
          </p>
          <span className="block border list-none rounded-md my-4 p-4 border-secondary bg-green-50">
            <h3 className=" text-lg font-bold text-green-500">Info</h3>
            <p className=" pb-3">
              The payment is handled by PayStack,a modern and secured platform
              for transferring money.{" "}
              <a
                href="https://paystack.com/gh/terms?q=/terms"
                className=" text-secondary"
              >
                Read more about PayStack's Privacy Policy.
              </a>
            </p>
          </span>
        </section>
        <section id={slugify(PageHashedLinks.Booking)}>
          <h1
            className="text-2xl pb-3 text-secondary font-semibold"
            id="make-booking"
          >
            Placing a Booking
          </h1>
          <p>
            To schedule a events service with the events App, follow these
            simple steps:
          </p>

          <br />
          <ol className="lg:pl-4">
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                1. Navigate to the Basket Page
              </h2>
              <ul className="list-disc pl-10 space-y-2">
                <li>Open the events App on your device.</li>
                <li>
                  Locate and click on the "Basket" icon or option. The basket is
                  where you can add all the items you want to send for cleaning.
                </li>
              </ul>
            </li>
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                2. Add Items to Your Basket
              </h2>
              <ul className="list-disc pl-10 space-y-2">
                <li>
                  Once you're on the Basket page, click on the "Add Item"
                  button. This will open a dropdown menu containing a list of
                  items available for events.
                </li>
                <li>
                  From the dropdown menu, select the item you wish to have
                  cleaned.
                </li>
              </ul>
            </li>
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                3. Specify the Quantity
              </h2>
              <ul className="list-disc pl-10 space-y-2">
                <li>
                  After selecting an item, you will be prompted to specify the
                  quantity. Enter the desired quantity of the selected item.
                </li>
              </ul>
            </li>
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                4. Repeat for Additional Items
              </h2>
              <ul className="list-disc pl-10 space-y-2">
                <li>
                  If you have more items to add to your events order, simply
                  repeat steps 2 and 3 for each item until your entire events
                  list is in the basket.
                </li>
              </ul>
            </li>
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                5. Proceed to Checkout
              </h2>
              <ul className="list-disc pl-10 space-y-2">
                <li>
                  Once you've added all the items you need to be washed, a
                  "Checkout" button will become visible on the screen. Click on
                  it to initiate the booking process.
                </li>
                <li className=" border list-none rounded-md my-4 p-4 border-secondary bg-green-50">
                  <h3 className=" text-lg font-bold text-secondary">Note</h3>
                  <p className=" pb-3">
                    Before you checkout, you must have some addresses saved
                    already. We'd need your address to make a successful
                    checkout.
                    <a
                      href="/app/help#save-address"
                      className=" text-secondary"
                    >
                      Read about how to save an address here.
                    </a>
                  </p>
                </li>
              </ul>
            </li>
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                6. Provide Booking Details
              </h2>
              <ul className="list-disc pl-10 space-y-2">
                <li>
                  A popup window will appear, prompting you to enter essential
                  information related to your booking. Fill in the required
                  details accurately.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold pb-3">
                7. Confirm Your Booking
              </h2>
              <ul className="list-disc pl-10 space-y-2">
                <li>
                  After filling in the necessary information, review your order
                  to ensure all details are correct.
                </li>
                <li>
                  When you are satisfied with your selections and booking
                  details, select the "Submit" button to confirm your booking.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold pb-3">
                8. View Transaction Status
              </h2>
              <ul className="list-disc pl-10 space-y-2">
                <li>
                  Click on a Booking to view the booking details, and your
                  transaction status.
                </li>
              </ul>
            </li>
          </ol>
        </section>
        <br />
        <section id={slugify(PageHashedLinks.Payment)}>
          <h1 className="text-2xl py-3 text-secondary font-semibold">
            Making payments
          </h1>
          <p>To make payment for your booking, follow these simple steps:</p>

          <br />
          <ol className="lg:pl-4">
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                1. Navigate to the Bookings Page
              </h2>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Locate and click on the "Bookings" icon or option. All baskets
                  you have checked out can be found here.
                </li>
              </ul>
            </li>
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                2. Select the Booking
              </h2>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Once you're on the Bookings page, select the booking you wish
                  to make payment for.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold pb-3">3. Make Payment</h2>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Click on the "Make Payment" button. A reference will be
                  generated for your order.
                </li>
                <li>
                  After the reference is generated, click "Confirm Booking" to
                  complete the payment process.
                </li>
              </ul>
            </li>
          </ol>
        </section>
        <br />
        <section id={slugify(PageHashedLinks.Address)}>
          <h1 className="text-2xl py-3 text-secondary font-semibold">
            Saving Addresses
          </h1>
          <p>
            You can add addresses to your account so that your events will be
            delivered there
          </p>

          <br />
          <ol className="lg:pl-4">
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                1. Navigate to the Address Page
              </h2>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Locate and click on the "Addresses" on the sidebar. All
                  Address you have added will be shown here.
                </li>
                <li>
                  Once you're on the Addresses page, click on the "Add Address"
                  button.
                </li>
                <li>
                  After filling in the necessary information, review your
                  address to ensure all details are correct.
                </li>
                <li>
                  When you are satisfied with your selections and booking
                  details, select the "Add Address" button.
                </li>
              </ul>
            </li>
          </ol>
        </section>
        <section id={slugify(PageHashedLinks.Subscription)}>
          <h1 className="text-2xl py-3 text-secondary font-semibold">
            Subscribing to a Package
          </h1>
          <p>To make subscribe to a package, follow these simple steps:</p>

          <br />
          <ol className="lg:pl-4">
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                1. Visit the Subscription Page
              </h2>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Access the "Subscriptions" section by selecting it from the
                  sidebar menu.
                </li>
              </ul>
            </li>
            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                2. Explore Available Packages
              </h2>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Within the Subscription page, click "Add Subscription" to view
                  the available packages.
                </li>
              </ul>
            </li>

            <li className="mb-6">
              <h2 className="text-xl font-semibold pb-3">
                3. Choose Your Package
              </h2>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Select the desired package by clicking the "Details" button
                  associated with it.
                </li>
                <li>
                  Upon clicking, a comprehensive view of the package details
                  will be displayed
                </li>
              </ul>
            </li>

            <li>
              <h2 className="text-xl font-semibold pb-3">
                4. Initiate Subscription
              </h2>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  Under the package details, locate and click the "Subscribe"
                  button to proceed with subscribing to the chosen package
                </li>
              </ul>
            </li>
          </ol>
        </section>
      </div>
      <div className="border-l border-l-neutral-200 h-fit hidden lg:block sticky top-[66px]">
        <h3 className=" py-2 font-bold text-xl px-2">On this page</h3>
        <ul className="flex flex-col gap-1 text-sm">
          {Object.values(PageHashedLinks).map((item) => {
            return (
              <li
                key={item}
                className={`p-2 ${
                  activeHash === `#${slugify(item)}` ? "active-link" : ""
                } `}
              >
                <a
                  className="hover:text-secondary"
                  href={`/resources/guides#${slugify(item)}`}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
