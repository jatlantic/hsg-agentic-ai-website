import Link from "next/link";

const testimonials = [
    {
        quote: "Insightful days making Agentic AI and its potential tangible.",
        name: "Alonso Quilez",
    },
    {
        quote: "Understanding the AI impact from a macro perspective, while learning the basics of the technology.",
        name: "Matthias Dietschweiler",
    },
    {
        quote: "Solid base-layer in which you can build the future!",
        name: "Michel Steger",
    },
    {
        quote: "After two days of deep learning and rich exchange on Agentic AI, I'm heading home with my understanding expanded and my confusion elevated to a far more sophisticated level.",
        name: "Philippe Funda",
    },
    {
        quote: "A timely and highly practical investment in the next wave of digital transformation. The program cut through AI hype and focused on what really matters for leaders: where AI agents create measurable value, how to assess ROI, and how to integrate them safely into real organizational workflows.",
        name: "Soha Zogg",
    },
];

const futureCohorts = [
    { term: "March 2027", note: "2. – 3. March 2027" },
    { term: "June 2027", note: "24. – 25. June 2027" },
];

export default function ExecutiveCourses() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span>›</span>
                        <span>Executive Courses</span>
                    </div>
                    <div className="page-header-label">Professional Education</div>
                    <h1>Executive Courses</h1>
                    <p>
                        Equip your leadership team with the strategic frameworks required to navigate and continuously integrate the next frontier of artificial intelligence.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="grid-2" style={{ gap: "4rem", alignItems: "center" }}>
                        <div>
                            <span className="section-label">Upcoming Course</span>
                            <h2 className="section-title">The AI Agent Workforce</h2>
                            <h3 style={{ fontSize: "1.5rem", color: "var(--hsg-green)", marginBottom: "1.25rem", fontWeight: 700 }}>How to Automatize Organizational Workflows</h3>
                            <p style={{ color: "var(--hsg-muted)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                                Move beyond the hype of generative AI and prepare for the next frontier: systems that act. <b>The AI Agent Workforce</b> equips executives to orchestrate autonomous AI agents that independently plan and execute complex organizational workflows.
                            </p>
                            <p style={{ color: "var(--hsg-muted)", lineHeight: 1.75, marginBottom: "2rem" }}>
                                Focusing on governance, architecture, and ROI rather than code, this course provides the framework to integrate digital agents into your organization, fostering seamless human-AI collaboration that drives tangible business value.
                            </p>

                            <div className="btn-group">
                                <Link href="/kontakt?topic=Course Registration" className="btn btn-primary">
                                    Register
                                </Link>
                                <a href="/HSG_Factsheet_Agentic_Enterprise_Nov2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                    Download Factsheet
                                </a>
                                <a href="/HSG_Agentic_Enterprise_Syllabus_Nov2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                    Download Syllabus
                                </a>
                            </div>
                        </div>

                        <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--hsg-border)", padding: "2.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                            <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", marginBottom: "1.5rem", borderBottom: "1px solid var(--hsg-border)", paddingBottom: "1rem" }}>Course Details</h3>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                                    <div style={{ background: "var(--hsg-green-pale)", color: "var(--hsg-green)", width: "2.5rem", height: "2.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        📅
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--hsg-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Date</div>
                                        <div style={{ fontWeight: 600, color: "var(--hsg-dark)" }}>12. and 13th November 2026</div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                                    <div style={{ background: "var(--hsg-green-pale)", color: "var(--hsg-green)", width: "2.5rem", height: "2.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        📍
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--hsg-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Location</div>
                                        <div style={{ fontWeight: 600, color: "var(--hsg-dark)" }}>St. Gallen, Switzerland</div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--hsg-muted)", marginTop: "0.25rem" }}>HSG Executive Campus</div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                                    <div style={{ background: "var(--hsg-green-pale)", color: "var(--hsg-green)", width: "2.5rem", height: "2.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        🌐
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--hsg-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Language</div>
                                        <div style={{ fontWeight: 600, color: "var(--hsg-dark)" }}>English</div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                                    <div style={{ background: "var(--hsg-green-pale)", color: "var(--hsg-green)", width: "2.5rem", height: "2.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        👥
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--hsg-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Target Audience</div>
                                        <div style={{ fontWeight: 600, color: "var(--hsg-dark)" }}>C-Level Executives & Board Members</div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                                    <div style={{ background: "var(--hsg-green-pale)", color: "var(--hsg-green)", width: "2.5rem", height: "2.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        💰
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--hsg-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Price</div>
                                        <div style={{ fontWeight: 600, color: "var(--hsg-dark)" }}>CHF 1900</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: "var(--hsg-beige-lighter)" }}>
                <div className="container">
                    <span className="section-label">Future Cohorts</span>
                    <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>More Dates in 2027</h2>
                    <p style={{ color: "var(--hsg-muted)", maxWidth: "640px", marginBottom: "2.5rem", lineHeight: 1.75 }}>
                        Prefer a later start? <b>The AI Agent Workforce</b> returns twice in 2027. Register your interest and we&rsquo;ll confirm the exact dates and reserve your seat.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", maxWidth: "820px" }}>
                        {futureCohorts.map((c) => (
                            <div
                                key={c.term}
                                style={{
                                    background: "white",
                                    border: "1px solid var(--hsg-border)",
                                    borderRadius: "var(--radius-lg)",
                                    padding: "2rem",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                                    <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", fontSize: "1.15rem", margin: 0 }}>{c.term}</h3>
                                    <span style={{ background: "var(--hsg-green-pale)", color: "var(--hsg-green)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", padding: "0.2rem 0.65rem", borderRadius: "20px" }}>Registration Open</span>
                                </div>
                                <div style={{ color: "var(--hsg-green)", fontWeight: 600, marginBottom: "0.75rem" }}>The AI Agent Workforce</div>
                                <div style={{ color: "var(--hsg-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>📅 {c.note} &nbsp;·&nbsp; 📍 St. Gallen, Switzerland &nbsp;·&nbsp; CHF 1900</div>
                                <Link href="/kontakt?topic=Course Registration" className="btn btn-outline">
                                    Register Interest
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <span className="section-label">What Participants Say</span>
                    <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>Voices from the First Cohort</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                        {testimonials.map((t) => (
                            <figure
                                key={t.name}
                                style={{
                                    background: "white",
                                    border: "1px solid var(--hsg-border)",
                                    borderRadius: "var(--radius-lg)",
                                    padding: "2rem",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: "3rem", lineHeight: 0.6, color: "var(--hsg-green)", marginBottom: "1rem" }}>
                                    &ldquo;
                                </div>
                                <blockquote style={{ margin: 0, color: "var(--hsg-dark)", lineHeight: 1.7, fontSize: "1rem", flexGrow: 1 }}>
                                    {t.quote}
                                </blockquote>
                                <figcaption style={{ marginTop: "1.5rem" }}>
                                    <div style={{ fontWeight: 700, color: "var(--hsg-green)" }}>{t.name}</div>
                                    <div style={{ fontSize: "0.85rem", color: "var(--hsg-muted)", marginTop: "0.15rem" }}>June 2026 cohort</div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: "var(--hsg-beige-lighter)" }}>
                <div className="container">
                    <span className="section-label">Past Courses</span>
                    <h2 className="section-title" style={{ marginBottom: "2rem" }}>Previous Cohorts</h2>

                    <div style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--hsg-border)", padding: "2rem", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", maxWidth: "640px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                            <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", fontSize: "1.15rem", margin: 0 }}>The AI Agent Workforce</h3>
                            <span style={{ background: "var(--hsg-green-pale)", color: "var(--hsg-green)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", padding: "0.2rem 0.65rem", borderRadius: "20px" }}>Completed</span>
                        </div>
                        <div style={{ color: "var(--hsg-green)", fontWeight: 600, marginBottom: "0.75rem" }}>How to Automatize Organizational Workflows</div>
                        <div style={{ color: "var(--hsg-muted)", marginBottom: "1.25rem" }}>📅 8. and 9th June 2026 &nbsp;·&nbsp; 📍 St. Gallen, Switzerland</div>
                        <p style={{ color: "var(--hsg-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                            Our first executive cohort — two days turning agentic AI from concept into concrete organizational workflows.
                        </p>
                        <a href="/HSG_Agentic_Enterprise_Syllabus.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                            Download Syllabus
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
