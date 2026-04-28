import { useEffect, useMemo } from "react";
import type { Category, Module } from "../types";
import { formatOMR } from "../utils/format";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

interface ProposalSummaryModalProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  selectedModules: Module[];
  subtotal: number;
  packageName: string | null;
  discountPercent: number;
  discountAmount: number;
  baseAmount: number;
  total: number;
  onContact: () => void;
}

export function ProposalSummaryModal({
  open,
  onClose,
  categories,
  selectedModules,
  subtotal,
  packageName,
  discountPercent,
  discountAmount,
  baseAmount,
  total,
  onContact,
}: ProposalSummaryModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const grouped = useMemo(() => {
    const selectedSet = new Set(selectedModules.map((m) => m.id));
    return categories
      .map((c) => ({
        category: c,
        modules: c.modules.filter((m) => selectedSet.has(m.id)),
      }))
      .filter((g) => g.modules.length > 0);
  }, [categories, selectedModules]);

  const handlePrint = () => {
    const groupedMarkup = grouped
      .map(({ category, modules }) => {
        const subTotal = modules.reduce((sum, module) => sum + module.price, 0);
        const itemsMarkup = modules
          .map(
            (module) => `
              <li class="module-row">
                <span>${escapeHtml(module.name)}</span>
                <strong>${escapeHtml(formatOMR(module.price))}</strong>
              </li>`,
          )
          .join("");

        return `
          <section class="category-block">
            <div class="category-head">
              <h3>${escapeHtml(category.icon)} ${escapeHtml(category.name)}</h3>
              <span>${escapeHtml(formatOMR(subTotal))}</span>
            </div>
            <ul class="module-list">${itemsMarkup}</ul>
          </section>`;
      })
      .join("");

    const packageRow = packageName
      ? `
        <div class="summary-row">
          <span>${escapeHtml(packageName)}</span>
          <strong>${escapeHtml(formatOMR(baseAmount))}</strong>
        </div>`
      : "";

    const discountRow = discountPercent > 0
      ? `
        <div class="summary-row">
          <span>Discount (${discountPercent}%)</span>
          <strong>- ${escapeHtml(formatOMR(discountAmount))}</strong>
        </div>`
      : "";

    const emptyMarkup = `
      <p class="empty-state">You haven't selected any modules yet.</p>`;

    const contentMarkup = selectedModules.length === 0
      ? emptyMarkup
      : `
        <div class="content-stack">
          ${groupedMarkup}
          <section class="summary-block">
            <div class="summary-row">
              <span>Modules</span>
              <strong>${escapeHtml(formatOMR(subtotal))}</strong>
            </div>
            ${packageRow}
            ${discountRow}
            <div class="summary-total">
              <span>Estimated Total</span>
              <strong>${escapeHtml(formatOMR(total))}</strong>
            </div>
          </section>
          <p class="note">
            This is an estimated price. Final pricing may vary based on detailed requirements,
            integrations, and customization.
          </p>
        </div>`;

    const printHtml = `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Proposal Summary</title>
          <style>
            @page {
              size: auto;
              margin: 10mm;
            }

            :root {
              color-scheme: light;
              --ink: #111111;
              --muted: #6b7280;
              --soft: #f5f5f5;
            }

            html,
            body {
              margin: 0;
              padding: 0;
            }

            * {
              box-sizing: border-box;
            }

            body {
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              color: var(--ink);
              background: #ffffff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .page {
              max-width: 900px;
              margin: 0 auto;
              padding: 20px 18px;
            }

            .header {
              margin-bottom: 24px;
            }

            h1 {
              font-size: 32px;
              line-height: 1.1;
              margin: 0;
            }

            .meta {
              font-size: 12px;
              color: var(--muted);
              margin-top: 6px;
            }

            .content-stack {
              display: block;
            }

            .category-block,
            .summary-block {
              background: var(--soft);
              border-radius: 20px;
              padding: 16px;
              margin-bottom: 16px;
            }

            .category-head,
            .summary-row,
            .summary-total,
            .module-row {
              display: flex;
              justify-content: space-between;
              gap: 12px;
            }

            .category-head {
              align-items: center;
              margin-bottom: 10px;
              padding-bottom: 10px;
              border-bottom: 1px solid #e5e7eb;
            }

            .category-head h3 {
              margin: 0;
              font-size: 16px;
            }

            .module-list {
              list-style: none;
              padding: 0;
              margin: 0;
              display: grid;
              gap: 8px;
            }

            .module-row,
            .summary-row {
              font-size: 14px;
              color: #374151;
            }

            .module-row strong,
            .summary-row strong,
            .summary-total strong {
              color: var(--ink);
              white-space: nowrap;
            }

            .summary-block {
              margin-top: 4px;
            }

            .summary-total {
              margin-top: 12px;
              padding-top: 12px;
              border-top: 1px solid #d1d5db;
              align-items: baseline;
            }

            .summary-total span {
              font-size: 14px;
              font-weight: 600;
            }

            .summary-total strong {
              font-size: 28px;
            }

            .note,
            .empty-state {
              font-size: 12px;
              line-height: 1.6;
              color: var(--muted);
              margin: 0;
            }

            @media print {
              html,
              body {
                width: 100%;
                height: auto;
                overflow: visible;
              }

              .page {
                max-width: none;
                width: 100%;
                margin: 0;
                padding: 0;
              }

              .header,
              .note,
              .empty-state {
                break-inside: auto;
                page-break-inside: auto;
              }

              .content-stack {
                display: block;
              }

              .category-block,
              .summary-block {
                break-inside: auto;
                page-break-inside: auto;
                margin-bottom: 12px;
              }

              .category-head,
              .summary-row,
              .summary-total,
              .module-row {
                align-items: flex-start;
              }
            }
          </style>
        </head>
        <body>
          <main class="page">
            <header class="header">
              <div>
                <h1>Proposal Summary</h1>
                <p class="meta">Generated on ${escapeHtml(new Date().toLocaleDateString("en-GB"))} · SBC Shop · Sultanate of Oman</p>
              </div>
            </header>
            ${contentMarkup}
          </main>
        </body>
      </html>
    `;

    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.visibility = "hidden";

    document.body.appendChild(iframe);

    const printDocument = iframe.contentWindow?.document;
    const printWindow = iframe.contentWindow;

    if (!printDocument || !printWindow) {
      document.body.removeChild(iframe);
      window.print();
      return;
    }

    printDocument.open();
    printDocument.write(printHtml);
    printDocument.close();

    const cleanup = () => {
      window.setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 0);
    };

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };

    printWindow.onafterprint = cleanup;
    window.setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
    window.setTimeout(cleanup, 1000);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-[28px] bg-white shadow-2xl flex flex-col print:max-h-none print:shadow-none">
        <header className="flex items-start justify-between gap-3 px-6 py-5">
          <div>
            <h2 id="proposal-title" className="text-3xl font-display font-semibold text-black">
              Proposal Summary
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Generated on {new Date().toLocaleDateString("en-GB")} · SBC Shop · Sultanate of
              Oman
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 hover:bg-[#f3f4f6] text-gray-500"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </header>

        <div className="overflow-y-auto px-6 py-5">
          {selectedModules.length === 0 ? (
            <p className="text-sm text-gray-500">
              You haven't selected any modules yet.
            </p>
          ) : (
            <div className="space-y-6">
              {grouped.map(({ category, modules }) => {
                const subTotal = modules.reduce((s, m) => s + m.price, 0);
                return (
                  <section key={category.id} className="rounded-[20px] bg-[#f7f7f7] p-4">
                    <div className="flex items-center justify-between pb-2 mb-2">
                      <h3 className="font-semibold text-black flex items-center gap-2">
                        <span className="text-lg">{category.icon}</span>
                        {category.name}
                      </h3>
                      <span className="text-xs text-gray-500">{formatOMR(subTotal)}</span>
                    </div>
                    <ul className="space-y-1.5 text-sm">
                      {modules.map((m) => (
                        <li
                          key={m.id}
                          className="flex items-start justify-between gap-3 text-gray-700"
                        >
                          <span>{m.name}</span>
                          <span className="font-medium text-black shrink-0">
                            {formatOMR(m.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}

              <section className="bg-[#f7f7f7] rounded-[20px] p-4 mt-4">
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <span>Modules</span>
                  <span className="font-semibold text-black">{formatOMR(subtotal)}</span>
                </div>
                {packageName && (
                  <div className="flex items-center justify-between text-sm text-black mt-1">
                    <span>{packageName}</span>
                    <span className="font-semibold text-black">{formatOMR(baseAmount)}</span>
                  </div>
                )}
                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-sm text-black mt-1">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-semibold text-black">− {formatOMR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between mt-3 pt-3">
                  <span className="text-sm font-medium text-black">Estimated Total</span>
                  <span className="text-3xl font-display font-semibold text-black">
                    {formatOMR(total)}
                  </span>
                </div>
              </section>

              <p className="text-[11px] leading-relaxed text-gray-500">
                This is an estimated price. Final pricing may vary based on detailed
                requirements, integrations, and customization.
              </p>
            </div>
          )}
        </div>

        <footer className="px-6 py-4 flex flex-wrap gap-2 justify-end print:hidden">
          <button
            onClick={handlePrint}
            className="rounded-full bg-[#f3f4f6] hover:bg-[#ececec] px-4 py-2 text-sm font-medium text-black"
          >
            Print / Save as PDF
          </button>
          <button
            onClick={onContact}
            className="rounded-full bg-black hover:bg-[#222] text-white px-4 py-2 text-sm font-semibold"
          >
            Contact Us for Final Quotation
          </button>
        </footer>
      </div>
    </div>
  );
}
