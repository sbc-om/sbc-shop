import type { PackagePreset } from "../types";
import { formatOMR } from "../utils/format";

interface PackageSelectorProps {
  packages: PackagePreset[];
  onApplyPackage: (pkg: PackagePreset) => void;
  activePackageId: string | null;
}

export function PackageSelector({
  packages,
  onApplyPackage,
  activePackageId,
}: PackageSelectorProps) {
  return (
    <section id="packages" className="scroll-mt-24">
      <div className="flex items-end justify-between flex-wrap gap-2 mb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-black">
            Packages
          </h2>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        {packages.map((pkg) => {
          const isActive = activePackageId === pkg.id;
          return (
            <article
              key={pkg.id}
              className={[
                "h-full rounded-[24px] px-4 py-4 sm:px-5 sm:py-5 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.04)]",
                isActive
                  ? "bg-[#e5e7eb] text-black"
                  : "bg-[#fafafa] text-black hover:bg-[#f5f5f5]",
              ].join(" ")}
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="min-w-0">
                  <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-display font-semibold leading-none sm:text-xl">
                    {pkg.name}
                  </h3>
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:justify-between">
                  <div className="text-left">
                    <div className="text-xl font-semibold">{formatOMR(pkg.packagePrice)}</div>
                  </div>

                  <button
                    onClick={() => onApplyPackage(pkg)}
                    className={[
                      "w-fit rounded-full px-4 py-2.5 text-sm font-semibold transition",
                      isActive
                        ? "bg-gray-700 text-white hover:bg-gray-800"
                        : "bg-black text-white hover:bg-[#222]",
                    ].join(" ")}
                  >
                    {isActive ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
