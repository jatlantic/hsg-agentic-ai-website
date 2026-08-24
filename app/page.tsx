import Link from "next/link";
import HeroSection from "@/components/HeroSection";

const useCases = [
    {
        icon: "🎯",
        category: "Sales, Marketing & CRM",
        color: "#00802f",
        title: "Autonomous Lead Orchestration & Customer Lifecycle",
        desc: "AI agents that independently research prospects, manage the entire customer lifecycle, and autonomously adjust pricing based on real-time market signals.",
        href: "/anwendungen#sales-crm",
    },
    {
        icon: "💳",
        category: "Financial Services & Accounting",
        color: "#73a5af",
        title: "Intelligent Fraud Detection & Autonomous Reconciliation",
        desc: "Reasoning-capable financial agents that detect suspicious activity, approve standard loans, and cross-reference ERP data to close the books continuously.",
        href: "/anwendungen#finance",
    },
    {
        icon: "🔗",
        category: "Supply Chain & Operations",
        color: "#eb6969",
        title: "Self-Healing Supply Chains via Multi-Agent Systems",
        desc: "Logistics agents that autonomously reroute shipments, execute predictive maintenance, and adjust production schedules in response to real-world disruptions.",
        href: "/anwendungen#supply-chain",
    },
    {
        icon: "🏛️",
        category: "Workforce Strategy & Leadership",
        color: "#0a5f2d",
        title: "Digital Teammates & Strategic OKR Alignment",
        desc: "Agentic AI as a new category of organizational talent — supporting strategic OKR development, managing hybrid teams, and maintaining alignment between goals and execution.",
        href: "/anwendungen#workforce",
    },
];

const features = [
    {
        icon: "🧠",
        title: "AI Foundations",
        text: "From machine learning basics to large language models: understand the key concepts behind modern AI in plain language.",
        href: "/ai-foundations",
    },
    {
        icon: "✍️",
        title: "Mastering Prompting",
        text: "Learn the art of writing prompts that get results. Practical techniques for ChatGPT, Claude, Gemini and other LLMs.",
        href: "/prompting",
    },
    {
        icon: "⚙️",
        title: "Real-World Applications",
        text: "Explore proven AI use cases for businesses—from customer service automation to strategic market analysis.",
        href: "/anwendungen",
    },
    {
        icon: "🎓",
        title: "Executive Courses",
        text: "Intensive training for boards and executives to navigate the next frontier of artificial intelligence.",
        href: "/executive-courses",
    },
];

export default function Home() {
    return (
        <>
            <HeroSection />

            {/* ── Partner Bar (Hidden for now) ── */}
            {/* 
            <div className="partner-bar">
                <div className="container">
                    <p className="partner-bar-label">Trusted by Swiss businesses and institutions</p>
                    <div className="partner-logos">
                        {["IHK St.Gallen", "Wirtschaftsforum", "Swiss AI Hub", "KMU Verband", "HSG Alumni"].map((p) => (
                            <div key={p} className="partner-logo-item">{p}</div>
                        ))}
                    </div>
                </div>
            </div>
            */}

            {/* ── Features ── */}
            <section className="section">
                <div className="container">
                    <div style={{ marginBottom: "3.5rem" }}>
                        <span className="section-label">What We Offer</span>
                        <h2 className="section-title">Everything You Need to<br />Navigate AI Confidently</h2>
                        <p className="section-subtitle">
                            From foundational concepts to hands-on implementation — we provide the tools,
                            knowledge, and community to help your business thrive in the age of AI.
                        </p>
                    </div>

                    <div className="grid-4">
                        {features.map((f) => (
                            <div key={f.title} className="feature-card">
                                <div className="feature-icon">{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-text">{f.text}</p>
                                <Link href={f.href} className="feature-link">
                                    Learn more →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Quote / Mission ── */}
            <div className="quote-block" style={{ textAlign: "center" }}>
                <div className="container">
                    <div className="quote-mark">"</div>
                    <blockquote className="quote-text">
                        Our mission is to make Agentic AI accessible and actionable for every business,
                        regardless of size or technical background.
                    </blockquote>
                    <p className="quote-author">Agentic AI Platform — University of St.Gallen</p>
                </div>
            </div>

            {/* ── Use Cases ── */}
            <section className="section section--alt">
                <div className="container">
                    <div style={{ marginBottom: "3rem" }}>
                        <span className="section-label">Agentic Enterprise Research</span>
                        <h2 className="section-title">Proven Use Cases,<br />Backed by Research</h2>
                        <p className="section-subtitle">
                            How autonomous AI agents are reshaping enterprise operations across four key business functions,
                            grounded in peer-reviewed journals and leading management publications.
                        </p>
                    </div>

                    <div className="grid-2" style={{ gap: "1.5rem" }}>
                        {useCases.map((uc) => (
                            <a
                                key={uc.title}
                                href={uc.href}
                                className="usecase-card"
                                style={{ textDecoration: "none", display: "block", borderTop: `3px solid ${uc.color}` }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
                                    <span style={{ fontSize: "1.25rem" }}>{uc.icon}</span>
                                    <span className="usecase-category" style={{ color: uc.color }}>{uc.category}</span>
                                </div>
                                <h3 className="usecase-title">{uc.title}</h3>
                                <p className="usecase-desc">{uc.desc}</p>
                                <span className="usecase-link">Deep dive with citations →</span>
                            </a>
                        ))}
                    </div>

                    <div style={{ textAlign: "left", marginTop: "3rem" }}>
                        <Link href="/anwendungen" className="btn btn-primary" id="use-cases-all-btn">
                            Explore All Research →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── AI Basics Preview ── */}
            <section className="section">
                <div className="container">
                    <div className="grid-2" style={{ gap: "4rem", alignItems: "center" }}>
                        <div>
                            <span className="section-label">AI Foundations</span>
                            <h2 className="section-title">Understand Agentic AI from the Ground Up</h2>
                            <p style={{ color: "var(--hsg-muted)", lineHeight: 1.75, marginBottom: "2rem", fontSize: "1rem" }}>
                                Whether you're just getting started or want to deepen your understanding,
                                our foundations section covers everything from how autonomous agents function
                                to ethical considerations and data privacy — all explained clearly, without jargon.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                                {["What is Agentic AI?", "How do Autonomous Agents Work?", "AI Ethics & Data Privacy", "The Future of Human-Agent Collaboration"].map((item) => (
                                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--hsg-text)" }}>
                                        <span style={{ width: 24, height: 24, background: "var(--hsg-green-pale)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "var(--hsg-green)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                                        <span style={{ fontSize: "0.95rem" }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/ai-foundations" className="btn btn-primary" id="ai-basics-btn">
                                Explore Foundations →
                            </Link>
                        </div>

                        <div style={{ background: "linear-gradient(135deg, var(--hsg-beige), var(--hsg-beige-lighter))", borderRadius: "var(--radius-lg)", padding: "3rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", background: "var(--hsg-beige-light)", borderRadius: "50%" }} />
                            <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🎓</div>
                            <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", marginBottom: "1rem", fontSize: "1.25rem" }}>
                                Executive Course: The AI Agent Workforce
                            </h3>
                            <p style={{ color: "var(--hsg-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                                Join our upcoming executive course on November 12-13, 2026, and learn to orchestrate autonomous AI for business value.
                            </p>
                            <Link href="/executive-courses" className="btn btn-primary" id="home-exec-cta-btn" style={{ fontSize: "0.875rem" }}>
                                Course Details →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <div className="cta-banner">
                <div className="container">
                    <span className="section-label" style={{ color: "var(--hsg-beige)" }}>Get Involved</span>
                    <h2>Become a Partner or Sponsor</h2>
                    <p>Support the Agentic AI Platform and help us bring autonomous AI knowledge to more businesses across Switzerland and beyond.</p>
                    <Link href="/kontakt" className="btn" id="partner-cta-btn"
                        style={{ background: "white", color: "var(--hsg-green-dark)", border: "2px solid white", padding: "1rem 2.5rem", borderRadius: "4px", fontWeight: 700 }}>
                        Get in Touch →
                    </Link>
                </div>
            </div>
        </>
    );
}
