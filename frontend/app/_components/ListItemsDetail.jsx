import { Button } from "@/components/ui/button";
import { DeleteIcon, Trash2Icon, TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";

function ListItemsDetail({ listItemDetails, onDeleteItem }) {
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let total = 0;
    listItemDetails.forEach((element) => {
      total = total + element.amount;
    });
    setSubtotal(total.toFixed(2));
  }, [listItemDetails]);

  return (
    <div>
      <div>
        {listItemDetails.map((list, index) => (
          <div className="flex justify-between items-center p-2 mb-2">
            <div className="flex gap-6 items-center">
              <Image
                src={list.image}
                width={70}
                height={70}
                alt={list.eventName}
                className="border p-2"
              />
              <div>
                <h2 className="font-bold">{list.name}</h2>
                <h2>Quanity {list.quanity}</h2>
                <h2 className="text-lg font-bold">Amount {list.amount}</h2>
              </div>
            </div>
            <button onClick={() => onDeleteItem(list.documentId)}>
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>

      <div className="absolute w-[90%] bottom-6 flex flex-col">
        <h2 className="text-lg font-bold flex justify-between">
          Subtotal <span>{subtotal}</span>
        </h2>
        <Button>View Cart</Button>
      </div>
    </div>
  );
}

export default ListItemsDetail;
