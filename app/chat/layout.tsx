import { ChatHeader } from "@/components/chat-header";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChatHeader />
      {children}

      <Link
        href="/docs"
        target="_blank"
        className="group   fixed bottom-6 left-6 z-50 flex items-center rounded-full bg-background border shadow-md p-3 group-hover:pr-4 transition-all duration-200 text-foreground hover:shadow-lg overflow-hidden"
      >
        <span className="shiny-sweep " />
        <BookOpen className="size-5 shrink-0 relative z-10" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-200 text-sm font-medium relative z-10">
          Documentación
        </span>
      </Link>
    </>
  );
}
