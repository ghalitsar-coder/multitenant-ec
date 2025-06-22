import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  return (
    <div className="flex items-center gap-2 w-full">
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
      {/* // TODO: Add library button */}
    </div>
  );
};
