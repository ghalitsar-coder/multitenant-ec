"use client";
import { CustomCategory } from "@/app/(app)/(home)/type";
import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { CategoriesSidebar } from "./CategoriesSidebar";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
  data: CustomCategory[];
}

export const SearchInput = (props: Props) => {
  const { disabled, data } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        data={data}
      />
      <div className="relative w-full bg-red-300 ">
        <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 size-4 text-neutral-400" />
        <Input
          type="text"
          placeholder="Search..."
          className=" pl-8"
          disabled={disabled}
        />
      </div>
      {/* // TODO: ADD categories view all button */}
      <Button
        variant={"elevated"}
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => {
          setIsSidebarOpen(true);
        }}
      >
        <ListFilterIcon />
      </Button>
      {/* // TODO: Add library button */}
    </div>
  );
};
