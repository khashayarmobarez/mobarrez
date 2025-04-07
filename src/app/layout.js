import { Inter } from "next/font/google";
import "@/styles/globals.css"; // Import global styles
import Logo from "@/assets/logo/Logo";
import Navbar from "@/modules/Navbar";

// Configure Inter with weights and subsets
const inter = Inter({
  subsets: ["greek"],
  weight: ["400", "700"], // 400 for Regular, 700 for Bold
  variable: "--font-inter", // Optional: for custom CSS usage
});


export const metadata = {
  title: "Mobarrez - Precision in Progress",
  description: "Mobarrez delivers precision-engineered web solutions, bold branding, and smart marketing strategies to drive business growth—using a modern tech stack.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className={``}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
