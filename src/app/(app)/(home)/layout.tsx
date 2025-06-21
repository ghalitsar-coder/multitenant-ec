import React from "react";
import { Navbar } from "../components/(home)/navbar";
import { Footer } from "../components/(home)/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-[#f4f4f0] ">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
