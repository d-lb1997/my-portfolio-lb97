import localFont from "next/font/local";

export const googleSans = localFont({
  src: [
    {
      path: "../public/fonts/ProductSans-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ProductSans-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ProductSans-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/ProductSans-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/ProductSans-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});
