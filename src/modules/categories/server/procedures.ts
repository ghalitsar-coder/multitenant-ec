import configPromise from "@payload-config";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { getPayload } from "payload";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ctx}) => {
 
    const data = await ctx.payload.find({
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

    return formattedData;
  }),
});
