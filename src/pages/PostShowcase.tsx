import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { Loader, Card, FormField } from "../components";
import { Link } from "react-router-dom";
import { useSyncCallback } from "../utils";
import { getAllPosts } from "../services";
import { postType } from "../services/post";

interface renderCardsProps {
  data: postType[];
  title: string;
}

const RenderCards: FC<renderCardsProps> = ({ data, title }) => {
  return data?.length > 0 ? (
    <>
      {data.map((post: postType) => (
        <Card _id={post.prompt.slice(10)} key={post.prompt} {...post} />
      ))}
    </>
  ) : (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home: FC = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<postType[]>([]);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<postType[]>([]);
  const [searchTimeout, setSearchTimeout] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data } = await getAllPosts("/api/v1/post");
        console.log(data);
        setAllPosts(data.reverse());
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleResults = useSyncCallback(() => {
    const timer = setTimeout(() => {
      const searchedResult = allPosts?.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchedResults(searchedResult);
    }, 500);
    setSearchTimeout(timer);
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    handleResults();
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-extrabold text-3xl text-[#222328] dark:text-white">
            ????????????
          </h1>
          <p className="mt-2 text-[#666e75] text-base max-w-[500px]">
            ??? AI ????????????????????????
          </p>
        </div>

        <Link
          to="/create-post"
          className="font-inter font-medium bg-purple-500 text-white py-2 px-4 rounded-md"
        >
          ??????
        </Link>
      </div>

      <div className="mt-16">
        <FormField
          labelName="????????????"
          type="text"
          name="text"
          placeholder="???????????????????????????????????????????????????????????????"
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
                ???????????? <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="??????????????????" />
              ) : (
                <RenderCards data={allPosts} title="???????????????" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
