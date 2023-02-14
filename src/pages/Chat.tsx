import { useEffect, useReducer, useState } from "react";

import { postPrompt } from "../services";
import { FormField } from "../components";
import Message from "../components/Message";

const Chat = () => {
  const [input, setInput] = useState("");
  interface messageType {
    type: string;
    message: string;
  }

  const reducer = (
    state: messageType[],
    action: { type: string; message: string }
  ) => {
    switch (action.type) {
      case "Human": {
        return [...state, { type: "Human", message: action.message }];
      }
      case "AI": {
        return [...state, { type: "AI", message: action.message }];
      }
    }
    throw Error("Unknown action: " + action.type);
  };
  const [messageList, dispatch] = useReducer(reducer, []);
  const [context, setContext] = useState("");
  const [isSending, setIsSending] = useState(false);
  let tempAnswer = "";

  const handleSubmit = async () => {
    try {
      setIsSending(true);
      dispatch({ type: "Human", message: input });
      const { answer, updateContext } = await postPrompt("/api/v1/chat", {
        body: JSON.stringify({ context, prompt: input }),
      });
      dispatch({ type: "AI", message: answer });
      setContext(updateContext);
      setIsSending(false);
      setInput("");
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const handleChange = (e: any) => {
    setInput(e.target?.value);
  };
  return (
    <section className="h-4/5">
      <h1 className="font-extrabold text-3xl mb-2">ChatGPT问答</h1>
      <div className="fixed bottom-6 left-24 right-24 flex justify-evenly items-center">
        <div className="w-96">
          <FormField
            type="input"
            placeholder="请输入你的问题"
            value={input}
            handleChange={handleChange}
          ></FormField>
        </div>
        <button
          className="font-inter font-medium bg-purple-500 text-white py-2 px-4 rounded-md"
          onClick={handleSubmit}
        >
          {isSending ? "发送中" : "发送"}
        </button>
      </div>

      <div className="overflow-scroll h-full px-12 bg-red-50	dark:bg-slate-500	py-12 rounded">
        {messageList.map((message) => {
          return (
            <Message
              key={message.message}
              message={message.message}
              type={message.type}
            ></Message>
          );
        })}
      </div>
    </section>
  );
};

export default Chat;
