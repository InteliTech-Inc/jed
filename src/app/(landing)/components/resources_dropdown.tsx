import { FlowerIcon, TagIcon } from "lucide-react";
export default function NavbarResourcesDropdown() {
  return (
    <div className=" animate-dropdown">
      <div className=" w-96 border rounded-lg bg-white z-10 p-2 shadow-lg">
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
                <p className="font-semibold text-secondary">Guides</p>
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
                <p className="font-semibold text-secondary">About Us</p>
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
