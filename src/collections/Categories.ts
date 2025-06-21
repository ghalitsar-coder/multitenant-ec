import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
    slug: "categories",
    labels: {
        singular: "Category",
        plural: "Categories",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
        },
    ],
};
