import { FlowerIcon, TagIcon } from "lucide-react";
import Link from "next/link";
export default function NavbarResourcesDropdown() {
  return (
    <div className=" animate-dropdown">
      <div className=" w-96 border rounded-lg bg-white z-10 p-2 shadow-lg">
        <ul>
          <li className="">
            <Link
              href="/resources/guides"
              className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md"
            >
              <span className="p-2 bg-neutral-100 h-fit border rounded-md">
                <FlowerIcon size={24} className="text-secondary" />
              </span>
              <span>
                <p className="font-semibold text-secondary">Guides</p>
                <p className=" text-sm text-neutral-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima fugit iure esse.
                </p>
              </span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/resources/about"
              className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md"
            >
              <span className="p-2 bg-neutral-100 h-fit border rounded-md">
                <TagIcon size={24} className="text-secondary" />
              </span>
              <span>
                <p className="font-semibold text-secondary">About Us</p>
                <p className=" text-sm text-neutral-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima fugit iure esse.
                </p>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
