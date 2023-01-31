import Head from "next/head";
import React, { Fragment, useState } from "react";
import Footer from "../Footer";
import Header from "./Header";

const LayoutAuth = ({ children, title = "Sample Title" }) => {
  //console.log("layout", title)
  const [mobileNavsidebar, setMobileNavsidebar] = useState(false);


  return (
    <Fragment>
      <div className="bg-gray-100 min-h-screen relative">

        <div className="w-full min-h-screen">
          <div className="flex-grow text-gray-800">
            <Header mobileNavsidebar={mobileNavsidebar} setMobileNavsidebar={setMobileNavsidebar} />
            {children}
          </div>
          

        </div>
        <Footer />

      </div>

    </Fragment>


  );
};

export default LayoutAuth;
