import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-screen grid place-content-center gap-y-5 ">
      <Button variant="elevated">hello</Button>
      <Input placeholder="alih laih" />
      <Progress value={50} />
    </div>
  );
};

export default page;
