import { useState } from "react";

const Chat = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [context, setContext] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSending(true);
      const response = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context, prompt: input }),
      });
      if (response.ok) {
        const res = await response.json();
        setResult(res.answer);
        setContext(res.context);
      }
      setIsSending(false);
      setInput("");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <section className="flex flex-col items-center">
      <textarea
        className="mb-2 border border-solid border-gray-700"
        cols="50"
        rows="10"
        placeholder="请输入你的问题"
        required
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        className="font-inter font-medium bg-purple-500 text-white py-2 px-4 rounded-md"
        onClick={handleSubmit}
      >
        {isSending ? "发送中" : "发送"}
      </button>
      <p className="">{result === "" ? "无结果" : result}</p>
    </section>
  );
};

export default Chat;
