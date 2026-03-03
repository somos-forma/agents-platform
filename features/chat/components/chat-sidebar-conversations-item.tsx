import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
interface ChatSidebarConversationsItemProps {
  name: string;
  lastMessage: string;
  onClick?: () => void;
  onDelete?: () => void;
}

export const ChatSidebarConversationsItem = ({
  name,
  lastMessage,
  onClick,
  onDelete,
}: ChatSidebarConversationsItemProps) => {
  return (
    <div
      className="px-2 py-2 flex items-center justify-between gap-1 cursor-pointer border rounded-md group  dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={onClick}
    >
      <div>
        <p className="font-medium truncate text-xs  max-w-[160px]">{name}</p>
        {lastMessage && (
          <p className="text-xs text-gray-500  truncate max-w-[160px]">
            {lastMessage}
          </p>
        )}
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        variant="ghost"
        className=" p-0.5 opacity-0 group-hover:opacity-100"
      >
        <Trash2 />
      </Button>
    </div>
  );
};
