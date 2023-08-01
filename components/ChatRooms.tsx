import React from "react";
import Room from "./Room";
import { ObjectProps } from "@/types";

export default function ChatRooms({ data }: { data: ObjectProps[] }) {
  return (
    <div className="flex flex-col w-[320px] gap-y-2 rounded-xl p-4 bg-gray-400">
      {data.map((item, i) => (
        <Room key={i} name={item.name} join={item._id} />
      ))}
    </div>
  );
}
