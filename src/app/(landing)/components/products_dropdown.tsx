import { FlowerIcon, TagIcon, VoteIcon } from "lucide-react";
export default function NavbarProductsDropdown() {
  return (
    <div className="animate-dropdown">
      <div className="w-96 border rounded-lg bg-white z-10 p-2 shadow-lg">
        <ul>
          <li className="">
            <a
              href="/first"
              className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md"
            >
              <span className="p-2 bg-neutral-100 h-fit border rounded-md">
                <FlowerIcon size={24} className="text-secondary" />
              </span>
              <span>
                <p className="font-semibold text-secondary">Nominations</p>
                <p className=" text-sm text-neutral-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima fugit iure esse.
                </p>
              </span>
            </a>
          </li>
          <li className="">
            <a
              href="/first"
              className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md"
            >
              <span className="p-2 bg-neutral-100 h-fit border rounded-md">
                <TagIcon size={24} className="text-secondary" />
              </span>
              <span>
                <p className="font-semibold text-secondary">Ticketing</p>
                <p className=" text-sm text-neutral-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima fugit iure esse.
                </p>
              </span>
            </a>
          </li>
          <li className="">
            <a
              href="/first"
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
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
