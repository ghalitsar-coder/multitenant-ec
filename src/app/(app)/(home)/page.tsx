import configPromise from "@payload-config";
import { getPayload } from "payload";

const page = async () => {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "users",
    limit: 5,
  });
  console.log(`THIS IS  data:`, data)
  return (
   
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Payload CMS</h1>
      <p className="text-lg mb-6">
        This is a simple example of a home page using Payload CMS.
      </p>
       
    </div>
  );
};

export default page;
