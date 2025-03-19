import React from "react";
import NavigationBar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
