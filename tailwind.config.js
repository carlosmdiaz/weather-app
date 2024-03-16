/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-9xl",
    "flex",
    "flex-col",
    "bg-black/50",
    "p-8",
    "rounded-md",
    "z-50",
    "text-center",
    "pb-6",
    "text-gray-300",
    "justify-between",
    "font-bold",
    "text-xl",
    "text-2xl",
    "justify-around",
    "h-[90vh]",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
