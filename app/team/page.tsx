import Link from "next/link";

type TeamMember = {
    image?: string;
    emoji?: string;
    name: string;
    role: string;
    bio: string;
    areas: string[];
    linkedin?: string;
};

const team: TeamMember[] = [
    {
        image: "https://integration.unisg.ch/handler/PortraitStreamer/byHsgEntityId/d115321c-0ff8-4c30-a7ec-31016b041b5d/byWidth/250/byHeight/325",
        name: "Prof. Dr. Oliver Gassmann",
        role: "Professor of Technology Management",
        bio: "Full Professor of Technology Management with a special focus on Innovation Management, ITEM-HSG.",
        areas: ["Technology Management", "Business Models", "Innovation"],
        linkedin: "https://ch.linkedin.com/in/olivergassmann",
    },
    {
        image: "https://tools.unisg.ch/handlers/Public/PortraitStreamer.ashx?HSGEntitiyId=a7d8f427-0119-4113-a833-db54b3e6ddcd",
        name: "Prof. Dr. Joakim Vincent",
        role: "Professor of Entrepreneurship",
        bio: "Full Professor of Entrepreneurship and Innovation, GCEI-HSG.",
        areas: ["Entrepreneurship", "Innovation"],
    },
    {
        emoji: "🚀",
        name: "Julius Schulte",
        role: "Academic Lead Agentic AI",
        bio: "Expert in building and scaling autonomous AI systems and agentic workflows for enterprise applications.",
        areas: ["Agentic AI", "LLMs", "Entrepreneurship"],
        linkedin: "https://ch.linkedin.com/in/julius-schulte-analytics",
    },
];

const advisors = [
    { name: "Prof. Dr. Feiyu Xu", org: "German University of Digital Sciences", area: "Industrial AI", link: "https://german-uds.de/team/feiyu-xu" },
];

export default function Team() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>›</span>
                        <span>Team</span>
                    </div>
                    <div className="page-header-label">Our People</div>
                    <h1>Meet the Team</h1>
                    <p>
                        Researchers, practitioners, and educators united by one mission: making AI
                        knowledge accessible and actionable for every business.
                    </p>
                </div>
            </div>

            {/* Mission statement */}
            <section className="section section--green">
                <div className="container" style={{ textAlign: "center" }}>
                    <span className="section-label">Our Mission</span>
                    <h2 className="section-title" style={{ maxWidth: 700, margin: "0 auto 1.25rem" }}>
                        Bridging Academic Research and Business Reality
                    </h2>
                    <p style={{ color: "var(--hsg-muted)", maxWidth: 650, margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.75 }}>
                        We believe that AI knowledge should not be locked behind technical barriers or expensive consultants.
                        Our team combines world-class research from the University of St.Gallen with deep hands-on business experience
                        to deliver practical, trustworthy, and free AI education.
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="section">
                <div className="container">
                    <span className="section-label">Core Team</span>
                    <h2 className="section-title" style={{ marginBottom: "3rem" }}>The People Behind the Platform</h2>
                    <div className="grid-3">
                        {team.map((member) => (
                            <div key={member.name} className="team-card">
                                <div className="team-avatar" style={{ overflow: "hidden", padding: member.image ? 0 : undefined, backgroundColor: member.image ? "#f5f5f5" : undefined }}>
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                    ) : (
                                        <span>{member.emoji}</span>
                                    )}
                                </div>
                                <div className="team-info">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                                        <div className="team-name" style={{ marginBottom: 0 }}>{member.name}</div>
                                        {member.linkedin && (
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#0077b5", fontSize: "1.25rem", lineHeight: 1 }}>
                                                in
                                            </a>
                                        )}
                                    </div>
                                    <div className="team-role">{member.role}</div>
                                    <p className="team-bio" style={{ marginBottom: "1rem" }}>{member.bio}</p>
                                    <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                                        {member.areas.map((a) => (
                                            <span key={a} style={{
                                                padding: "0.2rem 0.625rem",
                                                background: "var(--hsg-green-pale)",
                                                color: "var(--hsg-green)",
                                                borderRadius: "100px",
                                                fontSize: "0.72rem",
                                                fontWeight: 600,
                                            }}>
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advisory Board */}
            <section className="section section--alt">
                <div className="container">
                    <span className="section-label">Advisory Board</span>
                    <h2 className="section-title" style={{ marginBottom: "3rem" }}>Our Advisors</h2>
                    <div className="grid-3">
                        {advisors.map((a) => (
                            <div key={a.name} style={{
                                background: "white",
                                border: "1px solid var(--hsg-border)",
                                borderRadius: "var(--radius-md)",
                                padding: "2rem",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "1rem",
                            }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: "50%",
                                    background: "var(--hsg-green)",
                                    color: "white", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: "1.25rem", flexShrink: 0,
                                }}>⭐</div>
                                <div>
                                    {a.link ? (
                                        <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: "var(--hsg-dark)", marginBottom: "0.25rem", display: "block", textDecoration: "none" }}>{a.name}</a>
                                    ) : (
                                        <div style={{ fontWeight: 700, color: "var(--hsg-dark)", marginBottom: "0.25rem" }}>{a.name}</div>
                                    )}
                                    <div style={{ fontSize: "0.8rem", color: "var(--hsg-green-light)", fontWeight: 600, marginBottom: "0.25rem" }}>{a.org}</div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--hsg-muted)" }}>{a.area}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join CTA */}
            <div className="cta-banner">
                <div className="container">
                    <h2>Join Our Network</h2>
                    <p>Are you a researcher, practitioner, or business interested in collaborating? We'd love to hear from you.</p>
                    <Link href="/kontakt" className="btn" id="join-network-btn"
                        style={{ background: "var(--hsg-green-light)", color: "white", border: "none", padding: "1rem 2.25rem", borderRadius: "4px", fontWeight: 700 }}>
                        Get in Touch →
                    </Link>
                </div>
            </div>
        </>
    );
}
