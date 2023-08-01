"use client";
import ChatRooms from "@/components/ChatRooms";
import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";
import { createChatroom, getChatrooms } from "@/utils";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState<object[]>([]);
  const [update, setUpdate] = useState(false);

  const clickHandler = (e: any) => {
    if (e.key === "Enter") {
      console.log("submitted");
      submitForm(e);
    }
  };
  async function submitForm(e: any) {
    e.preventDefault();
    try {
      if (!room) throw new Error("Please fill all fields");
      // alert(`Submitted ${room} successfully!`);
      setUpdate(await createChatroom(room));
      setRoom("");
    } catch (error) {
      alert(`${error}`);
    }
  }
  const getData = async () => {
    const data = await getChatrooms();
    setRooms(data);
    setUpdate(false);
  };
  useEffect(() => {
    getData();
  }, [update]);

  return (
    <div className="card-form items-center">
      <h1 className="card-title">Chat Room</h1>
      <InputForm
        handleKeyDown={clickHandler}
        type="text"
        name="chatroom"
        placeholder="Create chat room"
        required={true}
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <CustomButton type="submit" handleClick={submitForm} label="Create" />
      {rooms && rooms.length > 0 && <ChatRooms data={rooms} />}
    </div>
  );
}
