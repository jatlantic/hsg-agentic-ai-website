import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────────
   Academic Use Cases — The Agentic Enterprise
   All citations are inline and sourced from peer-reviewed journals and
   leading management publications.
────────────────────────────────────────────────────────────────────────── */

type Citation = {
    label: string;
    journal: string;
    detail: string;
    href?: string;
};

type UseSection = {
    id: string;
    icon: string;
    category: string;
    color: string;
    headline: string;
    intro: string;
    cases: { title: string; desc: string }[];
    citations: Citation[];
};

const sections: UseSection[] = [
    {
        id: "sales-crm",
        icon: "🎯",
        category: "Sales, Marketing & Customer Lifecycle",
        color: "#00802f",
        headline: "Autonomous Agents That Own the Entire Customer Lifecycle",
        intro:
            "Agentic AI is moving customer interaction away from static, rules-based chatbots to autonomous digital representatives capable of managing the entire lifecycle — from initial lead generation to complex dispute resolution.",
        cases: [
            {
                title: "Autonomous Lead Orchestration & Deal Nurturing",
                desc: "AI agents independently research prospects, qualify leads, and engage in personalized outreach. They dynamically adapt their communication strategies based on real-time prospect behavior and autonomously update the CRM without human input.",
            },
            {
                title: "End-to-End Customer Resolution",
                desc: "Rather than pointing a customer to a knowledge base, agentic systems can verify identity, investigate a shipping delay in the logistics system, negotiate a partial refund, and execute the transaction via payment gateways — without human intervention.",
            },
            {
                title: "Dynamic Pricing & Market Alignment",
                desc: "Agents continuously monitor competitor pricing, external market signals, and inventory levels to autonomously adjust pricing and promotional strategies in real time across all sales channels.",
            },
        ],
        citations: [
            {
                label: "Journal of Business Research (Elsevier, 2026)",
                journal: "Elsevier",
                detail:
                    "Gonzalez, Habel & Hunter — AI agents, agentic AI, and the future of sales. Research highlights that autonomous AI agents are moving beyond augmentation to independently execute multi-step processes such as lead generation, qualification, and sales performance management.",
                href: "https://www.sciencedirect.com/journal/journal-of-business-research",
            },
            {
                label: "Harvard Business Review",
                journal: "HBR",
                detail:
                    "How Successful Sales Teams Are Embracing Agentic AI. Notes that agentic AI is revolutionizing sales by deploying autonomous personal agents that anticipate next steps, adapt to market changes, and continuously learn to close deals across channels.",
                href: "https://hbr.org",
            },
            {
                label: "Michigan Journal of Economics (2025)",
                journal: "Michigan Journal of Economics",
                detail:
                    "Agentic AI in Customer Relationship Management. Details how LLMs are shifting from search tools to specialized autonomous agents that provide the backbone for CRM orchestration, significantly reducing labor costs in retail and tech sectors.",
            },
        ],
    },
    {
        id: "finance",
        icon: "💳",
        category: "Financial Services & Enterprise Accounting",
        color: "#73a5af",
        headline: "Replacing Rigid RPA with Reasoning-Capable Financial Agents",
        intro:
            "In finance, rigid Robotic Process Automation (RPA) is being replaced by Agentic AI. Because agents can reason through unstructured data, they are being deployed for high-stakes financial workflows that previously required human judgment.",
        cases: [
            {
                title: "Autonomous Fraud Detection & Remediation",
                desc: "AI agents continuously monitor financial transactions. When a suspicious pattern emerges, the agent doesn't merely flag it — it proactively freezes the affected account, drafts a suspicious activity report, and alerts compliance officers.",
            },
            {
                title: "Intelligent Loan Approvals & Risk Assessment",
                desc: "By analyzing vast amounts of documentation — credit history, real-time market trends, and risk models — without fatigue, agents autonomously process and approve standard loans while queueing edge-cases for human underwriters.",
            },
            {
                title: "Continuous Reconciliation",
                desc: "Agents navigate fragmented ERP and banking systems to autonomously cross-reference invoices, match complex global transactions, and standardize entries for the month-end close.",
            },
        ],
        citations: [
            {
                label: "MIT Sloan Management Review",
                journal: "MIT Sloan",
                detail:
                    "Horton & Shahidi — Agentic AI, Explained. Details how institutions like JPMorgan Chase are exploring AI agents to detect fraud, provide customized financial advice, and automate loan approvals, highlighting their ability to execute high-stakes transactions at near-zero marginal cost.",
                href: "https://sloanreview.mit.edu",
            },
            {
                label: "Deloitte Insights (2025)",
                journal: "Deloitte",
                detail:
                    "Agentic Enterprise 2028. Forecasts that by 2028, agentic assistants will transition into autonomous partners capable of strategic, real-time adaptive planning in ambiguous financial situations, orchestrating complex multi-step workflows.",
                href: "https://www2.deloitte.com/insights",
            },
        ],
    },
    {
        id: "supply-chain",
        icon: "🔗",
        category: "Supply Chain Logistics & Core Operations",
        color: "#eb6969",
        headline: "Self-Healing Supply Chains Through Multi-Agent Coordination",
        intro:
            "Agentic systems excel in dynamic operational environments. By orchestrating multiple specialized agents (Multi-Agent Systems), enterprises can achieve resilient, self-healing supply chains that proactively adapt to disruption.",
        cases: [
            {
                title: "Autonomous Rerouting & Logistics Management",
                desc: "Logistics agents monitor global shipping data, port congestion, and weather patterns. Upon detecting a delay, the agent autonomously calculates alternative routes, negotiates shipping rates via APIs, and updates delivery schedules enterprise-wide.",
            },
            {
                title: "Predictive Maintenance Execution",
                desc: "Instead of merely predicting equipment failure, an agentic system autonomously orders the necessary replacement parts, schedules a technician based on workforce availability, and adjusts production schedules to minimize downtime.",
            },
        ],
        citations: [
            {
                label: "ResearchGate / Well Testing Journal (2025)",
                journal: "ResearchGate",
                detail:
                    "Sakthivel — Agentic AI In the Enterprise: How Autonomous AI Systems Will Reshape Business Strategy. Highlights how agentic AI optimizes supply chains through predictive maintenance, moving beyond analytics to proactive, autonomous execution.",
                href: "https://www.researchgate.net",
            },
            {
                label: "Harvard Business Review",
                journal: "HBR",
                detail:
                    "Designing a Successful Agentic AI System. Emphasizes the necessity of designing workflows around outcomes and unlocking data silos so that AI agents can coordinate seamlessly across operations and logistics departments.",
                href: "https://hbr.org",
            },
        ],
    },
    {
        id: "workforce",
        icon: "🏛️",
        category: "Workforce Strategy & Executive Leadership",
        color: "#0a5f2d",
        headline: "AI as Digital Talent: A New Category in the Org Chart",
        intro:
            "The most profound shift is viewing AI not as software, but as a new category of digital talent. Agentic AI is actively being integrated into management frameworks to support strategic execution and workforce planning.",
        cases: [
            {
                title: "Strategic OKR Alignment",
                desc: "Leaders use agentic AI to synthesize complex market intelligence, dynamically adjust Objectives and Key Results (OKRs), and ensure daily operational activities remain aligned with shifting strategic goals — all updated continuously rather than quarterly.",
            },
            {
                title: "Hybrid Workforce Integration",
                desc: "HR departments are deploying agents to manage the administrative burden of onboarding, while simultaneously building frameworks to manage hybrid teams comprised of both human workers and autonomous digital teammates.",
            },
        ],
        citations: [
            {
                label: "Harvard Business Review",
                journal: "HBR",
                detail:
                    "Agentic AI Is Already Changing the Workforce. Argues that AI agents are becoming 'digital teammates' and an emerging category of talent, requiring companies to develop operational playbooks for integrating them into hybrid teams.",
                href: "https://hbr.org",
            },
            {
                label: "Harvard Business Review",
                journal: "HBR",
                detail:
                    "Generative and Agentic AI as Strategic Partners for Leaders. Explores how executives use agentic AI to synthesize complex information, support dynamic OKR development, and maintain alignment between strategic goals and daily execution.",
                href: "https://hbr.org",
            },
        ],
    },
];

const categoryDotColor: Record<string, string> = {
    "Sales, Marketing & Customer Lifecycle": "#00802f",
    "Financial Services & Enterprise Accounting": "#73a5af",
    "Supply Chain Logistics & Core Operations": "#eb6969",
    "Workforce Strategy & Executive Leadership": "#0a5f2d",
};

export default function Anwendungen() {
    return (
        <>
            {/* ── Page Header ── */}
            <div className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>›</span>
                        <span>AI Applications</span>
                    </div>
                    <div className="page-header-label">Agentic Enterprise Research</div>
                    <h1>Proven Use Cases & Research</h1>
                    <p style={{ maxWidth: 680 }}>
                        While traditional Generative AI acts as a passive assistant, <strong>Agentic AI</strong> represents
                        a paradigm shift toward autonomy — perceiving environments, breaking complex goals into sub-tasks,
                        and executing multi-step workflows across enterprise software with minimal human intervention.
                    </p>
                </div>
            </div>

            {/* ── Category Navigation ── */}
            <div style={{ background: "white", borderBottom: "1px solid var(--hsg-border)", position: "sticky", top: 72, zIndex: 50 }}>
                <div className="container">
                    <div style={{ display: "flex", gap: "0.25rem", overflowX: "auto", padding: "0.75rem 0" }}>
                        {sections.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className="usecase-nav-pill"
                            >
                                <span>{s.icon}</span>
                                <span>{s.category}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Sections ── */}
            {sections.map((section, idx) => (
                <section
                    key={section.id}
                    id={section.id}
                    className={`section${idx % 2 === 1 ? " section--alt" : ""}`}
                >
                    <div className="container">
                        {/* Section Header */}
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: "var(--radius-md)",
                                background: section.color + "18",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "1.75rem", flexShrink: 0,
                            }}>
                                {section.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <span style={{
                                    fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                                    letterSpacing: "0.12em", color: section.color, display: "block", marginBottom: "0.5rem"
                                }}>
                                    {section.category}
                                </span>
                                <h2 style={{
                                    fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                                    fontWeight: 900, color: "var(--hsg-dark)", lineHeight: 1.15, marginBottom: "1rem"
                                }}>
                                    {section.headline}
                                </h2>
                                <p style={{ color: "var(--hsg-muted)", lineHeight: 1.75, maxWidth: 720, fontSize: "1rem" }}>
                                    {section.intro}
                                </p>
                            </div>
                        </div>

                        {/* Use Cases Grid */}
                        <div className="grid-3" style={{ marginBottom: "3rem" }}>
                            {section.cases.map((c, i) => (
                                <div key={i} style={{
                                    background: "white",
                                    border: "1px solid var(--hsg-border)",
                                    borderRadius: "var(--radius-lg)",
                                    padding: "2rem",
                                    borderTop: `3px solid ${section.color}`,
                                    boxShadow: "var(--shadow-sm)",
                                }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: "50%",
                                        background: section.color + "18",
                                        color: section.color,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "0.75rem", fontWeight: 900, marginBottom: "1rem",
                                    }}>
                                        {i + 1}
                                    </div>
                                    <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--hsg-dark)", marginBottom: "0.75rem", lineHeight: 1.4 }}>
                                        {c.title}
                                    </h3>
                                    <p style={{ fontSize: "0.875rem", color: "var(--hsg-muted)", lineHeight: 1.7 }}>
                                        {c.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Citations Block */}
                        <div style={{
                            background: "var(--hsg-green-ultra-pale)",
                            border: "1px solid var(--hsg-border)",
                            borderRadius: "var(--radius-md)",
                            padding: "1.75rem 2rem",
                        }}>
                            <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--hsg-green)", marginBottom: "1rem" }}>
                                📚 Academic & Journal Sources
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {section.citations.map((cit, i) => (
                                    <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                                        <div style={{
                                            width: 22, height: 22, borderRadius: "50%",
                                            background: "var(--hsg-green-pale)", color: "var(--hsg-green)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "0.65rem", fontWeight: 900, flexShrink: 0, marginTop: "0.1rem"
                                        }}>
                                            {i + 1}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--hsg-dark)", marginBottom: "0.25rem" }}>
                                                {cit.href ? (
                                                    <a href={cit.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--hsg-green)", textDecoration: "underline" }}>
                                                        {cit.label}
                                                    </a>
                                                ) : cit.label}
                                            </div>
                                            <div style={{ fontSize: "0.8rem", color: "var(--hsg-muted)", lineHeight: 1.6 }}>
                                                {cit.detail}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* ── CTA ── */}
            <div className="cta-banner">
                <div className="container">
                    <span className="section-label" style={{ color: "var(--hsg-green-bright)" }}>Ready to Act?</span>
                    <h2>Learn to Deploy Agentic AI in Your Organization</h2>
                    <p>Join our executive course on June 8–9, 2026, and build the operational playbook your enterprise needs.</p>
                    <Link href="/executive-courses" className="btn" id="usecases-exec-cta"
                        style={{ background: "var(--hsg-green-light)", color: "white", border: "2px solid var(--hsg-green-light)", padding: "1rem 2.5rem", borderRadius: "4px", fontWeight: 700 }}>
                        View Executive Course →
                    </Link>
                </div>
            </div>
        </>
    );
}
