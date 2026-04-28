Build a professional modular pricing estimator website using React + Vite.

The website is for a clothing and fashion retail store in Oman that sells clothes, accessories, and various fashion products. The final website must help the client select the modules they need and instantly calculate the estimated project cost.

The pricing estimator website must be in English only.

Design style:
- Modern, clean, premium, business-friendly UI
- Suitable for a fashion retail business
- Fully responsive for desktop, tablet, and mobile
- Use a professional layout with cards, sections, icons, and clear pricing
- Use Tailwind CSS
- Use smooth UX with selected/unselected states for modules
- Show total price dynamically at the bottom or in a sticky summary box

Core idea:
The client should be able to select different website/business system modules. Each module has:
- Module name
- Short description
- Main features
- Estimated price in OMR
- Checkbox or toggle to select/deselect
- Optional category

Create these module categories:

1. Website & Branding
- Bilingual English/Arabic Website Structure
- Homepage Design
- About Us Page
- Contact Us Page
- Store Location & Google Maps
- Brand Story Section
- WhatsApp Contact Button
- SEO Basic Setup

2. Product Catalog
- Product Categories
- Product Listing Page
- Product Details Page
- Product Images Gallery
- Product Search
- Product Filters by size, color, price, category, and availability
- Related Products
- New Arrivals Section
- Featured Products Section

3. E-Commerce / Online Sales
- Shopping Cart
- Online Checkout
- Customer Registration & Login
- Guest Checkout
- Order Confirmation
- Online Payment Gateway Integration
- Cash on Delivery Option
- Delivery Fee Setup
- Discount Codes & Coupons
- Wishlist
- Order Tracking for Customers

4. Offline Sales / POS
- Point of Sale System
- Walk-in Customer Sales
- Barcode Scanner Support
- Receipt Printing
- Cashier User Role
- Daily Sales Closing
- Return & Exchange Management
- Offline Sales Reports

5. Inventory & Warehouse
- Stock Management
- Product Variants: size, color, model
- Low Stock Alerts
- Multi-branch Inventory
- Stock Transfer Between Branches
- Purchase Stock Entry
- Supplier Management
- Inventory Adjustment
- Stock Reports

6. Accounting & Finance
- Sales Invoices
- Purchase Invoices
- Expense Management
- Customer Payments
- Supplier Payments
- VAT Calculation
- Profit & Loss Summary
- Daily/Monthly Financial Reports
- Cash Flow Summary
- Export Reports to Excel/PDF

7. CRM & Customer Management
- Customer Database
- Customer Purchase History
- Customer Segmentation
- Loyalty Points System
- Birthday/Occasion Offers
- Customer Notes
- Customer Follow-up System
- WhatsApp Campaign Integration

8. Admin Dashboard
- Main Business Dashboard
- Sales Overview
- Inventory Overview
- Orders Overview
- Financial Summary
- User Management
- Role-Based Access Control
- Activity Logs
- Notifications Center

9. Marketing & Growth
- SEO Optimization
- Blog / Fashion Tips
- Social Media Links
- Instagram Feed Integration
- Promotional Banners
- Email Marketing Setup
- WhatsApp Marketing Setup
- Google Analytics
- Meta Pixel
- Google Search Console Setup

10. Advanced Features
- Mobile App Ready API
- Multi-language System
- Multi-branch Management
- Staff Management
- Delivery Management
- Supplier Portal
- Customer Portal
- AI Product Description Generator
- AI Sales Assistant
- Advanced Reporting & Analytics

11. Support & Maintenance
- Hosting Setup
- Domain Setup
- Email Setup
- Backup System
- Security Setup
- Monthly Maintenance Plan
- Staff Training
- Documentation

Pricing requirements:
Create sample OMR pricing for each module. Prices should look realistic for Oman market.
Use these example price ranges:
- Small/basic modules: 50 to 150 OMR
- Medium modules: 150 to 400 OMR
- Large/advanced modules: 400 to 1,200 OMR
- Enterprise modules: 1,200+ OMR

The pricing calculator must:
- Display all modules grouped by category
- Allow users to select/deselect modules
- Show selected modules list
- Show subtotal
- Show optional discount field or package discount
- Show estimated total price in OMR
- Show a note: “This is an estimated price. Final pricing may vary based on detailed requirements, integrations, and customization.”
- Add a “Generate Proposal Summary” button that displays a clean summary of selected modules and total price
- Add a “Contact Us for Final Quotation” button

Suggested package presets:
Add quick package buttons:
1. Basic Website Package
2. E-Commerce Package
3. Retail Business Package
4. Full ERP + E-Commerce Package

When a user clicks a package, automatically select the related modules.

Technical requirements:
- React + Vite
- Tailwind CSS
- Component-based structure
- Clean code
- Use local state for module selection
- No backend required for now
- Data should be stored in a separate JavaScript file or constant array
- Make it easy to update module names, descriptions, and prices
- Use reusable components:
  - Header
  - ModuleCategory
  - ModuleCard
  - PricingSummary
  - PackageSelector
  - ProposalSummaryModal
  - Footer

Content tone:
Professional, clear, simple, and suitable for business owners.

Final output:
Create the full React + Vite project structure and all necessary code files.