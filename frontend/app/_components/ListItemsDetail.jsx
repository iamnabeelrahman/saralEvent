import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";

function ListItemsDetail({ listItemDetails = [], onDeleteItem }) {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    listItemDetails.forEach((element) => {
      total += element.amount || 0; // Ensure amount is valid
    });
    setSubtotal(total.toFixed(2));
  }, [listItemDetails]);

  return (
    <div className="relative">
      {listItemDetails.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Your list is empty!</h2>
          <p className="text-gray-500">Add some events to see them here.</p>
        </div>
      ) : (
        <div>
          {listItemDetails.map((list, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 mb-2 border rounded-md shadow-sm"
            >
              <div className="flex gap-6 items-center">
                <Image
                  src={list.image || "/default-image.jpg"} // Fallback image
                  width={70}
                  height={70}
                  alt={list.eventName || "Event"}
                  className="border p-2"
                />
                <div>
                  <h2 className="font-bold">{list.eventName || "Unknown Event"}</h2>
                  <h2>Quantity: {list.quanity || 1}</h2>
                  <h2 className="text-lg font-bold">Amount: ${list.amount || 0}</h2>
                </div>
              </div>
              <button onClick={() => onDeleteItem(list.documentId)}>
                <TrashIcon className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {listItemDetails.length > 0 && (
        <div className="absolute w-[90%] bottom-6 flex flex-col">
          <h2 className="text-lg font-bold flex justify-between">
            Subtotal <span>${subtotal}</span>
          </h2>
          <Button>View Cart</Button>
        </div>
      )}
    </div>
  );
}

export default ListItemsDetail;
