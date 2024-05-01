import { FlowerIcon, TagIcon, VoteIcon } from "lucide-react";
import Link from "next/link";
export default function NavbarProductsDropdown() {
  return (
    <div className="animate-dropdown">
      <div className="w-96 border rounded-lg bg-white z-10 p-2 shadow-lg">
        <ul>
          <li className="">
            <Link
              href="/products/#nominations"
              className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md"
            >
              <span className="p-2 bg-blue-100 h-fit border-2 border-blue-400 rounded-md">
                <FlowerIcon size={24} className=" text-blue-700" />
              </span>
              <span>
                <p className="font-semibold text-blue-700">Nominations</p>
                <p className=" text-sm text-neutral-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima fugit iure esse.
                </p>
              </span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/products#ticketing"
              className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md"
            >
              <span className="p-2 bg-red-100 h-fit border-2 border-red-300 rounded-md">
                <TagIcon size={24} className="text-red-400" />
              </span>
              <span>
                <p className="font-semibold text-red-400">Ticketing</p>
                <p className=" text-sm text-neutral-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima fugit iure esse.
                </p>
              </span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/products#voting"
              className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md"
            >
              <span className="p-2 bg-neutral-100 h-fit border rounded-md">
                <VoteIcon size={24} className="text-secondary" />
              </span>
              <span>
                <p className="font-semibold text-secondary">Voting</p>
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
