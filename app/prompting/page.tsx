import Link from "next/link";

const techniques = [
    {
        icon: "🎯",
        title: "Be Specific and Precise",
        desc: "The more context and specifics you provide, the better the output. Instead of 'summarize this', say 'summarize this in 3 bullet points for a non-technical executive audience'.",
        example: "❌ Write an email.\n✅ Write a polite follow-up email to a potential client after a product demo, highlighting our new pricing model. Keep it under 150 words.",
    },
    {
        icon: "🎭",
        title: "Assign a Role",
        desc: "Tell the AI what persona to adopt. Role-playing activates domain-specific knowledge and writing styles embedded in the model's training.",
        example: "✅ 'You are an experienced CFO advising a mid-size manufacturing company on AI investment decisions. Respond to the following question...'",
    },
    {
        icon: "📋",
        title: "Provide Examples (Few-Shot)",
        desc: "Show the AI what you expect by giving 1–3 examples. This dramatically improves output quality and consistency for structured tasks.",
        example: "✅ Here are two examples of the analysis format I want: [Example 1...] [Example 2...]. Now apply the same format to: [your content].",
    },
    {
        icon: "🔄",
        title: "Iterate and Refine",
        desc: "Great prompting is a conversation. Start broad, then refine. Ask the AI to improve, expand, shorten, or adjust tone. Think of it as collaborative drafting.",
        example: "✅ 'Make this more formal.' / 'Add a section on risks.' / 'Shorten to 100 words.' / 'Translate to German.'",
    },
    {
        icon: "🧩",
        title: "Break Complex Tasks Apart",
        desc: "For complex objectives, break them into sequential subtasks. Ask the AI to plan first, then execute each step — this dramatically reduces errors.",
        example: "✅ 'First, outline the main sections for a competitive analysis report on [topic]. Then write each section one by one.'",
    },
    {
        icon: "📐",
        title: "Specify Output Format",
        desc: "Tell the AI exactly how you want the output structured — as a table, JSON, markdown, bullet points, numbered list, or prose.",
        example: "✅ 'Return results as a markdown table with columns: Company, Strengths, Weaknesses, Market Share.'",
    },
];

const templates = [
    {
        label: "Executive Summary",
        prompt: "You are a senior business analyst. Summarize the following document in exactly 5 bullet points, each 1-2 sentences, for an executive audience. Focus on implications and action items: [paste document]",
    },
    {
        label: "Meeting Preparation",
        prompt: "I have a meeting with [person/company] about [topic]. Given the context [describe situation], prepare: 1) Key talking points (max 5), 2) Three questions I should ask, 3) Potential objections and how to handle them.",
    },
    {
        label: "Email Draft",
        prompt: "Write a professional [type: request / follow-up / apology / introduction] email from [sender role] to [recipient role]. Context: [explain situation]. Tone: [formal / friendly / assertive]. Keep it under 200 words.",
    },
    {
        label: "SWOT Analysis",
        prompt: "Conduct a SWOT analysis for [company/product/decision] given the following context: [details]. Format as a clear table with bullet points. Be specific and avoid generic statements.",
    },
];

export default function Prompting() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>›</span>
                        <span>Prompting Guide</span>
                    </div>
                    <div className="page-header-label">Practical Guide</div>
                    <h1>Mastering Prompting</h1>
                    <p>
                        Learn to write prompts that unlock the full potential of ChatGPT, Claude, Gemini,
                        and other AI systems. Practical techniques for real business results.
                    </p>
                </div>
            </div>

            {/* Intro */}
            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                        <span className="section-label">What is Prompting?</span>
                        <h2 className="section-title">The Interface Between Human and AI</h2>
                        <p style={{ color: "var(--hsg-muted)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "2rem" }}>
                            A prompt is the instruction you give to an AI system. The quality, structure, and specificity
                            of your prompts directly determine the quality of AI outputs. Prompting well is a skill —
                            and it can be learned quickly with the right frameworks.
                        </p>
                        <div style={{ display: "inline-flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
                            {[
                                { icon: "⏱️", label: "5 min average prompt improvement = 10× better output" },
                                { icon: "💡", label: "Used by 1B+ people monthly worldwide" },
                            ].map((s) => (
                                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--hsg-muted)" }}>
                                    <span>{s.icon}</span>
                                    <span>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Techniques */}
            <section className="section section--alt">
                <div className="container">
                    <span className="section-label">Core Techniques</span>
                    <h2 className="section-title" style={{ marginBottom: "3rem" }}>6 Prompting Techniques<br />Every Professional Should Know</h2>
                    <div className="grid-2" style={{ gap: "1.5rem" }}>
                        {techniques.map((t) => (
                            <div key={t.title} className="feature-card" style={{ padding: "2rem" }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                                    <div className="feature-icon" style={{ flexShrink: 0, width: 44, height: 44, fontSize: "1.25rem" }}>{t.icon}</div>
                                    <h3 className="feature-title" style={{ margin: 0 }}>{t.title}</h3>
                                </div>
                                <p className="feature-text">{t.desc}</p>
                                <div style={{
                                    background: "var(--hsg-green-ultra-pale)",
                                    border: "1px solid var(--hsg-green-pale)",
                                    borderLeft: "3px solid var(--hsg-green)",
                                    borderRadius: "4px",
                                    padding: "0.875rem 1rem",
                                    fontFamily: "monospace",
                                    fontSize: "0.8rem",
                                    color: "var(--hsg-text)",
                                    lineHeight: 1.5,
                                    whiteSpace: "pre-wrap",
                                }}>
                                    {t.example}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Templates */}
            <section className="section">
                <div className="container">
                    <span className="section-label">Ready-to-Use Templates</span>
                    <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>Copy-Paste Prompt Templates</h2>
                    <p className="section-subtitle" style={{ marginBottom: "3rem" }}>
                        Adapt these templates to your context and start generating value immediately.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {templates.map((t) => (
                            <div key={t.label} style={{ background: "white", border: "1px solid var(--hsg-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                                <div style={{ padding: "1rem 1.5rem", background: "var(--hsg-green)", color: "white" }}>
                                    <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.label}</span>
                                </div>
                                <div style={{ padding: "1.5rem", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--hsg-text)", background: "var(--hsg-gray-bg)" }}>
                                    {t.prompt}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="cta-banner">
                <div className="container">
                    <h2>Practice in Our Free Workshops</h2>
                    <p>Join our hands-on prompting workshops and get feedback on your prompts from AI experts.</p>
                    <Link href="/kontakt" className="btn" id="prompting-workshop-btn"
                        style={{ background: "var(--hsg-green-light)", color: "white", border: "none", padding: "1rem 2.25rem", borderRadius: "4px", fontWeight: 700 }}>
                        Register Now →
                    </Link>
                </div>
            </div>
        </>
    );
}
