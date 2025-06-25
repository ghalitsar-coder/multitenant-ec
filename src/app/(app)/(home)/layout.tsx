import React, { Suspense } from "react";
import { Navbar } from "../components/(home)/navbar";
import { Footer } from "../components/(home)/footer";
import {
  SearchFilterLoading,
  SearchFilters,
} from "../components/(home)/(search-filters)";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: LayoutProps) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-grow bg-[#f4f4f0] ">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
