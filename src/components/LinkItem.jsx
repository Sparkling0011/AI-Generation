import React from "react";
import { Link } from "react-router-dom";

const LinkItem = ({ title, discription, url, src }) => {
  return (
    <Link
      to={url}
      className="flex flex-col h-52 w-full relative rounded justify-end px-6 py-2"
    >
      <picture>
        <source type="image/webp" srcSet={src} />
        <source type="image/png" srcSet={src} />
        <img
          src={src}
          alt="background"
          className="absolute min-h-full w-full left-0 top-0"
        />
      </picture>
      <div className="relative text-white font-bold">{title}</div>
      <div className="relative text-sm mt-1 text-white">{discription}</div>
    </Link>
  );
};

export default LinkItem;
