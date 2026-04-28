import type { Module } from "../types";
import { formatOMR } from "../utils/format";

interface PricingSummaryProps {
  selectedModules: Module[];
  subtotal: number;
  packageName: string | null;
  discountPercent: number;
  setDiscountPercent: (v: number) => void;
  discountAmount: number;
  baseAmount: number;
  total: number;
  onClearAll: () => void;
  onGenerateProposal: () => void;
  onContact: () => void;
}

export function PricingSummary({
  selectedModules,
  subtotal,
  packageName,
  discountPercent,
  setDiscountPercent,
  discountAmount,
  baseAmount,
  total,
  onClearAll,
  onGenerateProposal,
  onContact,
}: PricingSummaryProps) {
  return (
    <aside
      id="summary"
      className="lg:sticky lg:top-6 rounded-[28px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-5 sm:p-6 scroll-mt-24"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-display font-semibold text-black">Summary</h3>
        {selectedModules.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-medium text-gray-500 hover:text-black"
          >
            Reset all
          </button>
        )}
      </div>

      <div className="mt-4 max-h-72 overflow-y-auto pr-1">
        {selectedModules.length === 0 ? (
          <div className="text-sm text-gray-500 bg-[#f7f7f7] rounded-[24px] p-5 text-center">
            No modules selected.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {selectedModules.map((m) => (
              <li key={m.id} className="py-2 flex items-start justify-between gap-3 text-sm">
                <span className="text-gray-700 leading-snug">{m.name}</span>
                <span className="font-medium text-black shrink-0">
                  {formatOMR(m.price)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Modules</span>
          <span className="font-semibold text-black">{formatOMR(subtotal)}</span>
        </div>

        {packageName && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{packageName}</span>
            <span className="font-semibold text-black">{formatOMR(baseAmount)}</span>
          </div>
        )}

        <label className="block">
          <span className="text-xs font-medium text-gray-500">Discount</span>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={100}
              value={discountPercent}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (Number.isNaN(v)) {
                  setDiscountPercent(0);
                  return;
                }
                setDiscountPercent(Math.max(0, Math.min(100, v)));
              }}
              className="w-full rounded-2xl bg-[#f7f7f7] outline-none px-3 py-2 text-sm focus:bg-[#efefef]"
              placeholder="0"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </label>

        {discountAmount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Discount</span>
            <span className="font-semibold text-black">
              − {formatOMR(discountAmount)}
            </span>
          </div>
        )}

        <div className="rounded-[24px] bg-[#f7f7f7] px-4 py-4 flex items-baseline justify-between">
          <span className="text-sm font-medium text-gray-500">Estimated Total</span>
          <span className="text-3xl font-display font-semibold text-black">{formatOMR(total)}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        <button
          onClick={onGenerateProposal}
          disabled={selectedModules.length === 0}
          className="w-full rounded-full bg-black hover:bg-[#222] disabled:bg-gray-300 disabled:text-gray-500 text-white font-semibold py-3 text-sm transition"
        >
          Generate Proposal Summary
        </button>
        <button
          onClick={onContact}
          className="w-full rounded-full bg-[#f3f4f6] hover:bg-[#ececec] text-black font-semibold py-3 text-sm transition"
        >
          Contact Us for Final Quotation
        </button>
      </div>
    </aside>
  );
}
