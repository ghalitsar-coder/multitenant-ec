import { Category } from "@/payload-types";
import { SearchInput } from "./search-input";
import { Categories } from "../Categories";

interface SearchFiltersProps {
  data: Category[];
}

export const SearchFilters = ({ data }: SearchFiltersProps) => {
  console.log("data", data);
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <Categories data={data} />
    </div>
  );
};
