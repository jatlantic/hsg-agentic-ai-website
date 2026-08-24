"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const contactOptions = [
    { icon: "🎓", title: "Course Registration", desc: "Register for an upcoming executive course" },
    { icon: "🏢", title: "Workshop Enquiry", desc: "Organize an AI workshop for your team or company" },
    { icon: "🤝", title: "Partnership & Sponsorship", desc: "Become a part of the Agentic AI Platform ecosystem" },
    { icon: "📚", title: "Content Contribution", desc: "Share your AI use case or expertise" },
    { icon: "🔬", title: "Research Collaboration", desc: "Academic or industry research partnership" },
];

function ContactFormContent() {
    const searchParams = useSearchParams();
    const topicParam = searchParams?.get("topic");
    const initialTopic = topicParam || "Workshop Enquiry";
    const topicLocked = !!topicParam;

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        company: "",
        email: "",
        topic: initialTopic,
        message: ""
    });

    useEffect(() => {
        if (topicParam) {
            setForm(prev => ({ ...prev, topic: topicParam }));
        }
    }, [topicParam]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            console.warn("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is missing. Simulating success.");
            setTimeout(() => {
                setSubmitted(true);
                setLoading(false);
            }, 800);
            return;
        }

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: `New Request: ${form.topic} from ${form.name}`,
                    from_name: "Agentic AI Platform",
                    ...form
                }),
            });
            const result = await res.json();
            if (result.success) {
                setSubmitted(true);
            } else {
                alert("Something went wrong. Please try again or email us directly at julius.schulte@unisg.ch.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting the form. Please email us directly.");
        } finally {
            setLoading(false);
        }
    };

    if (topicLocked) {
        return (
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
                {submitted ? (
                    <div style={{
                        background: "var(--hsg-green-pale)",
                        border: "1px solid var(--hsg-green-light)",
                        borderRadius: "var(--radius-lg)",
                        padding: "3rem",
                        textAlign: "center",
                    }}>
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                        <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", marginBottom: "0.75rem" }}>Message Sent!</h3>
                        <p style={{ color: "var(--hsg-muted)", lineHeight: 1.7 }}>
                            Thank you for reaching out. We'll get back to you within 1–2 business days.
                        </p>
                        <button onClick={() => setSubmitted(false)} className="btn" style={{ marginTop: "1.5rem", background: "transparent", border: "1px solid var(--hsg-green)", color: "var(--hsg-green)", padding: "0.5rem 1rem", borderRadius: "4px" }}>
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{
                        background: "white",
                        border: "1px solid var(--hsg-border)",
                        borderRadius: "var(--radius-lg)",
                        padding: "2.5rem",
                        boxShadow: "var(--shadow-md)",
                    }}>
                        <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", marginBottom: "2rem", fontSize: "1.25rem" }}>
                            Register for The AI Agent Workforce
                        </h3>

                        <div className="grid-2" style={{ gap: "1rem", marginBottom: "0" }}>
                            <div className="form-group">
                                <label htmlFor="contact-name">Full Name *</label>
                                <input id="contact-name" type="text" required placeholder="Your full name" value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-company">Company</label>
                                <input id="contact-company" type="text" placeholder="Your organization" value={form.company} onChange={(e) => setForm(prev => ({ ...prev, company: e.target.value }))} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-email">Email Address *</label>
                            <input id="contact-email" type="email" required placeholder="you@company.com" value={form.email} onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-message">Message</label>
                            <textarea id="contact-message" placeholder="Any questions or additional information..." value={form.message} onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))} />
                        </div>

                        <button type="submit" className="btn btn-primary" id="contact-submit-btn" disabled={loading}
                            style={{ width: "100%", justifyContent: "center", padding: "1rem", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
                            {loading ? "Sending..." : "Send Message →"}
                        </button>

                        <p style={{ fontSize: "0.75rem", color: "var(--hsg-muted)", marginTop: "1rem", textAlign: "center" }}>
                            By submitting, you agree to our privacy policy. We respond within 1–2 business days.
                        </p>
                    </form>
                )}
            </div>
        );
    }

    return (
        <div className="grid-2" style={{ gap: "4rem", alignItems: "flex-start" }}>
            {/* Left: Options + Info */}
            <div>
                <span className="section-label">How Can We Help?</span>
                <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "2rem" }}>Choose Your Topic</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
                    {contactOptions.map((opt) => (
                        <div
                            key={opt.title}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "1rem",
                                padding: "1.25rem",
                                background: form.topic === opt.title ? "var(--hsg-beige)" : "var(--hsg-beige-lighter)",
                                borderRadius: "var(--radius-md)",
                                border: form.topic === opt.title ? "1px solid var(--hsg-green)" : "1px solid var(--hsg-border)",
                                cursor: "pointer",
                                transition: "all 0.25s",
                            }}
                            onClick={() => setForm(prev => ({ ...prev, topic: opt.title }))}
                        >
                            <span style={{ fontSize: "1.5rem" }}>{opt.icon}</span>
                            <div>
                                <div style={{ fontWeight: 700, color: "var(--hsg-dark)", fontSize: "0.95rem" }}>{opt.title}</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--hsg-muted)", marginTop: "0.2rem" }}>{opt.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                        <div style={{ width: 44, height: 44, background: "var(--hsg-green)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.1rem", flexShrink: 0 }}>📍</div>
                        <div>
                            <div style={{ fontWeight: 700, color: "var(--hsg-dark)", fontSize: "0.9rem" }}>Location</div>
                            <div style={{ color: "var(--hsg-muted)", fontSize: "0.85rem" }}>ITEM-HSG · Institute of Technology Management<br />Dufourstrasse 40a<br />CH-9000 St.Gallen</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                        <div style={{ width: 44, height: 44, background: "var(--hsg-green)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.1rem", flexShrink: 0 }}>✉️</div>
                        <div>
                            <div style={{ fontWeight: 700, color: "var(--hsg-dark)", fontSize: "0.9rem" }}>Email</div>
                            <div style={{ color: "var(--hsg-muted)", fontSize: "0.85rem" }}>julius.schulte@unisg.ch</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div>
                {submitted ? (
                    <div style={{
                        background: "var(--hsg-green-pale)",
                        border: "1px solid var(--hsg-green-light)",
                        borderRadius: "var(--radius-lg)",
                        padding: "3rem",
                        textAlign: "center",
                    }}>
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                        <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", marginBottom: "0.75rem" }}>Message Sent!</h3>
                        <p style={{ color: "var(--hsg-muted)", lineHeight: 1.7 }}>
                            Thank you for reaching out. We'll get back to you within 1–2 business days.
                        </p>
                        <button onClick={() => setSubmitted(false)} className="btn" style={{ marginTop: "1.5rem", background: "transparent", border: "1px solid var(--hsg-green)", color: "var(--hsg-green)", padding: "0.5rem 1rem", borderRadius: "4px" }}>
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{
                        background: "white",
                        border: "1px solid var(--hsg-border)",
                        borderRadius: "var(--radius-lg)",
                        padding: "2.5rem",
                        boxShadow: "var(--shadow-md)",
                    }}>
                        <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", marginBottom: "2rem", fontSize: "1.25rem" }}>
                            Send Us a Message
                        </h3>

                        <div className="grid-2" style={{ gap: "1rem", marginBottom: "0" }}>
                            <div className="form-group">
                                <label htmlFor="contact-name">Full Name *</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    required
                                    placeholder="Your full name"
                                    value={form.name}
                                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-company">Company</label>
                                <input
                                    id="contact-company"
                                    type="text"
                                    placeholder="Your organization"
                                    value={form.company}
                                    onChange={(e) => setForm(prev => ({ ...prev, company: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-email">Email Address *</label>
                            <input
                                id="contact-email"
                                type="email"
                                required
                                placeholder="you@company.com"
                                value={form.email}
                                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-topic">Topic *</label>
                            <select
                                id="contact-topic"
                                required
                                value={form.topic}
                                onChange={(e) => setForm(prev => ({ ...prev, topic: e.target.value }))}
                            >
                                {contactOptions.map((o) => (
                                    <option key={o.title} value={o.title}>{o.title}</option>
                                ))}
                                <option value="General Question">General Question</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-message">Message *</label>
                            <textarea
                                id="contact-message"
                                required
                                placeholder="Tell us about your needs, organization, and what you're looking for..."
                                value={form.message}
                                onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            id="contact-submit-btn"
                            disabled={loading}
                            style={{ width: "100%", justifyContent: "center", padding: "1rem", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}
                        >
                            {loading ? "Sending..." : "Send Message →"}
                        </button>

                        <p style={{ fontSize: "0.75rem", color: "var(--hsg-muted)", marginTop: "1rem", textAlign: "center" }}>
                            By submitting, you agree to our privacy policy. We respond within 1–2 business days.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function Kontakt() {
    return (
        <div style={{ minHeight: "100vh" }}>
            <div className="page-header">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>›</span>
                        <span>Contact</span>
                    </div>
                    <div className="page-header-label">Get In Touch</div>
                    <h1>Contact & Get Involved</h1>
                    <p>
                        Whether you want to organize a workshop, become a partner, or register for an executive course —
                        we're here to help you on your AI journey.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "var(--hsg-muted)" }}>Loading contact form...</div>}>
                        <ContactFormContent />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}
