"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./SubcategoryMenu";
import Link from "next/link";
import { CategoriesGetManyOuput } from "@/modules/categories/type";

interface Props {
  category: CategoriesGetManyOuput[0];
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = (props: Props) => {
  const { category, isActive, isNavigationHovered } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };
  const dropdownPostion = getDropdownPosition();

  return (
    <div
      className="relative "
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative ">
        <Button
          variant="elevated"
          className={cn(
            "rounded-full border-transparent hover:border-black",
            isActive && !isNavigationHovered && "bg-white border-primary ",
            isOpen &&
              "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1 "
          )}
        >
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px]  border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2 ",
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>
      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPostion}
      />
    </div>
  );
};
