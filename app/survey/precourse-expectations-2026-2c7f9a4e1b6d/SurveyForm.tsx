"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const COURSE_LABEL =
    "The AI Agent Workforce: How to Automatize Organizational Workflows (12. and 13th November 2026)";

export default function SurveyForm() {
    const searchParams = useSearchParams();
    const prefillName = searchParams?.get("name") ?? "";
    const prefillEmail = searchParams?.get("email") ?? "";

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: prefillName,
        email: prefillEmail,
        expectations: "",
        question: "",
    });

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

        const payload = {
            name: form.name || "Anonymous Participant",
            company: "",
            email: form.email || "no-reply@agentic-enterprise.ch",
            topic: "Course Survey",
            message:
                `Course: ${COURSE_LABEL}\n\n` +
                `— Expectations —\n${form.expectations}\n\n` +
                `— Specific Question / Problem —\n${form.question}`,
        };

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: `New Request: Course Survey from ${payload.name}`,
                    from_name: "Agentic AI Platform",
                    ...payload,
                }),
            });
            const result = await res.json();
            if (result.success) {
                setSubmitted(true);
            } else {
                alert(
                    "Something went wrong. Please try again or email us directly at julius.schulte@unisg.ch.",
                );
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting the form. Please email us directly at julius.schulte@unisg.ch.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            {submitted ? (
                <div
                    style={{
                        background: "var(--hsg-green-pale)",
                        border: "1px solid var(--hsg-green-light)",
                        borderRadius: "var(--radius-lg)",
                        padding: "3rem",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                    <h3
                        style={{
                            fontWeight: 800,
                            color: "var(--hsg-dark)",
                            marginBottom: "0.75rem",
                        }}
                    >
                        Thank You!
                    </h3>
                    <p style={{ color: "var(--hsg-muted)", lineHeight: 1.7 }}>
                        Your responses help shape the course. We'll address your question and
                        expectations during the sessions on 12. and 13th November 2026.
                    </p>
                    <button
                        onClick={() => {
                            setSubmitted(false);
                            setForm({ name: "", email: "", expectations: "", question: "" });
                        }}
                        className="btn"
                        style={{
                            marginTop: "1.5rem",
                            background: "transparent",
                            border: "1px solid var(--hsg-green)",
                            color: "var(--hsg-green)",
                            padding: "0.5rem 1rem",
                            borderRadius: "4px",
                        }}
                    >
                        Submit another response
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        background: "white",
                        border: "1px solid var(--hsg-border)",
                        borderRadius: "var(--radius-lg)",
                        padding: "2.5rem",
                        boxShadow: "var(--shadow-md)",
                    }}
                >
                    <h3
                        style={{
                            fontWeight: 800,
                            color: "var(--hsg-dark)",
                            marginBottom: "0.5rem",
                            fontSize: "1.25rem",
                        }}
                    >
                        Before the course begins
                    </h3>
                    <p
                        style={{
                            color: "var(--hsg-muted)",
                            fontSize: "0.9rem",
                            marginBottom: "2rem",
                            lineHeight: 1.6,
                        }}
                    >
                        A short two-question survey so we can tailor the sessions to you. Name and
                        email are optional — leave them blank if you prefer to respond anonymously.
                    </p>

                    <div className="grid-2" style={{ gap: "1rem", marginBottom: "0" }}>
                        <div className="form-group">
                            <label htmlFor="survey-name">Name (optional)</label>
                            <input
                                id="survey-name"
                                type="text"
                                placeholder="Your name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, name: e.target.value }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="survey-email">Email (optional)</label>
                            <input
                                id="survey-email"
                                type="email"
                                placeholder="you@company.com"
                                value={form.email}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, email: e.target.value }))
                                }
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="survey-expectations">
                            What are your expectations for the course{" "}
                            <em>
                                &ldquo;The AI Agent Workforce: How to Automatize Organizational
                                Workflows&rdquo;
                            </em>{" "}
                            (12. and 13th November 2026)? *
                        </label>
                        <textarea
                            id="survey-expectations"
                            required
                            rows={5}
                            placeholder="What do you hope to take away from the two days?"
                            value={form.expectations}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, expectations: e.target.value }))
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="survey-question">
                            Do you have a specific Agentic-AI–related question or problem that we
                            may potentially address during the course? *
                        </label>
                        <textarea
                            id="survey-question"
                            required
                            rows={5}
                            placeholder="A concrete use case, blocker, or open question from your work."
                            value={form.question}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, question: e.target.value }))
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            padding: "1rem",
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        {loading ? "Sending..." : "Submit Response →"}
                    </button>

                    <p
                        style={{
                            fontSize: "0.75rem",
                            color: "var(--hsg-muted)",
                            marginTop: "1rem",
                            textAlign: "center",
                        }}
                    >
                        Your responses are sent only to the course instructor.
                    </p>
                </form>
            )}
        </div>
    );
}
