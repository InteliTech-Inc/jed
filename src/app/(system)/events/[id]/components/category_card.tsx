import React from "react";

type Props = {
  categories: { category_name: string; id: number }[];
};

export default function CategoryCard({ categories }: Props) {
  return (
    <section className=" py-4">
      <h3 className="text-2xl my-2 font-semibold">Categories</h3>
      <div className=" grid grid-cols-2 gap-4">
        {categories.map((category) => {
          return (
            <ul key={category.category_name}>
              <li className=" w-full p-6 border  bg-gray-50 rounded-lg ">
                {category.category_name}
              </li>
            </ul>
          );
        })}
      </div>
    </section>
  );
}
