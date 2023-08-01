import React from "react";

export default function Message({ user, message, index }: any) {
  const isSended = user === message.userId;
  const displayStyle = isSended ? "send" : "receive";
  const bgStyle = isSended ? "bg-slate-400" : "bg-blue-400";
  const textStyle = isSended ? "text-blue-600" : "text-slate-600";
  return (
    <div
      key={index}
      className={`message flex gap-6 items-center ${displayStyle}`}
    >
      <span className={`username ${textStyle}`}>{message.name}</span>
      <p className={`p-4 ${bgStyle} rounded-xl`}>{message.message}</p>
    </div>
  );
}
