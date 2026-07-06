/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1A6FB5',       // xanh đậm — CTA chính, active state
        primaryLight: '#4A9FD4',  // xanh nhạt — icon, highlight
        darkBg: '#EFF6FF',        // xanh rất nhạt — nền toàn app
        cardBg: '#FFFFFF',        // trắng — nền card
        surface: '#F0F7FF',       // xanh cực nhạt — nền icon box, chip
        textMain: '#1A1A2E',      // gần đen — text primary
        textMuted: '#6B7280',      // xám trung — text secondary
        textLight: '#9CA3AF',      // xám nhạt — text muted
        accent: '#F5A623',        // cam vàng
        success: '#2ECC71',
        danger: '#E74C3C',
        borderLight: '#E5E7EB',
        divider: '#F3F4F6',
      },
    },
  },
  plugins: [],
}