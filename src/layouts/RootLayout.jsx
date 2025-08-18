import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main
        style={{ minHeight: "calc(100vh - 373px)" }}
        className="flex justify-center items-center"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
