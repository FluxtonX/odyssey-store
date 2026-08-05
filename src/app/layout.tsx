import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  title: "SpokenOdyssey Smart Glasses — Premium Flagship Store",
  description: "Experience the flagship 4K HDR Voice-Activated Smart Recording Glasses. Hands-free capture, 3D spatial audio, and instant AI memory sync.",
  keywords: ["Smart Glasses", "Recording Glasses", "SpokenOdyssey", "4K Video Glasses", "Voice Memory Vault", "AI Glasses"],
  openGraph: {
    title: "SpokenOdyssey Smart Glasses Store",
    description: "Capture life's precious moments hands-free in 4K HDR and spatial 3D audio.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-white overflow-x-hidden selection:bg-[#4A3AFF] selection:text-white">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
