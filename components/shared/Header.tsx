import React from "react";

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl text-center font-bold mt-4">{title}</h1>
      {subtitle && <p className="text-lg md:text-xl text-gray-500 text-center">{subtitle}</p>}
    </>
  );
};

export default Header;