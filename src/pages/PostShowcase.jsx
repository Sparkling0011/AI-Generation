import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";
import { Link } from "react-router-dom";
import { useSyncCallback } from "../utils";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleResults = useSyncCallback(() => {
    setSearchTimeout(
      setTimeout(() => {
        console.log(searchText);
        const searchedResult = allPosts?.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchedResult);
      }, 500)
    );
  });

  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    handleResults();
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-extrabold text-3xl text-[#222328]">社区展示</h1>
          <p className="mt-2 text-[#666e75] text-base max-w-[500px]">
            由 AI 生成的图像集展示
          </p>
        </div>

        <Link
          to="/create-post"
          className="font-inter font-medium bg-purple-500 text-white py-2 px-4 rounded-md"
        >
          创建
        </Link>
      </div>

      <div className="mt-16">
        <FormField
          labelName="搜索图片"
          type="text"
          name="text"
          placeholder="请输入用户名称或图片描述来搜索你想要的图片"
          value={searchText}
          handleChange={handleSearch}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                搜索结果 <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="没有搜索结果" />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
