import { Category } from "@/payload-types";
import { CategoryDropdown } from "./(search-filters)/CategoryDropdown";

interface Props {
  data: Category[];
}

export const Categories = ({ data }: Props) => {
  return (
    <div className="relative w-full bg-blue-300">
      <div className="flex flex-nowrap items-center gap-2">
        {data?.map((category) => (
          <div key={category.id} className="">
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
