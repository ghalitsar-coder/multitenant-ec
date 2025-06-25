"use client";
// * SERVER COMPONENT
// import { getQueryClient, trpc } from "@/trpc/server";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

// CLIENT COMPONENT

const Home = () => {
  // ** SERVER COMPONENT
  // const queryClient = getQueryClient();
  // const categories = await queryClient.fetchQuery(
  //   trpc.categories.getMany.queryOptions()
  // );

  // ** CLIENT SIDE 
  const trpc = useTRPC();
  const { data, isLoading } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Payload CMS {`isloading ${isLoading}`}{" "}
      </h1>
      <p className="text-lg mb-6">{JSON.stringify(data, null, 2)}</p>
    </div>
  );
};

export default Home;
