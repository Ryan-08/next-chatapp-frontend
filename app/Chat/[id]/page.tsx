"use client";

import InputForm from "@/components/InputForm";
import Message from "@/components/Message";
import { useAppContext, useChatContext } from "@/context/state";
import { ObjectProps } from "@/types";
import { getMessages } from "@/utils";
import React, { useEffect, useState } from "react";

export default function Chat({ params }: { params: { id: string } }) {
  const roomID = params.id;
  const { setupSocket } = useAppContext();
  const { socket } = useChatContext();
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ObjectProps[]>([]);
  // console.log(socket?._opts.query.token);

  const submitMessage = (event: any) => {
    if (!msg || msg === "") return false;
    if (event.key === "Enter") {
      setMsg("");
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        roomID,
        message: msg,
      });
    }
  };
  const fetchMessage = async () => {
    const messageFromDB = await getMessages(roomID);
    setMessages(messageFromDB);
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchMessage();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        roomID,
      });
    }
    // component unmount
    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          roomID,
        });
      }
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("CC_token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message: any) => {
        setMessages([...messages, message]);
      });
      scrollBot();
    }
  }, [messages]);

  const scrollBot = () => {
    console.log(messages);
    const chatroom = document.querySelector(".chatroom");
    chatroom?.scrollTo(0, chatroom.scrollHeight);
  };
  return (
    <>
      <div className="w-full sm:w-[50%] mx-auto">
        <div className="room flex flex-col bg-gray-300 h-screen relative">
          <h1 className="p-8 text-center bg-blue-400 text-[36px] font-semibold">
            Room Name
          </h1>
          {/* chatroom */}
          <div className="chatroom flex-1 px-8 py-4 flex flex-col gap-4 overflow-auto">
            {!loading &&
              messages.length > 0 &&
              messages.map((message, i) => (
                // /* Messages will be displayed here */
                <Message user={userId} message={message} index={i} />
              ))}
          </div>
          {/* <div className="input-wrapper sticky bottom-0 w-full"> */}
          {/* Input Box for sending messages to the server  */}
          <InputForm
            styles="w-full"
            type="text"
            placeholder={"Type a message..."}
            handleKeyDown={submitMessage}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
