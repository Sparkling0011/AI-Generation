import { LinkItem } from "../components";

const Home = () => {
  return (
    <div className="w-2/3 h-full relative left-1/2 -translate-x-2/4">
      <section>
        <h1 className="font-extrabold text-3xl text-[#222328]">
          欢迎使用Open AI
        </h1>
      </section>
      <section className="grid justify-between grid-cols-2 gap-32 mx-0 mt-6 mb-12">
        <LinkItem
          title="图片生成"
          discription="生成你想要的图片内容"
          url="/post-showcase"
          src="https://cdn.openai.com/API/images/gradient_card_1.png"
        ></LinkItem>

        <LinkItem
          title="chatGPT"
          discription="在线交流"
          url="/chat"
          src="https://cdn.openai.com/API/images/gradient_card_2.png"
        ></LinkItem>
      </section>
    </div>
  );
};
export default Home;
