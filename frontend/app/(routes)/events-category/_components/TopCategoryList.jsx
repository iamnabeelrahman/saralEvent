import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopCategoryList({ categoryList }) {
  return (
    <div className=" mt-2 mx-7 md:mx-20">
      <div className="flex gap-5 justify-center overflow-x-auto overflow-y-hidden">
        {categoryList.map((category, index) => (
          <Link
            href={"/events-category/" + category.name}
            key={index}
            className="flex flex-col items-center bg-gray-200 gap-2 p-4 h-[90px] cursor-pointer rounded-lg group hover:bg-[#6B46C1] hover:text-gray-200 transition-colors duration-300 w-[120px] sm:w-[150px] md:w-[180px] min-w-[100px] object-contain"
          >
            <Image
              src={category?.icon?.url}
              alt="category icon"
              width={40}
              className="cursor-pointer group-hover:scale-125 transition-all ease-in-out"
              height={40}
            />
            <h2 className="mb-2 text-primary text-center">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopCategoryList;
