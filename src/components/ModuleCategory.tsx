import type { Category } from "../types";
import { ModuleCard } from "./ModuleCard";

interface ModuleCategoryProps {
  category: Category;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: (categoryId: string) => void;
  onDeselectAll: (categoryId: string) => void;
}

export function ModuleCategory({
  category,
  selectedIds,
  onToggle,
  onSelectAll,
  onDeselectAll,
}: ModuleCategoryProps) {
  const selectedInCategory = category.modules.filter((m) => selectedIds.has(m.id)).length;
  const total = category.modules.length;
  const allSelected = selectedInCategory === total;

  return (
    <section
      id={`cat-${category.id}`}
      className="scroll-mt-24 rounded-[24px] bg-white p-4 sm:p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3f4f6] text-xl">
              {category.icon}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-black leading-tight">
                {category.name}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() =>
              allSelected ? onDeselectAll(category.id) : onSelectAll(category.id)
            }
            className="rounded-full bg-[#f3f4f6] hover:bg-[#ececec] px-3 py-1 font-medium text-black"
          >
            {allSelected ? "Clear" : "Select all"}
          </button>
        </div>
      </header>

      <div className="space-y-3">
        {category.modules.map((m) => (
          <ModuleCard
            key={m.id}
            module={m}
            selected={selectedIds.has(m.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}
