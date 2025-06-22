import React from "react";
import { Navbar } from "../components/(home)/navbar";
import { Footer } from "../components/(home)/footer";
import { SearchFilters } from "../components/(home)/(search-filters)";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Category } from "@/payload-types";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: LayoutProps) => {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
    pagination: false,
    sort: "-createdAt",
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
  });
  const formattedData = data.docs?.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs || []).map((sub) => ({
      ...(sub as Category),
      subcategories: undefined,
    })),
  }));
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-grow bg-[#f4f4f0] ">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
