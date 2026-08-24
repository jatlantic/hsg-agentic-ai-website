import type { Metadata } from "next";
import { Suspense } from "react";
import SurveyForm from "./SurveyForm";

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
                        <strong>How to Automatize Organizational Workflows</strong> · 8. and 9th June 2026 — pre-course survey
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
