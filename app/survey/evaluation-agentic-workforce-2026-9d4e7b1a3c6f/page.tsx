import type { Metadata } from "next";
import { Suspense } from "react";
import EvaluationForm from "./EvaluationForm";

export const metadata: Metadata = {
    title: "Course Evaluation",
    robots: { index: false, follow: false },
};

export default function EvaluationPage() {
    return (
        <div style={{ minHeight: "100vh" }}>
            <div className="page-header">
                <div className="container">
                    <div className="page-header-label">Course Participants</div>
                    <h1>The AI Agent Workforce</h1>
                    <p>
                        <strong>How to Automatize Organizational Workflows</strong> · 8. and 9th June 2026 — course evaluation
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "var(--hsg-muted)" }}>Loading evaluation…</div>}>
                        <EvaluationForm />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}
