"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const COURSE_LABEL =
    "The AI Agent Workforce: How to Automatize Organizational Workflows (8. and 9th June 2026)";

const RATINGS: { key: RatingKey; label: string }[] = [
    { key: "overall", label: "Overall experience" },
    { key: "relevance", label: "Relevance to my work" },
    { key: "instructor", label: "Instructor & delivery" },
];

type RatingKey = "overall" | "relevance" | "instructor";

// ── Small inline rating control (radio pills) — kept out of .form-group so the
//    global `width:100%` input rule doesn't apply. Accessible buttons with aria. ──
function Scale({
    label,
    value,
    onChange,
    min = 1,
    max = 10,
    lowLabel,
    highLabel,
}: {
    label: string;
    value: number | null;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
    lowLabel?: string;
    highLabel?: string;
}) {
    const options = [];
    for (let i = min; i <= max; i++) options.push(i);
    return (
        <div style={{ marginBottom: "1.5rem" }}>
            <label
                style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--hsg-dark)",
                    marginBottom: "0.6rem",
                }}
            >
                {label}
            </label>
            <div
                role="radiogroup"
                aria-label={label}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
            >
                {options.map((i) => {
                    const active = value === i;
                    return (
                        <button
                            key={i}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => onChange(i)}
                            style={{
                                minWidth: "2.6rem",
                                padding: "0.55rem 0",
                                flex: max - min > 6 ? "1 1 2.4rem" : "0 0 auto",
                                borderRadius: "var(--radius-md, 10px)",
                                border: `1.5px solid ${active ? "var(--hsg-green)" : "var(--hsg-border)"}`,
                                background: active ? "var(--hsg-green)" : "var(--hsg-white, #fff)",
                                color: active ? "#fff" : "var(--hsg-dark)",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                cursor: "pointer",
                                transition: "all 0.15s",
                            }}
                        >
                            {i}
                        </button>
                    );
                })}
            </div>
            {(lowLabel || highLabel) && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.72rem",
                        color: "var(--hsg-muted)",
                        marginTop: "0.35rem",
                    }}
                >
                    <span>{lowLabel}</span>
                    <span>{highLabel}</span>
                </div>
            )}
        </div>
    );
}

function Consent({
    checked,
    onChange,
    children,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    children: React.ReactNode;
}) {
    return (
        <label
            style={{
                display: "flex",
                gap: "0.7rem",
                alignItems: "flex-start",
                marginBottom: "0.9rem",
                fontSize: "0.875rem",
                lineHeight: 1.5,
                color: "var(--hsg-text, #1f2937)",
                cursor: "pointer",
            }}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                style={{
                    width: "1.15rem",
                    height: "1.15rem",
                    marginTop: "0.1rem",
                    flex: "0 0 auto",
                    accentColor: "var(--hsg-green)",
                    cursor: "pointer",
                }}
            />
            <span>{children}</span>
        </label>
    );
}

export default function EvaluationForm() {
    const searchParams = useSearchParams();
    const prefill = (k: string) => searchParams?.get(k) ?? "";

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: prefill("name"),
        valuable: "",
        improve: "",
        quote: "",
    });
    const [ratings, setRatings] = useState<Record<RatingKey, number | null>>({
        overall: null,
        relevance: null,
        instructor: null,
    });
    const [nps, setNps] = useState<number | null>(null);
    const [consent, setConsent] = useState({ quote: false, photo: false });

    const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

    const anyConsent = consent.quote || consent.photo;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // light validation
        const missingRating =
            RATINGS.some((r) => ratings[r.key] == null) || nps == null;
        if (missingRating) {
            setError("Please complete the rating questions (the scaled questions and the recommend score).");
            return;
        }
        if (anyConsent && !form.name.trim()) {
            setError("Please add your name above so we can attribute your quote/photo correctly.");
            return;
        }

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

        const yn = (b: boolean) => (b ? "YES" : "—");
        const message =
            `Course: ${COURSE_LABEL}\n\n` +
            `— Participant —\n` +
            `Name: ${form.name || "(anonymous)"}\n\n` +
            `— Ratings (1–10) —\n` +
            RATINGS.map((r) => `${r.label}: ${ratings[r.key]}/10`).join("\n") +
            `\n\nLikelihood to recommend (1–10): ${nps}/10\n\n` +
            `— Most valuable —\n${form.valuable || "—"}\n\n` +
            `— What to improve —\n${form.improve || "—"}\n\n` +
            `— Testimonial quote —\n${form.quote || "—"}\n\n` +
            `— Consent —\n` +
            `Publish quote with attribution: ${yn(consent.quote)}\n` +
            `Use photos taken during the course: ${yn(consent.photo)}`;

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: `New Course Evaluation from ${form.name || "Anonymous Participant"}`,
                    from_name: "Agentic AI Platform",
                    name: form.name || "Anonymous Participant",
                    email: "no-reply@agentic-enterprise.ch",
                    topic: "Course Evaluation",
                    message,
                }),
            });
            const result = await res.json();
            if (result.success) {
                setSubmitted(true);
            } else {
                alert("Something went wrong. Please try again or email us directly at julius.schulte@unisg.ch.");
            }
        } catch (err) {
            console.error(err);
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
                    <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", marginBottom: "0.75rem" }}>
                        Thank you!
                    </h3>
                    <p style={{ color: "var(--hsg-muted)", lineHeight: 1.7 }}>
                        Your feedback helps us improve the course. If you gave consent for a quote or photo, we may
                        feature it on LinkedIn and other course channels — thank you for supporting the programme.
                    </p>
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
                    <h3 style={{ fontWeight: 800, color: "var(--hsg-dark)", marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                        How was the course?
                    </h3>
                    <p style={{ color: "var(--hsg-muted)", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.6 }}>
                        A short evaluation of <em>&ldquo;The AI Agent Workforce&rdquo;</em> (8.–9. June 2026). The rating
                        questions take under a minute; the quote and consent at the end are optional.
                    </p>

                    {/* identity */}
                    <div className="form-group">
                        <label htmlFor="ev-name">Name</label>
                        <input
                            id="ev-name"
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                        />
                    </div>

                    {/* ratings */}
                    <div
                        style={{
                            borderTop: "1px solid var(--hsg-border)",
                            paddingTop: "1.5rem",
                            marginBottom: "0.5rem",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--hsg-green)",
                        }}
                    >
                        Your ratings
                    </div>
                    {RATINGS.map((r) => (
                        <Scale
                            key={r.key}
                            label={r.label}
                            value={ratings[r.key]}
                            onChange={(v) => setRatings((p) => ({ ...p, [r.key]: v }))}
                            lowLabel="Poor"
                            highLabel="Excellent"
                        />
                    ))}
                    <Scale
                        label="How likely are you to recommend this course to a colleague?"
                        value={nps}
                        onChange={setNps}
                        min={1}
                        max={10}
                        lowLabel="Not at all likely"
                        highLabel="Extremely likely"
                    />

                    {/* open feedback */}
                    <div className="form-group">
                        <label htmlFor="ev-valuable">What was most valuable for you? (optional)</label>
                        <textarea
                            id="ev-valuable"
                            rows={4}
                            placeholder="A concept, demo, or discussion you'll take back to work."
                            value={form.valuable}
                            onChange={(e) => set("valuable", e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ev-improve">What would you improve? (optional)</label>
                        <textarea
                            id="ev-improve"
                            rows={4}
                            placeholder="Anything we could do better next time."
                            value={form.improve}
                            onChange={(e) => set("improve", e.target.value)}
                        />
                    </div>

                    {/* testimonial */}
                    <div className="form-group">
                        <label htmlFor="ev-quote">A short quote we could share about the course (optional)</label>
                        <textarea
                            id="ev-quote"
                            rows={3}
                            placeholder="e.g. “Two days that turned agentic AI from a buzzword into a concrete plan.”"
                            value={form.quote}
                            onChange={(e) => set("quote", e.target.value)}
                        />
                    </div>

                    {/* consent */}
                    <div
                        style={{
                            borderTop: "1px solid var(--hsg-border)",
                            paddingTop: "1.5rem",
                            marginBottom: "1rem",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--hsg-green)",
                        }}
                    >
                        Permissions (optional)
                    </div>
                    <p style={{ color: "var(--hsg-muted)", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.6 }}>
                        With your permission, we&rsquo;d love to feature your experience (optional).
                    </p>
                    <Consent checked={consent.quote} onChange={(v) => setConsent((p) => ({ ...p, quote: v }))}>
                        You may <strong>publish my quote</strong> with attribution (my name) on LinkedIn and other course
                        channels.
                    </Consent>
                    <Consent checked={consent.photo} onChange={(v) => setConsent((p) => ({ ...p, photo: v }))}>
                        You may <strong>use photos of me</strong> taken during the course on LinkedIn and other course
                        channels.
                    </Consent>
                    <p style={{ color: "var(--hsg-muted)", fontSize: "0.75rem", marginTop: "0.75rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                        Voluntary — withdraw anytime via julius.schulte@unisg.ch.
                    </p>

                    {error && (
                        <p
                            style={{
                                background: "var(--hsg-green-pale)",
                                border: "1px solid var(--hsg-korall, #eb6969)",
                                color: "var(--hsg-dark)",
                                borderRadius: "var(--radius-md, 10px)",
                                padding: "0.75rem 1rem",
                                fontSize: "0.85rem",
                                marginBottom: "1rem",
                            }}
                        >
                            {error}
                        </p>
                    )}

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
                        {loading ? "Sending..." : "Submit Evaluation →"}
                    </button>

                    <p style={{ fontSize: "0.75rem", color: "var(--hsg-muted)", marginTop: "1rem", textAlign: "center" }}>
                        Your responses are sent only to the course instructor.
                    </p>
                </form>
            )}
        </div>
    );
}
