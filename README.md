
## 🛠️ Technologies Used

- **HTML5**: Semantic markup.
- **Tailwind CSS**: Utility-first CSS framework (via CDN).
- **JavaScript (ES6+)**: Vanilla JS for interactivity.
- **Google Fonts**: 'Syne' and 'Space Grotesk'.
- **Icons**: Heroicons (SVG).

## 📋 Pages Description

### 1. Home (`index.html`)
- Hero section with animated gradient orbs.
- Services overview (20 services).
- Customer feedback slider.
- Call-to-action sections.

### 2. About Us (`about.html`)
- Company timeline (Founded Jan 2026).
- Team profiles (CEO Kaawya Chandrasekara, Developer Navindu Wishwarawi).
- 20 Services list with marquee animation.
- Core values and statistics.

### 3. Projects (`project.html`)
- **Sidebar Filters**: Search, Sort, Category filter.
- **Project Grid**: 20 sample projects.
- **Cart System**: Sidebar cart with coupon support.
- **Checkout Wizard**: 3-step process (Contact -> Payment -> Review).
- **Payment Methods**: Bank, Pay Later (30% advance), Monthly (Installments), QR (5% fee).

### 4. Support (`support.html`)
- Hotline and Email details.
- Contact form sending messages to WhatsApp.

### 5. Contact (`contact.html`)
- Direct WhatsApp integration.
- Location map placeholder.

## 💳 Payment Logic

The checkout system supports complex pricing logic:
1. **Subtotal**: Sum of selected projects.
2. **Discount**: Automatic 10% off for orders over $500.
3. **Coupon**: Additional discounts via codes.
4. **Tax**: 5% tax applied.
5. **Service Charge**: Fixed $25 fee.
6. **Extra Fees**: 
    - **QR Payment**: +5% processing fee.
    - **Monthly Installments**: Interest based on period (2% - 40%).

## 🎨 Color Palette

- **Primary Green**: `#00d46a` (Accent)
- **Primary Red**: `#ff3d3d` (Accent Red)
- **Dark Background**: `#0a0a0a`
- **Light Background**: `#fafafa`

## 📱 Contact Information

- **Hotline**: 077 504 8455
- **Email**: dmkaawya@gmail.com
- **Website**: [vezlo-web.vercel.app](https://vezlo-web.vercel.app/)
- **Developer**: [dmkaawya.vercel.app](https://dmkaawya.vercel.app/)

## 🔧 Setup & Installation

1. Download or clone the repository.
2. No build tools required.
3. Open `index.html` in your browser.
4. To deploy, upload files to any static hosting (Vercel, Netlify, GitHub Pages).

## 📝 Customization

- **Projects**: Edit the `projectsData` array in `project.html`.
- **Services**: Edit the list in `about.html` or `index.html`.
- **Colors**: Change CSS variables in the `:root` section of `<style>`.
- **WhatsApp Number**: Update the phone number in the JavaScript `submitOrder` function.

## 📄 License

2026 Copyright. All rights reserved.
Powered by Vezlo.
Developed by dmkaawya.
