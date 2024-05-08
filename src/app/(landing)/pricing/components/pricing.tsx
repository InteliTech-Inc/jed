import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const PRICING_DATA = [
  {
    title: "Basic",
    description: "For small Events",
    price: "Free",
    features: [
      {
        name: "Projects",
        value: "10",
      },
      {
        name: "Team members",
        value: "2",
      },
      {
        name: "Messages",
        value: "Unlimited",
      },
      {
        name: "Storage",
        value: "100GB",
      },
    ],
  },
  {
    title: "Pro",
    description: "For medium Events",
    price: "GH₵49",
    features: [
      {
        name: "Projects",
        value: "20",
      },
      {
        name: "Team members",
        value: "5",
      },
      {
        name: "Messages",
        value: "Unlimited",
      },
      {
        name: "Storage",
        value: "250GB",
      },
    ],
  },
  {
    title: "Enterprise",
    description: "For large Events",
    price: "GH₵99",
    features: [
      {
        name: "Projects",
        value: "50",
      },
      {
        name: "Team members",
        value: "10",
      },
      {
        name: "Messages",
        value: "Unlimited",
      },
      {
        name: "Storage",
        value: "500GB",
      },
    ],
  },
];

export default function Pricing() {
  return (
    <section>
      <div className="container mx-auto px-6 py-20">
        <div className="mb-8 space-y-3">
          <h2 className="text-4xl md:text-6xl text-center font-medium">
            Plans for everybody
          </h2>
          <p className="text-center text-xl text-gray-600">
            Start with any plan, it’s free and always will be
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-4 md:space-y-0">
          {PRICING_DATA.map((pricing) => (
            <div
              key={pricing.title}
              className="bg-white w-full  rounded-lg border hover:scale-105 even:shadow-md shadow-slate-200 even:drop-shadow-2xl transition ease-in duration-500 flex-1"
            >
              <div className="px-8 pt-8 pb-2">
                <h3 className="text-2xl font-bold">{pricing.title}</h3>
                <p className="text-gray-600 mb-6">{pricing.description}</p>
              </div>
              <hr className="my-6" />
              <div className="p-8">
                <h4 className="text-4xl font-bold  mb-6">{pricing.price}</h4>
                <ul className="space-y-2">
                  {pricing.features.map((feature) => (
                    <li key={feature.name} className="flex justify-between">
                      <span className="font-semibold text-md">
                        {feature.name}
                      </span>
                      <span
                        className={`${
                          feature.value === "Unlimited" && "text-secondary"
                        }`}
                      >
                        {feature.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`
                ${
                  pricing.title === "Pro"
                    ? "/pricing/pro"
                    : pricing.title === "Enterprise"
                    ? "/pricing/enterprise"
                    : "/pricing/basic"
                }
              `}
                >
                  <Button
                    className="mt-6 w-full"
                    variant={`${
                      pricing.title === "Pro" ? "default" : "outline"
                    }`}
                  >
                    <span>
                      {pricing.title === "Pro"
                        ? "Get started"
                        : pricing.title === "Enterprise"
                        ? "Buy now"
                        : "Try for free"}
                    </span>
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <p className="text-gray-400 text-center text-md mt-3">
                  No credit card required.{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-14 text-center space-x-1">
          <span> For more inquiries please contact us at</span>
          <Link
            href="mailto:info.jedvotes@gmail.com"
            className="text-secondary"
          >
            Support Team
          </Link>
        </p>
      </div>
    </section>
  );
}
