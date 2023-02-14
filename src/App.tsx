import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo, logoDark } from "./assets";
import { Home, PostShowcase, CreatePost, Chat } from "./pages";

const App = () => {
  let dark = true;
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    dark = true;
  } else {
    document.documentElement.classList.remove("dark");
    dark = false;
  }
  localStorage.removeItem("theme");

  return (
    <BrowserRouter>
      <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
        <header className="w-full h-16 flex justify-between items-center sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] dark:border-b-[#000]">
          <Link to="/">
            <img
              src={dark ? logo : logoDark}
              alt="logo"
              className="w-28 object-contain"
            />
          </Link>
        </header>
        <main className="sm:px-8 px-4 py-8 w-full h-[calc(100vh-64px)] min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/post-showcase" element={<PostShowcase />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/chat" element={<Chat></Chat>}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
