import { Category } from "@/payload-types";
import Link from "next/link";

interface Props {
  category: Category;
  isOpen: boolean;
  position: { top: number; left: number };
}
export const SubcategoryMenu = (props: Props) => {
  const { category, isOpen, position } = props;
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const bgColor = category.color || "#F5F5F5";

  return (
    <div
      className="fixed   z-100  "
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="h-3 w-60 opacity-0 bg-red-300" />
      <ul
        style={{ backgroundColor: bgColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-0.5 "
      >
        {category.subcategories.map((subcategory) => (
          <li key={subcategory.id}>
            <Link
              href="/"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium "
            >
              {" "}
              {subcategory.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
