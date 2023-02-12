import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { download, preview } from "../assets";
import { getRandomPrompt } from "../utils/";
import { FormField, Loader } from "../components";
import { downloadImageDirect } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8000/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      }
      setGeneratingImg(false);
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/post-showcase");
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl text-[#222328]">创建图片</h1>
        <p className="mt-2 text-[#666e75] text-base max-w-[500px]">
          通过 AI 创建富有想象力和视觉震撼的图像并与社区分享
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="用户名"
            type="text"
            name="name"
            placeholder="请输入你的用户名"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="描述"
            type="text"
            name="prompt"
            placeholder="请输入你想要的图片的描述"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-blue-500 focus:border-blue-500 w-64 h-64 flex justify-center items-center">
            {form.photo ? (
              <div className="rounded-lg group relative shadow-card hover:shadow-cardhover">
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="hidden group-hover:flex group-hover:justify-center group-hover:absolute group-hover:inset-0 group-hover:rounded-lg group-hover:bg-[rgba(0,0,0,0.5)]">
                  <button
                    type="button"
                    onClick={() => downloadImageDirect(form.prompt, form.photo)}
                    className="outline-none bg-transparent border-none"
                  >
                    <img
                      src={download}
                      alt="download"
                      className="w-10 h-10 object-contain invert"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <img
                src={preview}
                alt={preview}
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white text-sm bg-green-700 font-medium rounded-md w-full px-5 py-2 text-center"
          >
            {generatingImg ? "生成中..." : "生成图片"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-base">
            当生成图片时，你可以将它分享到社区
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-purple-500 rounded-md w-full sm:w-auto px-5 py-2 text-center font-medium"
          >
            {loading ? "分享中..." : "分享到社区"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
