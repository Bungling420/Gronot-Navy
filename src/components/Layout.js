import React from "react";
import MainHeader from "./MainHeader";
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <MainHeader />
      <div className="main_container">
        <main>{children}</main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
