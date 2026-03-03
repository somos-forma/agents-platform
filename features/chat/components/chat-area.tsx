"use client";
import React from "react";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatFooter } from "./chat-footer";

export const ChatArea = () => {
  return (
    <div className=" grid  grid-rows-[min-content_1fr_min-content] w-full  border rounded-xl">
      <ChatHeader />
      <ChatMessages />
      <ChatFooter />
    </div>
  );
};
