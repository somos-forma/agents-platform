import { User } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";

interface ChatUserMessageBubbleProps {
  message: string;
  timestamp: Date;
}
export const ChatUserMessageBubble = ({
  message,
  timestamp,
}: ChatUserMessageBubbleProps) => {
  const date = new Date(timestamp);
  return (
    <div className="flex justify-end gap-3">
      <div className="max-w-[70%] rounded-lg p-4 bg-primary">
        <div className="prose text-sm leading-relaxed max-w-none break-all text-primary-foreground">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              [
                rehypeExternalLinks,
                { target: "_blank", rel: ["noopener", "noreferrer"] },
              ],
            ]}
          >
            {message}
          </Markdown>
        </div>
        <p className="text-xs mt-2 opacity-70 text-muted">
          {date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
        <User className="w-4 h-4 text-secondary-foreground" />
      </div>
    </div>
  );
};
