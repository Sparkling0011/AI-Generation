import { CSSProperties, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { AI, human } from "../assets";
import { messageProps } from "./types";

interface messageContentProps {
  isHuman: boolean;
  message: string;
}

const MessageContent = ({ isHuman, message }: messageContentProps) => {
  return (
    <div className="flex items-center mb-2">
      <img
        src={isHuman ? human : AI}
        alt=""
        className="w-6 h-6 dark:text-white mr-2"
      />
      <ReactMarkdown
        className="bg-slate-100 dark:bg-slate-700 rounded-lg border-1 border-solid border-white p-3"
        children={message}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                showLineNumbers
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={dark}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      ></ReactMarkdown>
    </div>
  );
};

const Message = ({ type, message }: messageProps) => {
  return (
    <div>
      <MessageContent
        isHuman={type === "Human" ? true : false}
        message={message}
      ></MessageContent>
    </div>
  );
};

export default Message;
