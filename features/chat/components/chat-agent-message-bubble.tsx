import { Bot, ExternalLink } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
interface ChatAgentMessageBubbleProps {
  message: string;
  timestamp: Date;
}
export const ChatAgentMessageBubble = ({
  message,
  timestamp,
}: ChatAgentMessageBubbleProps) => {
  const date = new Date(timestamp);
  return (
    <div className="flex justify-start gap-3">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="max-w-[70%] rounded-lg p-4 bg-card border text-primary-foreground  ">
        <div className="prose text-sm leading-relaxed max-w-none break-words">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              [
                rehypeExternalLinks,
                { target: "_blank", rel: ["noopener", "noreferrer"] },
              ],
            ]}
            components={{
              a: ({ children, ...props }) => {
                return (
                  <a
                    className="text-black underline-offset-4  decoration-dashed decoration-1 hover:text-blue-800"
                    {...props}
                  >
                    {children}
                    <ExternalLink
                      strokeWidth={1.5}
                      className="inline-block w-4 h-4 ml-1"
                    />
                  </a>
                );
              },
            }}
          >
            {message}
          </Markdown>
        </div>
        <p className="text-xs mt-2 opacity-70 text-muted-foreground">
          {date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
};
