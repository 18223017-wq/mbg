import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SISPENGAWAS MBG — Badan Gizi Nasional",
  description: "Sistem Pengawasan Berbasis Risiko untuk Program Makan Bergizi Gratis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Sidebar />
        <Header />
        <main className="ml-64 pt-14 min-h-screen" style={{ backgroundColor: "#f5f7fa" }}>
          <div className="p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}