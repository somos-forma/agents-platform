import {
  Bot,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Paperclip,
  User,
} from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import Image from "next/image";

interface Message {
  role: "human" | "ai";
  timestamp: Date;
  content: string;
  attachments?: File[];
}
interface ChatMessageBubbleProps {
  message: Message;
}

export const ChatMessageBubble = ({ message }: ChatMessageBubbleProps) => {
  const styles = {
    human: {
      align: "justify-end",
      background: "bg-primary",
      iconBg: "bg-secondary",
      icon: <User className="w-4 h-4 text-secondary-foreground" />,
      textColor: "text-primary-foreground",
      timestampColor: "text-muted",
      role: "human",
    },
    ai: {
      align: "justify-start",
      background: "bg-card border",
      iconBg: "bg-primary",
      icon: <Bot className="w-4 h-4 text-primary-foreground" />,
      textColor: "text-primary",
      timestampColor: "text-muted-foreground",
      role: "ai",
    },
  };

  const { align, role, background, textColor, timestampColor } =
    styles[message.role];

  return (
    <div className={`flex ${align}`}>
      <div className={`max-w-[60%]`}>
        <AttachmentPreview attachments={message.attachments} />
        {/* message */}
        <div className={`rounded-lg p-4 ${background}`}>
          <div
            className={`prose leading-relaxed break-words overflow-wrap-anywhere ${textColor}`}
          >
            <RichContent message={message.content} />
          </div>
          <div
            className={`flex items-center justify-between ${timestampColor}`}
          >
            <DateTime timestamp={message.timestamp} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RichContent = ({ message }: { message: string }) => {
  return (
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
              // target="_blank"
              // rel="noopener noreferrer"
              className="text-inherit inline-block underline-offset-4 cursor-pointer decoration-dashed decoration-1 hover:text-blue-600 break-words max-w-full"
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
        p: ({ children, ...props }) => {
          return <p className="text-sm mb-2">{children}</p>;
        },
        ul: ({ children, ...props }) => {
          return <ul className="list-disc pl-5  mb-2">{children}</ul>;
        },
        li: ({ children, ...props }) => {
          return <li className="text-sm mb-1">{children}</li>;
        },
        ol: ({ children, ...props }) => {
          return <ol className="list-decimal pl-5 mb-2 ">{children}</ol>;
        },
      }}
    >
      {message}
    </Markdown>
  );
};

const DateTime = ({ timestamp }: { timestamp: Date }) => {
  const date = new Date(timestamp);
  return (
    <p className="text-xs mt-2 opacity-70 ">
      {date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </p>
  );
};

const AttachmentPreview = ({
  attachments,
}: {
  attachments: File[] | undefined;
}) => {
  function renderFileIcon(file: File) {
    if (file.type === "application/pdf") {
      return <FileText className="text-red-500 w-5 h-5" />;
    }
    if (file.type === "text/csv") {
      return <FileSpreadsheet className="text-green-500 w-5 h-5" />;
    }
    return <Paperclip className="text-muted-foreground w-4 h-4" />;
  }
  return (
    <>
      {attachments && attachments.length > 0 && (
        <div className="mb-2 gap-2 flex flex-wrap">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="bg-[#9c9d8a1a] rounded-md inline-flex items-center p-2 gap-2"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={file?.path ? URL.createObjectURL(file) : file?.url}
                  alt={file.name}
                  className="w-8 h-8 object-cover rounded-md"
                />
              ) : (
                renderFileIcon(file)
              )}

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
