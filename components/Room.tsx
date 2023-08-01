import React from "react";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";

export default function Room({ name, join }: { name: string; join: string }) {
  const router = useRouter();
  const joinRoom = () => {
    router.push(`/Chat/${join}`);
  };
  return (
    <div className="flex items-center gap-2 justify-between w-full pb-1 border-b-2 border-gray-500">
      <h2 className="room-name text-[24px] text-white">{name}</h2>
      <CustomButton type="button" label="Join" handleClick={joinRoom} />
    </div>
  );
}
