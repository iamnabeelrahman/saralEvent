import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ListItemsDetail({ listItemDetails, onDeleteItem }) {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    listItemDetails.forEach((element) => {
      total += element.amount;
    });
    setSubtotal(total.toFixed(2));
  }, [listItemDetails]);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div>
        {listItemDetails.map((list, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-center p-4 mb-4 border rounded-md shadow-md bg-white"
          >
            <div className="flex gap-4 items-center w-full sm:w-auto">
              <Image
                src={list.image}
                width={70}
                height={70}
                alt={list.eventName}
                className="border p-2 rounded-md"
              />
              <div className="flex-1">
                <h2 className="font-bold text-lg">{list.name}</h2>
                <p className="text-sm text-gray-600">Quantity: {list.quantity}</p>
                <p className="text-md font-semibold text-gray-800">
                  Amount: ${list.amount}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDeleteItem(list.documentId)}
              className="mt-2 sm:mt-0 p-2 text-red-600 hover:text-red-800"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] flex flex-col bg-white p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-bold flex justify-between items-center mb-2">
          Subtotal: <span>${subtotal}</span>
        </h2>
        <Button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          View Cart
        </Button>
      </div>
    </div>
  );
}

export default ListItemsDetail;
