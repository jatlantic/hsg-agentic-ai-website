import type { Metadata } from "next";
import { Suspense } from "react";
// This URL serves the pre-course survey again (name/email prefilled via ?name=&email=).
// The post-course evaluation remains available at /survey/evaluation-agentic-workforce-2026-9d4e7b1a3c6f.
import SurveyForm from "../precourse-expectations-2026-2c7f9a4e1b6d/SurveyForm";

export const metadata: Metadata = {
    title: "Course Survey",
    robots: { index: false, follow: false },
};

export default function SurveyPage() {
    return (
        <div style={{ minHeight: "100vh" }}>
            <div className="page-header">
                <div className="container">
                    <div className="page-header-label">Course Participants</div>
                    <h1>The AI Agent Workforce</h1>
                    <p>
                        <strong>How to Automatize Organizational Workflows</strong> · 12. and 13th November 2026 — pre-course survey
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "var(--hsg-muted)" }}>Loading survey…</div>}>
                        <SurveyForm />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}
