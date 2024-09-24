import React from "react";

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </>
  );
};

export default Header;
