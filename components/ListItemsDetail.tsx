import { Button } from "@/components/ui/button";
import { DeleteIcon, Trash2Icon, TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "utils/GlobalApi";

// Define types for the props
interface ListItemDetail {
  documentId: string;
  image: string;
  eventName: string;
  name: string;
  quanity: number;
  amount: number;
}

interface ListItemsDetailProps {
  listItemDetails: ListItemDetail[];
  onDeleteItem: (documentId: string) => void;
}

const ListItemsDetail: React.FC<ListItemsDetailProps> = ({ listItemDetails, onDeleteItem }) => {
  const [subtotal, setSubtotal] = useState<string>("0");

  useEffect(() => {
    let total = 0;
    listItemDetails.forEach((element) => {
      total += element.amount;
    });
    setSubtotal(total.toFixed(2));
  }, [listItemDetails]);

  return (
    <div>
      <div className="h-[500px] overflow-auto">
        {listItemDetails.map((list, index) => (
          <div key={index} className="flex justify-between items-center p-2 mb-2">
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
                <h2>Quantity {list.quanity}</h2>
                <h2 className="text-lg font-bold">Amount {list.amount}</h2>
              </div>
            </div>
            <button onClick={() => onDeleteItem(list.documentId)}>
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItemsDetail;
