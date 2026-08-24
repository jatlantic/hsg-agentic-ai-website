import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <Image
                                src="/itm-logo.png"
                                alt="Institute of Technology Management, University of St.Gallen"
                                width={160}
                                height={50}
                                style={{
                                    objectFit: "contain",
                                    filter: "brightness(0) invert(1)"
                                }}
                            />
                        </div>
                        <p>
                            The Agentic AI knowledge platform of the Institute of Technology Management, University of St. Gallen.
                            Practical, autonomous, and empowering for businesses worldwide.
                        </p>
                        <p style={{ marginTop: "0.75rem", lineHeight: 1.8 }}>
                            ITEM-HSG · Institute of Technology Management<br />
                            Dufourstrasse 40a<br />
                            CH-9000 St.Gallen
                        </p>
                    </div>

                    {/* Knowledge */}
                    <div>
                        <div className="footer-col-title">Knowledge</div>
                        <div className="footer-links">
                            <Link href="/ai-foundations">AI Foundations</Link>
                            <Link href="/prompting">Prompting Guide</Link>
                            <Link href="/anwendungen">Use Cases</Link>
                            <Link href="/ai-foundations#glossar">AI Glossary</Link>
                        </div>
                    </div>

                    {/* Programme */}
                    <div>
                        <div className="footer-col-title">Programme</div>
                        <div className="footer-links">
                            <Link href="/kontakt">Workshops</Link>
                            <Link href="/kontakt">Executive Training</Link>
                            <Link href="/team">Partner Network</Link>
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <div className="footer-col-title">About</div>
                        <div className="footer-links">
                            <Link href="/team">Team</Link>
                            <Link href="/kontakt">Contact</Link>
                            <a href="https://www.unisg.ch" target="_blank" rel="noopener noreferrer">
                                University of St.Gallen ↗
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div>© {new Date().getFullYear()} Agentic AI Platform, Institute of Technology Management (ITEM), University of St.Gallen. All rights reserved.</div>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Imprint</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
