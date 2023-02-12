import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo } from "./assets";
import { Home, PostShowcase, CreatePost, Chat } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
      </header>
      <main className="sm:px-8 px-4 py-8 w-full bg-slate-100 h-[calc(100vh-73px)] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/post-showcase" element={<PostShowcase />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/chat" element={<Chat></Chat>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
