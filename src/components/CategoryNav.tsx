import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Category } from "../types";

interface CategoryNavProps {
  categories: Category[];
  selectedIds: Set<string>;
}

export function CategoryNav({ categories, selectedIds }: CategoryNavProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <nav className="sticky top-0 z-20 -mx-5 sm:-mx-6 px-5 sm:px-6 py-3 bg-white rounded-t-[24px]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-xs font-medium text-gray-500">Drag to browse categories</div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-black disabled:opacity-40"
            aria-label="Scroll categories left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-black disabled:opacity-40"
            aria-label="Scroll categories right"
          >
            →
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">
          {categories.map((c) => {
            const selectedCount = c.modules.filter((m) => selectedIds.has(m.id)).length;
            return (
              <div key={c.id} className="min-w-0 shrink-0 basis-auto">
                <a
                  href={`#cat-${c.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#f3f4f6] hover:bg-[#ececec] transition px-3.5 py-1.5 text-xs sm:text-sm font-medium text-black whitespace-nowrap"
                >
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                  {selectedCount > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-[10px] font-bold rounded-full bg-black text-white">
                      {selectedCount}
                    </span>
                  )}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
