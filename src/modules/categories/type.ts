import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type CategoriesGetManyOuput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoriesGetSingleOutput = CategoriesGetManyOuput[0];
