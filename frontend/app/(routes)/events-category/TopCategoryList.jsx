import Image from "next/image";
import React from "react";
import Link from "next/link";

function TopCategoryList({ categoryList, selectedCategory }) {
  return (
    <div className="mt-2 mx-7 md:mx-20">
      {/* Flex container with horizontal scroll enabled on small screens */}
      <div className="flex gap-5 justify-center overflow-x-auto overflow-y-hidden">
        {categoryList.map((category, index) => (
          <Link
            href={"/events-category/" + category.name}
            key={category.id}
            className={`flex flex-col items-center bg-gray-200 gap-2 p-4 h-[90px] cursor-pointer rounded-lg group 
                ${selectedCategory === category.name ? 'bg-[#6B46C1] text-white' : 'text-gray-800'} 
                hover:bg-[#6B46C1] hover:text-white transition-colors duration-300 w-[120px] sm:w-[150px] md:w-[180px] min-w-[100px] object-contain`}
          >
            <Image
              src={
                category?.icon?.url
                  ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category.icon.url
                  : "https://t4.ftcdn.net/jpg/08/49/36/01/360_F_849360193_JguSdX5IYrE9skrUYqsnix3eNj38D5Vq.jpg"
              }
              alt="category icon"
              width={40}
              className="cursor-pointer group-hover:scale-125 transition-all ease-in-out"
              height={40}
            />
            <h2 className="mb-2 text-center w-auto">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopCategoryList;
