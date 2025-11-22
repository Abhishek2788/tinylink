import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tiny Link",
  description: "Tiny Link is a web app used to make large URL short.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`{geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f0f9ff_40%,white_100%)] dark:bg-[radial-gradient(circle_at_top,#0f172a_0%,#1e293b_40%,black_100%)] text-gray-900 dark:text-gray-100}`}
      >
        {children}
        <Toaster position="top-right" toastOptions={{style: {background: "#333",color: "#fff",borderRadius: "10px",},}}/>
      </body>
    </html>
  );
}
