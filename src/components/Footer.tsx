export function Footer() {
  return (
    <footer className="mt-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f3f4f6] text-black flex items-center justify-center text-lg">
              👠
            </div>
            <span className="font-bold text-black">SBC Shop</span>
          </div>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Modular retail business systems for fashion brands across Oman — websites,
            e-commerce, POS, inventory, and management software.
          </p>
        </div>

        <div>
          <div className="font-semibold text-black mb-2">Solutions</div>
          <ul className="space-y-1.5 text-gray-600">
            <li>🛒 Fashion E-Commerce</li>
            <li>🏬 POS & Inventory</li>
            <li>🧾 Accounting & VAT</li>
            <li>🚀 Multi-branch ERP</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-black mb-2">Get in Touch</div>
          <ul className="space-y-1.5 text-gray-600">
            <li>📍 Sultanate of Oman</li>
            <li>📧 contact@sbcshop.example</li>
            <li>📞 +968 0000 0000</li>
          </ul>
        </div>
      </div>

      <div>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} SBC Shop. All rights reserved.</span>
          <span>Prices are estimates in OMR and may vary based on final scope.</span>
        </div>
      </div>
    </footer>
  );
}
