import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Agentic AI Platform – AI Knowledge for Business",
    description: "The University of St.Gallen's central platform for practical and actionable Agentic AI knowledge.",
    keywords: ["Agentic AI", "AI agents", "autonomous systems", "HSG", "business", "SME", "LLM"],
    openGraph: {
        title: "Agentic AI Platform",
        description: "Practical Agentic AI knowledge for businesses – from the University of St.Gallen",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
