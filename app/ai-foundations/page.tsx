import Link from "next/link";

const concepts = [
    {
        term: "Artificial Intelligence (AI)",
        def: "The study and design of intelligent computational agents capable of perceiving environments and performing tasks to maximize their chances of achieving defined goals (Source: Russell, S., & Norvig, P., 'Artificial Intelligence: A Modern Approach', 4th Ed., Pearson, 2020).",
    },
    {
        term: "Machine Learning (ML)",
        def: "A subfield of AI concerned with the design of algorithms that improve computationally through experience and generalizing from data architectures, rather than through explicit programming (Source: Mitchell, T., 'Machine Learning', McGraw-Hill, 1997 / Goodfellow, I., et al., 'Deep Learning', MIT Press, 2016).",
    },
    {
        term: "Large Language Models (LLMs)",
        def: "Extremely scaled neural networks trained via self-supervised learning on massive corpora of text. They predict sequences to generate and analyze complex natural language (Source: Zhao, W. X., et al., 'A Survey of Large Language Models', Computation and Language, arXiv, 2023).",
    },
    {
        term: "Neural Network",
        def: "Computational systems comprised of interconnected nodes (neurons) organized in layered topologies which calculate complex non-linear classification and generation problems (Source: Goodfellow, I., Bengio, Y., & Courville, A., 'Deep Learning', MIT Press, 2016).",
    },
    {
        term: "Natural Language Processing (NLP)",
        def: "The integration of computational linguistics and artificial intelligence enabling machines to decipher, understand, and generate human language in context (Source: Jurafsky, D., & Martin, J. H., 'Speech and Language Processing', 3rd Ed., Pearson, 2024).",
    },
    {
        term: "Hallucination",
        def: "An anomaly wherein AI generates a response conveying false or misleading information persistently presented as factual logic or truth, rather than generating a factual response grounded in context (Source: Ji, Z., et al., 'Survey of Hallucination in Natural Language Generation', ACM Computing Surveys, 2023).",
    },
    {
        term: "Intelligent Agent / Agentic AI",
        def: "Autonomous entities proactively perceiving environments and making iterative decisions securely over extended durations to achieve complex objectives by employing continuous learning (Source: Russell, S., & Norvig, P., 'Artificial Intelligence: A Modern Approach', 2020 / Wooldridge, M., 'An Introduction to MultiAgent Systems', 2009).",
    },
];

const principles = [
    { icon: "🔍", title: "Transparency", desc: "Understanding what AI can and cannot do—and why—is the first step toward responsible adoption." },
    { icon: "⚖️", title: "Ethics & Fairness", desc: "AI systems must be designed and deployed without perpetuating bias or causing harm to individuals or groups." },
    { icon: "🔒", title: "Data Privacy", desc: "Feeding sensitive data into public AI tools carries risks. Know what data governance rules apply to your organization." },
    { icon: "🎯", title: "Human Oversight", desc: "AI augments human decision-making—it does not replace it. Keeping humans in the loop is essential, especially for high-stakes decisions." },
];

export default function AIFoundations() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>›</span>
                        <span>AI Foundations</span>
                    </div>
                    <div className="page-header-label">Knowledge Base</div>
                    <h1>AI Foundations</h1>
                    <p>
                        Everything you need to understand Artificial Intelligence—explained clearly,
                        without technical jargon, for business leaders and decision-makers.
                    </p>
                </div>
            </div>

            {/* 1. Why AI Matters (Intro) */}
            <section className="section">
                <div className="container">
                    <div className="grid-2" style={{ gap: "4rem", alignItems: "center" }}>
                        <div>
                            <span className="section-label">Why AI Matters</span>
                            <h2 className="section-title">The Business Case for Understanding AI</h2>
                            <p style={{ color: "var(--hsg-muted)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                                AI is reshaping industries at a pace unseen since the advent of the internet. For business leaders,
                                understanding AI is no longer optional — it's a competitive necessity. You don't need to code;
                                you need to know enough to lead.
                            </p>
                            <p style={{ color: "var(--hsg-muted)", lineHeight: 1.75 }}>
                                This section gives you a solid conceptual foundation: what AI is, how it works at a high level,
                                where it excels, and where it falls short — so you can make informed decisions.
                            </p>
                        </div>
                        <div style={{ background: "var(--hsg-green-pale)", borderRadius: "var(--radius-lg)", padding: "2.5rem" }}>
                            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📊</div>
                            <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", marginBottom: "1rem" }}>AI Adoption in Business</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {[
                                    { label: "Organizations adopting AI in at least one function", value: "88%", width: "88%" },
                                    { label: "Organizations regularly using generative AI", value: "71%", width: "71%" },
                                    { label: "Organizations experimenting with AI agents", value: "62%", width: "62%" },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                                            <span style={{ fontSize: "0.8rem", color: "var(--hsg-muted)" }}>{stat.label}</span>
                                            <span style={{ fontWeight: 700, color: "var(--hsg-green)", fontSize: "0.9rem" }}>{stat.value}</span>
                                        </div>
                                        <div style={{ height: 6, background: "var(--hsg-beige)", borderRadius: 3 }}>
                                            <div style={{ height: "100%", width: stat.width, background: "var(--hsg-green)", borderRadius: 3 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "var(--hsg-muted)", textAlign: "right" }}>
                                Source: <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="noopener noreferrer" style={{ color: "var(--hsg-green)", textDecoration: "underline" }}>McKinsey Global Survey on AI (2025)</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Principles for Responsible AI Use */}
            <section className="section">
                <div className="container">
                    <span className="section-label">Responsible AI</span>
                    <h2 className="section-title" style={{ marginBottom: "3rem" }}>Principles for Responsible AI Use</h2>
                    <div className="grid-4">
                        {principles.map((p) => (
                            <div key={p.title} className="feature-card">
                                <div className="feature-icon">{p.icon}</div>
                                <h3 className="feature-title">{p.title}</h3>
                                <p className="feature-text">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Featured Publications (Research Showcase) */}
            <section className="section" style={{ background: "var(--hsg-green-pale)" }}>
                <div className="container">
                    <span className="section-label">Our Research</span>
                    <h2 className="section-title" style={{ marginBottom: "3rem" }}>Featured Publications</h2>
                    <div className="grid-2">
                        <div className="feature-card" style={{ background: "white", display: "flex", flexDirection: "column", height: "100%" }}>
                            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "var(--hsg-dark)" }}>
                                The Non-Human Enterprise: How AI Agents Reshape Organizations
                            </h3>
                            <p style={{ color: "var(--hsg-muted)", marginBottom: "2rem", flexGrow: 1 }}>
                                The rise of the agentic enterprise marks a profound transformation in the way organizations operate in an AI-driven world. Discover how AI agents are reshaping modern enterprises.
                            </p>
                            <div>
                                <a href="https://cmr.berkeley.edu/2025/10/the-non-human-enterprise-how-ai-agents-reshape-organizations/" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "var(--hsg-green-light)", color: "white", padding: "0.75rem 1.5rem", borderRadius: "4px", display: "inline-block", fontSize: "0.9rem", fontWeight: 600 }}>
                                    Read Article →
                                </a>
                            </div>
                        </div>
                        <div className="feature-card" style={{ background: "white", display: "flex", flexDirection: "column", height: "100%" }}>
                            <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "var(--hsg-dark)" }}>
                                Innovation: Die sieben Dimensionen für einen nachhaltigen Unternehmenserfolg
                            </h3>
                            <p style={{ color: "var(--hsg-muted)", marginBottom: "2rem", flexGrow: 1 }}>
                                Innovationen bescheren Unternehmen Aufstieg und sichern ihre Zukunft. Wie aber lässt sich die Entstehung des Neuen am besten fördern? Oliver Gassmann, Professor in St. Gallen, kennt die Antwort.
                            </p>
                            <div>
                                <a href="https://www.manager-magazin.de/hbm/innovation-die-sieben-dimensionen-fuer-einen-nachhaltigen-unternehmenserfolg-a-c9e22504-4c8d-4231-aeff-68c3ef726c55" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "var(--hsg-green-light)", color: "white", padding: "0.75rem 1.5rem", borderRadius: "4px", display: "inline-block", fontSize: "0.9rem", fontWeight: 600 }}>
                                    Read Article →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. AI Glossary */}
            <section className="section section--alt" id="glossar">
                <div className="container">
                    <span className="section-label">AI Glossary</span>
                    <h2 className="section-title" style={{ marginBottom: "3rem" }}>Key Concepts, Simply Explained</h2>
                    <div className="grid-2">
                        {concepts.map((c) => (
                            <div key={c.term} className="content-card">
                                <h3 style={{ color: "var(--hsg-green)", marginBottom: "0.5rem", fontSize: "1rem" }}>{c.term}</h3>
                                <p style={{ lineHeight: 1.6 }}>{c.def}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
