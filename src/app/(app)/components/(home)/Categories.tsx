import { Category } from "@/payload-types";
import { CategoryDropdown } from "./(search-filters)/CategoryDropdown";

interface Props {
  data: Category[];
}

export const Categories = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-2">
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
  );
};
