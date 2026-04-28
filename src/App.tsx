import { useCallback, useMemo, useState } from "react";
import { categories, packages, allModules } from "./data/modules";
import type { PackagePreset } from "./types";
import { Header } from "./components/Header";
import { ModuleCategory } from "./components/ModuleCategory";
import { PackageSelector } from "./components/PackageSelector";
import { PricingSummary } from "./components/PricingSummary";
import { ProposalSummaryModal } from "./components/ProposalSummaryModal";
import { CategoryNav } from "./components/CategoryNav";
import { formatOMR } from "./utils/format";
import "./App.css";

function App() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [activePackageId, setActivePackageId] = useState<string | null>(null);
  const [proposalOpen, setProposalOpen] = useState<boolean>(false);

  const activePackage = useMemo(
    () => packages.find((pkg) => pkg.id === activePackageId) ?? null,
    [activePackageId],
  );

  const toggleModule = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setActivePackageId(null);
  }, []);

  const selectAllInCategory = useCallback((catId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const cat = categories.find((c) => c.id === catId);
      cat?.modules.forEach((m) => next.add(m.id));
      return next;
    });
    setActivePackageId(null);
  }, []);

  const deselectAllInCategory = useCallback((catId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const cat = categories.find((c) => c.id === catId);
      cat?.modules.forEach((m) => next.delete(m.id));
      return next;
    });
    setActivePackageId(null);
  }, []);

  const applyPackage = useCallback((pkg: PackagePreset) => {
    setSelectedIds(new Set(pkg.moduleIds));
    setActivePackageId(pkg.id);
    requestAnimationFrame(() => {
      document
        .getElementById("summary")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedIds(new Set());
    setActivePackageId(null);
  }, []);

  const selectedModules = useMemo(
    () => allModules.filter((m) => selectedIds.has(m.id)),
    [selectedIds],
  );

  const subtotal = useMemo(
    () => selectedModules.reduce((s, m) => s + m.price, 0),
    [selectedModules],
  );

  const baseAmount = activePackage?.packagePrice ?? subtotal;

  const discountAmount = useMemo(
    () => Math.round(((baseAmount * discountPercent) / 100) * 1000) / 1000,
    [baseAmount, discountPercent],
  );

  const total = Math.max(0, baseAmount - discountAmount);

  const scrollToSummary = useCallback(() => {
    document
      .getElementById("summary")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const contact = useCallback(() => {
    const lines = [
      "Hello, I'd like a final quotation based on this estimate:",
      "",
      ...selectedModules.map((m) => `• ${m.name} — ${formatOMR(m.price)}`),
      "",
      `Estimated Total: ${formatOMR(total)}`,
    ];
    const subject = encodeURIComponent("Final Quotation Request — SBC Shop Estimator");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:contact@sbcshop.example?subject=${subject}&body=${body}`;
  }, [selectedModules, total]);

  return (
    <div className="min-h-screen text-[color:var(--page-ink)] relative overflow-x-hidden">
      <Header
        selectedCount={selectedModules.length}
        total={Math.round(total)}
        onScrollToSummary={scrollToSummary}
      />

      <main className="relative max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-5 xl:gap-6 items-start">
          <div className="space-y-8 min-w-0">
            <div className="rounded-[28px] bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <PackageSelector
                packages={packages}
                onApplyPackage={applyPackage}
                activePackageId={activePackageId}
              />
            </div>

            <div
              id="categories"
              className="rounded-[28px] bg-white p-5 sm:p-6 scroll-mt-24 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-end justify-between flex-wrap gap-2 mb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-black">
                    All Modules
                  </h2>
                  <p className="text-gray-500 mt-1 text-sm">
                    Select the exact scope for your retail store, e-commerce engine, and back-office operations.
                  </p>
                </div>
                {selectedModules.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-sm font-medium text-gray-500 hover:text-black"
                  >
                    Reset all selections
                  </button>
                )}
              </div>

              <CategoryNav categories={categories} selectedIds={selectedIds} />

              <div className="mt-6 space-y-6">
                {categories.map((c) => (
                  <ModuleCategory
                    key={c.id}
                    category={c}
                    selectedIds={selectedIds}
                    onToggle={toggleModule}
                    onSelectAll={selectAllInCategory}
                    onDeselectAll={deselectAllInCategory}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <PricingSummary
              selectedModules={selectedModules}
              subtotal={subtotal}
              packageName={activePackage?.name ?? null}
              discountPercent={discountPercent}
              setDiscountPercent={setDiscountPercent}
              discountAmount={discountAmount}
              baseAmount={baseAmount}
              total={total}
              onClearAll={clearAll}
              onGenerateProposal={() => setProposalOpen(true)}
              onContact={contact}
            />
          </div>
        </div>
      </main>

      {/* Mobile sticky summary bar */}
      <div className="lg:hidden sticky bottom-0 z-30 bg-white px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-6px_24px_rgba(0,0,0,0.06)]">
        <div className="text-xs">
          <div className="text-gray-500">{selectedModules.length} modules</div>
          <div className="font-bold text-black text-base">{formatOMR(total)}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollToSummary}
            className="rounded-full bg-[#f3f4f6] px-3 py-2 text-xs font-medium text-black"
          >
            View
          </button>
          <button
            onClick={() => setProposalOpen(true)}
            disabled={selectedModules.length === 0}
            className="rounded-full bg-black disabled:bg-gray-300 text-white px-3 py-2 text-xs font-semibold"
          >
            Proposal
          </button>
        </div>
      </div>

      <ProposalSummaryModal
        open={proposalOpen}
        onClose={() => setProposalOpen(false)}
        categories={categories}
        selectedModules={selectedModules}
        subtotal={subtotal}
        packageName={activePackage?.name ?? null}
        discountPercent={discountPercent}
        discountAmount={discountAmount}
        baseAmount={baseAmount}
        total={total}
        onContact={contact}
      />
    </div>
  );
}

export default App;
