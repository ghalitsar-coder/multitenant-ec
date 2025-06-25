"use client";
import { useEffect, useRef, useState } from "react";
import { CategoryDropdown } from "./(search-filters)/CategoryDropdown";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSidebar } from "./(search-filters)/CategoriesSidebar";
import { CategoriesGetManyOuput } from "@/modules/categories/type";

interface Props {
  data: CategoriesGetManyOuput;
}

export const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";

  const activeCategoryIndex = data.findIndex(
    (cat) => cat.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;
      if (containerRef.current && measureRef.current && viewAllRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const viewAllWidth = viewAllRef.current.offsetWidth;

        const availableSpace = containerWidth - viewAllWidth;
        const items = Array.from(measureRef.current.children);
        console.log(`THIS IS  items:`, items)

        let totalWidth = 0;
        let visible = 0;

        for (const item of items) {
          const width = item.getBoundingClientRect().width;
          if (totalWidth + width > availableSpace) break;
          totalWidth += width;
          visible++;
        }

        setVisibleCount(visible);
      }
    };

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);
    return () => {
      resizeObserver.disconnect();
    };
  }, [data.length]);

  return (
    <div className="relative w-full ">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {/* //* MEASURE - HIDDEN    */}
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex "
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {data?.map((category) => (
          <div key={category.id} className="">
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      {/* //* Visible Items   */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center "
      >
        {data?.slice(0, visibleCount).map((category) => (
          <div key={category.id} className="">
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
          <Button
            variant="elevated"
            onClick={() => setIsSidebarOpen(true)}
            className={cn(
              "rounded-full border-transparent hover:border-black",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-white border-primary "
            )}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
