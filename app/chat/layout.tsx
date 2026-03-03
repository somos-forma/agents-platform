import { ChatFooter } from "@/components/chat-footer";
import { ChatHeader } from "@/components/chat-header";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChatHeader />
      {children}
      {/* <ChatFooter /> */}
    </>
  );
}
