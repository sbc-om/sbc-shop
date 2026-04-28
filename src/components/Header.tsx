import { formatOMR } from "../utils/format";

interface HeaderProps {
  selectedCount: number;
  total: number;
  onScrollToSummary: () => void;
}

export function Header({ selectedCount, total, onScrollToSummary }: HeaderProps) {
  return (
    <header className="bg-white">
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#f3f4f6] text-black flex items-center justify-center text-xl">
            👗
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight text-black">SBC Shop</div>
          </div>
        </div>

        <button
          onClick={onScrollToSummary}
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-black hover:bg-[#ececec] transition"
        >
          <span>{selectedCount} selected</span>
          <span className="text-gray-400">·</span>
          <span className="font-semibold">{formatOMR(total)}</span>
        </button>
      </div>
    </header>
  );
}
