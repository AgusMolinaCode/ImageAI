import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        <h1 className="font-bold text-4xl">
          Whe recognition of the inherent dignity
        </h1>
        <p>Customiza tus imagenes con IA para tu ecommerce</p>
      </div>
      {children}
    </main>
  );
};

export default Layout;
