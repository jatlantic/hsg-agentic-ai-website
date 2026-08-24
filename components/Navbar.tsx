"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const navLinks = [
        { href: "/ai-foundations", label: "AI Foundations" },
        { href: "/prompting", label: "Prompting" },
        { href: "/anwendungen", label: "Applications" },
        { href: "/agent-costs", label: "Agent Costs" },
        { href: "/executive-courses", label: "Executive Courses" },
        { href: "/team", label: "Team" },
        { href: "/kontakt", label: "Contact" },
    ];

    return (
        <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
            <div className="container">
                <div className="navbar-inner">
                    <Link href="/" className="navbar-logo">
                        <Image
                            src="/itm-logo.png"
                            alt="Institute of Technology Management, University of St.Gallen"
                            width={140}
                            height={44}
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </Link>

                    <div className="navbar-nav" role="navigation" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={pathname === link.href ? "active" : ""}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="navbar-cta">
                        <Link href="/kontakt" className="btn btn-primary" id="nav-cta-btn">
                            Get Started →
                        </Link>
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {menuOpen && (
                    <div
                        style={{
                            padding: "1rem 0",
                            borderTop: "1px solid var(--hsg-border)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    padding: "0.75rem 0",
                                    color: "var(--hsg-text)",
                                    fontWeight: 500,
                                    fontSize: "0.95rem",
                                    borderBottom: "1px solid var(--hsg-border)",
                                }}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
