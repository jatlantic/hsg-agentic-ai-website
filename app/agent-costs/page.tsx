"use client";
import { useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Agent Costs – Top Model Rankings
   Benchmark scores: Artificial Analysis (via openrouter.ai/rankings)
   Live pricing:     openrouter.ai/api/v1/models
───────────────────────────────────────────────────────────────────────────── */

type ModelEntry = {
    rank: number;
    name: string;
    provider: string;
    providerColor: string;
    openRouterId: string;
    score: number;
    inputCostPerM: number | null;
    outputCostPerM: number | null;
    contextK: number;
    notes?: string;
};

/* ── Agentic Index – Artificial Analysis Agentic Index (GDPval-AA)
      Source: openrouter.ai/rankings?benchmark=agentic ── */
const AGENTIC_BASE: ModelEntry[] = [
    { rank: 1,  name: "Claude Opus 4.6 (Extended Thinking)", provider: "Anthropic",    providerColor: "#c96442", openRouterId: "anthropic/claude-opus-4.6",              score: 85, inputCostPerM: null, outputCostPerM: null, contextK: 200  },
    { rank: 2,  name: "o3 (high effort)",                    provider: "OpenAI",        providerColor: "#10a37f", openRouterId: "openai/o3",                             score: 82, inputCostPerM: null, outputCostPerM: null, contextK: 200  },
    { rank: 3,  name: "Claude Sonnet 4.6 (Extended Thinking)",provider:"Anthropic",    providerColor: "#c96442", openRouterId: "anthropic/claude-sonnet-4.6",            score: 79, inputCostPerM: null, outputCostPerM: null, contextK: 200  },
    { rank: 4,  name: "Gemini 3.1 Pro Preview",              provider: "Google",        providerColor: "#4285f4", openRouterId: "google/gemini-3.1-pro-preview",          score: 77, inputCostPerM: null, outputCostPerM: null, contextK: 1048 },
    { rank: 5,  name: "GPT-5.4",                             provider: "OpenAI",        providerColor: "#10a37f", openRouterId: "openai/gpt-5.4",                        score: 75, inputCostPerM: null, outputCostPerM: null, contextK: 1050 },
    { rank: 6,  name: "Grok 4.20 Beta",                      provider: "xAI",           providerColor: "#000000", openRouterId: "x-ai/grok-4.20-beta",                   score: 73, inputCostPerM: null, outputCostPerM: null, contextK: 2000 },
    { rank: 7,  name: "GPT-5.3 Codex (xhigh)",               provider: "OpenAI",        providerColor: "#10a37f", openRouterId: "openai/gpt-5.3-codex",                  score: 71, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
    { rank: 8,  name: "DeepSeek R1 (Thinking)",               provider: "DeepSeek",      providerColor: "#1677ff", openRouterId: "deepseek/deepseek-r1",                  score: 67, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
    { rank: 9,  name: "Gemini 3 Flash Preview",               provider: "Google",        providerColor: "#4285f4", openRouterId: "google/gemini-3-flash-preview",          score: 65, inputCostPerM: null, outputCostPerM: null, contextK: 1048 },
    { rank: 10, name: "GPT-4.1",                              provider: "OpenAI",        providerColor: "#10a37f", openRouterId: "openai/gpt-4.1",                        score: 63, inputCostPerM: null, outputCostPerM: null, contextK: 1000 },
    { rank: 11, name: "Qwen3 235B A22B (Thinking)",           provider: "Qwen / Alibaba",providerColor: "#7b2ff7", openRouterId: "qwen/qwen3-235b-a22b",                  score: 61, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
    { rank: 12, name: "Llama 4 Maverick",                     provider: "Meta",          providerColor: "#0668e1", openRouterId: "meta-llama/llama-4-maverick",            score: 58, inputCostPerM: null, outputCostPerM: null, contextK: 1000 },
    { rank: 13, name: "Claude Haiku 4.5",                     provider: "Anthropic",     providerColor: "#c96442", openRouterId: "anthropic/claude-haiku-4.5",            score: 56, inputCostPerM: null, outputCostPerM: null, contextK: 200  },
    { rank: 14, name: "GPT-4.1 Mini",                         provider: "OpenAI",        providerColor: "#10a37f", openRouterId: "openai/gpt-4.1-mini",                   score: 54, inputCostPerM: null, outputCostPerM: null, contextK: 1000 },
    { rank: 15, name: "Mistral Large 2512",                   provider: "Mistral",       providerColor: "#ff7000", openRouterId: "mistralai/mistral-large-2512",          score: 51, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
    { rank: 16, name: "Gemini 3.1 Flash Lite Preview",        provider: "Google",        providerColor: "#4285f4", openRouterId: "google/gemini-3.1-flash-lite-preview",  score: 48, inputCostPerM: null, outputCostPerM: null, contextK: 1048 },
    { rank: 17, name: "Qwen3.5 9B",                           provider: "Qwen / Alibaba",providerColor: "#7b2ff7", openRouterId: "qwen/qwen3.5-9b",                       score: 44, inputCostPerM: null, outputCostPerM: null, contextK: 262  },
    { rank: 18, name: "Phi-4",                                provider: "Microsoft",     providerColor: "#0078d4", openRouterId: "microsoft/phi-4",                       score: 41, inputCostPerM: null, outputCostPerM: null, contextK: 32   },
    { rank: 19, name: "DeepSeek V3.2",                        provider: "DeepSeek",      providerColor: "#1677ff", openRouterId: "deepseek/deepseek-v3.2",                score: 38, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
    { rank: 20, name: "Llama 3.3 70B Instruct",               provider: "Meta",          providerColor: "#0668e1", openRouterId: "meta-llama/llama-3.3-70b-instruct",     score: 34, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
];

/* ── Intelligence Index – Artificial Analysis Intelligence Index v4.0
      Source: openrouter.ai/rankings?benchmark=intelligence ── */
const INTELLIGENCE_BASE: ModelEntry[] = [
    { rank: 1,  name: "Gemini 3.1 Pro Preview",         provider: "Google",         providerColor: "#4285f4", openRouterId: "google/gemini-3.1-pro-preview",         score: 57, inputCostPerM: null, outputCostPerM: null, contextK: 1048 },
    { rank: 2,  name: "GPT-5.4 (xhigh)",                provider: "OpenAI",         providerColor: "#10a37f", openRouterId: "openai/gpt-5.4",                       score: 57, inputCostPerM: null, outputCostPerM: null, contextK: 1050 },
    { rank: 3,  name: "GPT-5.3 Codex (xhigh)",          provider: "OpenAI",         providerColor: "#10a37f", openRouterId: "openai/gpt-5.3-codex",                 score: 54, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
    { rank: 4,  name: "Claude Opus 4.6 (max effort)",   provider: "Anthropic",      providerColor: "#c96442", openRouterId: "anthropic/claude-opus-4.6",             score: 53, inputCostPerM: null, outputCostPerM: null, contextK: 200  },
    { rank: 5,  name: "Claude Sonnet 4.6 (max effort)", provider: "Anthropic",      providerColor: "#c96442", openRouterId: "anthropic/claude-sonnet-4.6",           score: 52, inputCostPerM: null, outputCostPerM: null, contextK: 200  },
    { rank: 6,  name: "Gemini 3 Flash Preview",         provider: "Google",         providerColor: "#4285f4", openRouterId: "google/gemini-3-flash-preview",         score: 51, inputCostPerM: null, outputCostPerM: null, contextK: 1048 },
    { rank: 7,  name: "GLM-5 (Reasoning)",              provider: "Zhipu AI",       providerColor: "#6366f1", openRouterId: "z-ai/glm-5",                           score: 50, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
    { rank: 8,  name: "Kimi K2.5 (Reasoning)",          provider: "Moonshot AI",    providerColor: "#ec4899", openRouterId: "moonshotai/kimi-k2.5",                 score: 47, inputCostPerM: null, outputCostPerM: null, contextK: 200  },
    { rank: 9,  name: "Qwen3.5 397B A17B (Reasoning)",  provider: "Qwen / Alibaba", providerColor: "#7b2ff7", openRouterId: "qwen/qwen3.5-397b-a17b",               score: 45, inputCostPerM: null, outputCostPerM: null, contextK: 256  },
    { rank: 10, name: "o3 (high effort)",                provider: "OpenAI",         providerColor: "#10a37f", openRouterId: "openai/o3",                            score: 43, inputCostPerM: null, outputCostPerM: null, contextK: 200  },
    { rank: 11, name: "Grok 4.20 Beta",                  provider: "xAI",            providerColor: "#000000", openRouterId: "x-ai/grok-4.20-beta",                  score: 41, inputCostPerM: null, outputCostPerM: null, contextK: 2000 },
    { rank: 12, name: "DeepSeek R1 (Thinking)",          provider: "DeepSeek",       providerColor: "#1677ff", openRouterId: "deepseek/deepseek-r1",                 score: 39, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
    { rank: 13, name: "Llama 4 Maverick",                provider: "Meta",           providerColor: "#0668e1", openRouterId: "meta-llama/llama-4-maverick",           score: 36, inputCostPerM: null, outputCostPerM: null, contextK: 1000 },
    { rank: 14, name: "Qwen3.5 122B A10B",               provider: "Qwen / Alibaba", providerColor: "#7b2ff7", openRouterId: "qwen/qwen3.5-122b-a10b",               score: 34, inputCostPerM: null, outputCostPerM: null, contextK: 256  },
    { rank: 15, name: "GPT-4.1",                         provider: "OpenAI",         providerColor: "#10a37f", openRouterId: "openai/gpt-4.1",                       score: 32, inputCostPerM: null, outputCostPerM: null, contextK: 1000 },
    { rank: 16, name: "Mistral Large 2512",              provider: "Mistral",        providerColor: "#ff7000", openRouterId: "mistralai/mistral-large-2512",         score: 30, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
    { rank: 17, name: "Claude Haiku 4.5",                provider: "Anthropic",      providerColor: "#c96442", openRouterId: "anthropic/claude-haiku-4.5",           score: 28, inputCostPerM: null, outputCostPerM: null, contextK: 200  },
    { rank: 18, name: "Gemini 3.1 Flash Lite Preview",   provider: "Google",         providerColor: "#4285f4", openRouterId: "google/gemini-3.1-flash-lite-preview", score: 26, inputCostPerM: null, outputCostPerM: null, contextK: 1048 },
    { rank: 19, name: "Phi-4",                           provider: "Microsoft",      providerColor: "#0078d4", openRouterId: "microsoft/phi-4",                      score: 24, inputCostPerM: null, outputCostPerM: null, contextK: 32   },
    { rank: 20, name: "Llama 3.3 70B Instruct",          provider: "Meta",           providerColor: "#0668e1", openRouterId: "meta-llama/llama-3.3-70b-instruct",    score: 22, inputCostPerM: null, outputCostPerM: null, contextK: 128  },
];

/* ── Helpers ── */

// Industry-standard token ratio assumptions (input : output)
const RATIOS = [
    { label: "3 : 1",  description: "General chat / RAG",     inputW: 0.75, outputW: 0.25 },
    { label: "1 : 1",  description: "Coding agents",          inputW: 0.50, outputW: 0.50 },
    { label: "1 : 3",  description: "Long-form generation",   inputW: 0.25, outputW: 0.75 },
] as const;

type RatioKey = 0 | 1 | 2;

function blendedCost(input: number | null, output: number | null, ratio: RatioKey): number | null {
    if (input === null || output === null) return null;
    return RATIOS[ratio].inputW * input + RATIOS[ratio].outputW * output;
}

function fmtCost(v: number | null): string {
    if (v === null) return "—";
    if (v === 0) return "Free";
    if (v < 0.01) return `$${v.toFixed(3)}`;
    return `$${v.toFixed(2)}`;
}

function fmtCtx(k: number): string {
    return k >= 1000 ? `${(k / 1000).toFixed(k % 1000 === 0 ? 0 : 1)}M` : `${k}K`;
}

function scoreColor(score: number, max: number): string {
    const pct = score / max;
    if (pct >= 0.8) return "#00802f";   // HSG-Grün
    if (pct >= 0.6) return "#0a5f2d";   // HSG-Dunkelgrün
    if (pct >= 0.4) return "#fff04b";   // HSG-Gelb
    return "#eb6969";                    // HSG-Korall
}

function exportCSV(models: ModelEntry[], tabLabel: string, ratioKey: RatioKey) {
    const r = RATIOS[ratioKey];
    const header = ["Rank", "Model", "Provider", `${tabLabel} Score`, "Input $/1M", "Output $/1M", `Avg Cost $/1M (${r.label})`, "Context"];
    const rows = models.map((m) => {
        const bc = blendedCost(m.inputCostPerM, m.outputCostPerM, ratioKey);
        return [
            m.rank,
            `"${m.name}"`,
            `"${m.provider}"`,
            m.score,
            m.inputCostPerM !== null ? m.inputCostPerM.toFixed(4) : "",
            m.outputCostPerM !== null ? m.outputCostPerM.toFixed(4) : "",
            bc !== null ? bc.toFixed(4) : "",
            `${m.contextK}K`,
        ];
    });
    const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `openrouter-${tabLabel.toLowerCase().replace(/ /g, "-")}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportXLS(models: ModelEntry[], tabLabel: string, ratioKey: RatioKey) {
    const r = RATIOS[ratioKey];
    const header = ["Rank", "Model", "Provider", `${tabLabel} Score`, "Input $/1M tokens", "Output $/1M tokens", `Avg Cost $/1M (${r.label})`, "Context Window"];
    const rows = models.map((m) => {
        const bc = blendedCost(m.inputCostPerM, m.outputCostPerM, ratioKey);
        return [
            m.rank,
            m.name,
            m.provider,
            m.score,
            m.inputCostPerM !== null ? m.inputCostPerM : "",
            m.outputCostPerM !== null ? m.outputCostPerM : "",
            bc !== null ? bc : "",
            `${m.contextK}K tokens`,
        ];
    });

    const tableHTML = [
        `<table>`,
        `<tr>${header.map((h) => `<th>${h}</th>`).join("")}</tr>`,
        ...rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`),
        `</table>`,
    ].join("");

    const xml = `<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="${tabLabel}">
    <Table>
      <Row>${header.map((h) => `<Cell><Data ss:Type="String">${h}</Data></Cell>`).join("")}</Row>
      ${rows.map((r) => `<Row>${r.map((c, i) => `<Cell><Data ss:Type="${[0,3,4,5,6].includes(i) ? "Number" : "String"}">${String(c).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</Data></Cell>`).join("")}</Row>`).join("\n      ")}
    </Table>
  </Worksheet>
</Workbook>`;
    void tableHTML; // unused fallback
    const blob = new Blob([xml], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `openrouter-${tabLabel.toLowerCase().replace(/ /g, "-")}-${new Date().toISOString().slice(0, 10)}.xls`;
    a.click();
    URL.revokeObjectURL(url);
}

/* ─────────────────────────────────────────────────────────────────────────── */

export default function AgentCostsPage() {
    const [activeTab, setActiveTab] = useState<"agentic" | "intelligence">("agentic");
    const [agenticModels, setAgenticModels] = useState<ModelEntry[]>(AGENTIC_BASE);
    const [intelligenceModels, setIntelligenceModels] = useState<ModelEntry[]>(INTELLIGENCE_BASE);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [priceError, setPriceError] = useState(false);
    const [selectedRatio, setSelectedRatio] = useState<RatioKey>(0);

    const fetchLivePrices = useCallback(async () => {
        setLoading(true);
        setPriceError(false);
        try {
            const res = await fetch("https://openrouter.ai/api/v1/models");
            if (!res.ok) throw new Error("fetch failed");
            const json = await res.json();
            const priceMap: Record<string, { input: number; output: number }> = {};
            for (const m of json.data ?? []) {
                priceMap[m.id] = {
                    input: parseFloat(m.pricing?.prompt ?? "0") * 1_000_000,
                    output: parseFloat(m.pricing?.completion ?? "0") * 1_000_000,
                };
            }

            const enrich = (list: ModelEntry[]) =>
                list.map((m) => {
                    const p = priceMap[m.openRouterId];
                    if (!p) return m;
                    return { ...m, inputCostPerM: p.input, outputCostPerM: p.output };
                });

            setAgenticModels(enrich(AGENTIC_BASE));
            setIntelligenceModels(enrich(INTELLIGENCE_BASE));
            setLastUpdated(new Date().toLocaleString());
        } catch {
            setPriceError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLivePrices();
    }, [fetchLivePrices]);

    const activeModels = activeTab === "agentic" ? agenticModels : intelligenceModels;
    const maxScore = Math.max(...activeModels.map((m) => m.score));
    const tabLabel = activeTab === "agentic" ? "Agentic Index" : "Intelligence Index";

    const pricedModels = activeModels.filter((m) => m.inputCostPerM !== null && m.outputCostPerM !== null);
    const avgInput = pricedModels.length > 0
        ? pricedModels.reduce((s, m) => s + m.inputCostPerM!, 0) / pricedModels.length
        : null;
    const avgOutput = pricedModels.length > 0
        ? pricedModels.reduce((s, m) => s + m.outputCostPerM!, 0) / pricedModels.length
        : null;
    const avgScore = activeModels.reduce((s, m) => s + m.score, 0) / activeModels.length;
    const avgBlended = avgInput !== null && avgOutput !== null
        ? RATIOS[selectedRatio].inputW * avgInput + RATIOS[selectedRatio].outputW * avgOutput
        : null;

    return (
        <div style={{ paddingTop: 72 }}>
            {/* ── Hero ── */}
            <section
                style={{
                    background: "linear-gradient(135deg, var(--hsg-green-dark) 0%, var(--hsg-green) 100%)",
                    padding: "4rem 0 3rem",
                    color: "white",
                }}
            >
                <div className="container">
                    <span
                        style={{
                            display: "inline-block",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.6)",
                            marginBottom: "0.75rem",
                        }}
                    >
                        Powered by OpenRouter · Artificial Analysis
                    </span>
                    <h1
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(2rem,4vw,3rem)",
                            fontWeight: 800,
                            lineHeight: 1.15,
                            marginBottom: "1rem",
                        }}
                    >
                        AI Model Rankings
                    </h1>
                    <p
                        style={{
                            fontSize: "1.1rem",
                            color: "rgba(255,255,255,0.75)",
                            maxWidth: 620,
                            lineHeight: 1.65,
                            marginBottom: "2rem",
                        }}
                    >
                        Top 20 frontier models ranked by the{" "}
                        <strong style={{ color: "white" }}>Artificial Analysis Agentic Index</strong> and{" "}
                        <strong style={{ color: "white" }}>Intelligence Index</strong>, with live pricing
                        sourced directly from{" "}
                        <a
                            href="https://openrouter.ai/rankings"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--hsg-beige)", textDecoration: "underline" }}
                        >
                            OpenRouter
                        </a>
                        .
                    </p>

                    {/* Stat chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                        {[
                            { label: "Models tracked", value: "20" },
                            { label: "Benchmarks", value: "2 Indexes" },
                            { label: "Prices", value: "Live via API" },
                        ].map((s) => (
                            <div
                                key={s.label}
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    borderRadius: 8,
                                    padding: "0.5rem 1rem",
                                    fontSize: "0.8rem",
                                }}
                            >
                                <span style={{ fontWeight: 700, color: "white" }}>{s.value}</span>
                                <span style={{ color: "rgba(255,255,255,0.55)", marginLeft: 6 }}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Controls ── */}
            <div
                style={{
                    position: "sticky",
                    top: 72,
                    zIndex: 50,
                    background: "white",
                    borderBottom: "1px solid var(--hsg-border)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
            >
                <div
                    className="container"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        padding: "0.75rem 2rem",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Tab pills */}
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        {(
                            [
                                { key: "agentic", label: "🤖  Agentic Index" },
                                { key: "intelligence", label: "🧠  Intelligence Index" },
                            ] as const
                        ).map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    padding: "0.45rem 1.1rem",
                                    borderRadius: 100,
                                    border: `2px solid ${activeTab === tab.key ? "var(--hsg-green)" : "var(--hsg-border)"}`,
                                    background: activeTab === tab.key ? "var(--hsg-green)" : "transparent",
                                    color: activeTab === tab.key ? "white" : "var(--hsg-muted)",
                                    fontWeight: 600,
                                    fontSize: "0.82rem",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                        {lastUpdated && (
                            <span
                                style={{
                                    fontSize: "0.72rem",
                                    color: "var(--hsg-muted)",
                                    marginRight: "0.25rem",
                                }}
                            >
                                Prices updated: {lastUpdated}
                            </span>
                        )}
                        <button
                            onClick={fetchLivePrices}
                            disabled={loading}
                            style={{
                                padding: "0.4rem 0.9rem",
                                borderRadius: 6,
                                border: "1px solid var(--hsg-green)",
                                background: "var(--hsg-green-pale)",
                                color: "var(--hsg-green)",
                                fontWeight: 600,
                                fontSize: "0.78rem",
                                cursor: loading ? "not-allowed" : "pointer",
                                opacity: loading ? 0.6 : 1,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            {loading ? "⟳ Fetching…" : "⟳ Refresh Prices"}
                        </button>
                        {/* Ratio selector */}
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginRight: 4 }}>
                            <span style={{ fontSize: "0.72rem", color: "var(--hsg-muted)", fontWeight: 600, whiteSpace: "nowrap" }}>
                                Token ratio:
                            </span>
                            {RATIOS.map((r, i) => (
                                <button
                                    key={r.label}
                                    onClick={() => setSelectedRatio(i as RatioKey)}
                                    title={r.description}
                                    style={{
                                        padding: "0.3rem 0.6rem",
                                        borderRadius: 4,
                                        border: `1px solid ${selectedRatio === i ? "var(--hsg-green)" : "var(--hsg-border)"}`,
                                        background: selectedRatio === i ? "var(--hsg-green)" : "white",
                                        color: selectedRatio === i ? "white" : "var(--hsg-muted)",
                                        fontWeight: 600,
                                        fontSize: "0.72rem",
                                        cursor: "pointer",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => exportCSV(activeModels, tabLabel, selectedRatio)}
                            style={{
                                padding: "0.4rem 0.9rem",
                                borderRadius: 6,
                                border: "1px solid var(--hsg-border)",
                                background: "white",
                                color: "var(--hsg-text)",
                                fontWeight: 600,
                                fontSize: "0.78rem",
                                cursor: "pointer",
                            }}
                        >
                            ↓ CSV
                        </button>
                        <button
                            onClick={() => exportXLS(activeModels, tabLabel, selectedRatio)}
                            style={{
                                padding: "0.4rem 0.9rem",
                                borderRadius: 6,
                                border: "1px solid var(--hsg-border)",
                                background: "white",
                                color: "var(--hsg-text)",
                                fontWeight: 600,
                                fontSize: "0.78rem",
                                cursor: "pointer",
                            }}
                        >
                            ↓ Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Table section ── */}
            <section className="section" style={{ padding: "3rem 0 5rem" }}>
                <div className="container">
                    {priceError && (
                        <div
                            style={{
                                background: "var(--hsg-beige-light)",
                                border: "1px solid #b2a834",
                                borderRadius: 8,
                                padding: "0.75rem 1rem",
                                marginBottom: "1.5rem",
                                fontSize: "0.85rem",
                                color: "#66601e",
                            }}
                        >
                            ⚠ Could not fetch live prices from OpenRouter. Showing benchmark data only. Retry above.
                        </div>
                    )}

                    {/* Legend */}
                    <div
                        style={{
                            display: "flex",
                            gap: "1.5rem",
                            marginBottom: "1.5rem",
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        <span style={{ fontSize: "0.78rem", color: "var(--hsg-muted)", fontWeight: 600 }}>
                            Score tier:
                        </span>
                        {[
                            { color: "#00802f", label: "Frontier (80%+)" },
                            { color: "#0a5f2d", label: "Leading (60%+)" },
                            { color: "#fff04b", label: "Competitive (40%+)" },
                            { color: "#eb6969", label: "Developing" },
                        ].map((l) => (
                            <div
                                key={l.label}
                                style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: "var(--hsg-muted)" }}
                            >
                                <span
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 2,
                                        background: l.color,
                                        display: "inline-block",
                                    }}
                                />
                                {l.label}
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div
                        style={{
                            background: "white",
                            border: "1px solid var(--hsg-border)",
                            borderRadius: 12,
                            overflow: "hidden",
                            boxShadow: "var(--shadow-md)",
                        }}
                    >
                        {/* Table header */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "48px 1fr 150px 190px 100px 100px 110px 80px",
                                padding: "0.75rem 1.5rem",
                                background: "var(--hsg-gray-bg)",
                                borderBottom: "1px solid var(--hsg-border)",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                color: "var(--hsg-muted)",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                            }}
                        >
                            <span>#</span>
                            <span>Model</span>
                            <span>Provider</span>
                            <span>{tabLabel} Score</span>
                            <span style={{ textAlign: "right" }}>Input $/1M</span>
                            <span style={{ textAlign: "right" }}>Output $/1M</span>
                            <span style={{ textAlign: "right" }}>
                                Avg Cost $/1M
                                <span style={{ display: "block", fontWeight: 400, fontSize: "0.65rem", textTransform: "none", letterSpacing: 0, color: "var(--hsg-green)" }}>
                                    {RATIOS[selectedRatio].label} ratio
                                </span>
                            </span>
                            <span style={{ textAlign: "right" }}>Context</span>
                        </div>

                        {/* Rows */}
                        {activeModels.map((m, i) => {
                            const sColor = scoreColor(m.score, maxScore);
                            const barPct = (m.score / maxScore) * 100;
                            const bc = blendedCost(m.inputCostPerM, m.outputCostPerM, selectedRatio);
                            return (
                                <div
                                    key={m.openRouterId + m.rank}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "48px 1fr 150px 190px 100px 100px 110px 80px",
                                        padding: "0.9rem 1.5rem",
                                        borderBottom:
                                            i < activeModels.length - 1
                                                ? "1px solid var(--hsg-border)"
                                                : "none",
                                        alignItems: "center",
                                        transition: "background 0.15s",
                                        background: i % 2 === 0 ? "white" : "#fafafa",
                                    }}
                                    onMouseEnter={(e) =>
                                        ((e.currentTarget as HTMLDivElement).style.background = "var(--hsg-green-ultra-pale)")
                                    }
                                    onMouseLeave={(e) =>
                                        ((e.currentTarget as HTMLDivElement).style.background = i % 2 === 0 ? "white" : "#fafafa")
                                    }
                                >
                                    {/* Rank */}
                                    <span
                                        style={{
                                            fontWeight: 800,
                                            fontSize: m.rank <= 3 ? "1.1rem" : "0.9rem",
                                            color: m.rank === 1 ? "#c9a227" : m.rank === 2 ? "#9ca3af" : m.rank === 3 ? "#cd7c2e" : "var(--hsg-muted)",
                                        }}
                                    >
                                        {m.rank <= 3 ? ["🥇", "🥈", "🥉"][m.rank - 1] : m.rank}
                                    </span>

                                    {/* Model name */}
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                fontSize: "0.88rem",
                                                color: "var(--hsg-dark)",
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {m.name}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "0.72rem",
                                                color: "var(--hsg-muted)",
                                                marginTop: 2,
                                                fontFamily: "monospace",
                                            }}
                                        >
                                            {m.openRouterId}
                                        </div>
                                    </div>

                                    {/* Provider badge */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <span
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: m.providerColor,
                                                flexShrink: 0,
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: "0.8rem",
                                                color: "var(--hsg-text)",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {m.provider}
                                        </span>
                                    </div>

                                    {/* Score bar */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div
                                            style={{
                                                flex: 1,
                                                height: 8,
                                                background: "var(--hsg-border)",
                                                borderRadius: 4,
                                                overflow: "hidden",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: `${barPct}%`,
                                                    height: "100%",
                                                    background: `linear-gradient(90deg, ${sColor}, ${sColor}cc)`,
                                                    borderRadius: 4,
                                                    transition: "width 0.6s ease",
                                                }}
                                            />
                                        </div>
                                        <span
                                            style={{
                                                fontWeight: 700,
                                                fontSize: "0.85rem",
                                                color: sColor,
                                                minWidth: 28,
                                                textAlign: "right",
                                            }}
                                        >
                                            {m.score}
                                        </span>
                                    </div>

                                    {/* Input cost */}
                                    <div style={{ textAlign: "right" }}>
                                        {loading ? (
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: 48,
                                                    height: 14,
                                                    background: "#e5e7eb",
                                                    borderRadius: 4,
                                                    animation: "pulse 1.5s infinite",
                                                }}
                                            />
                                        ) : (
                                            <span
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: "0.85rem",
                                                    color:
                                                        m.inputCostPerM === null
                                                            ? "var(--hsg-muted)"
                                                            : m.inputCostPerM === 0
                                                            ? "#00802f"
                                                            : m.inputCostPerM > 10
                                                            ? "#eb6969"
                                                            : m.inputCostPerM > 1
                                                            ? "#b2a834"
                                                            : "var(--hsg-text)",
                                                }}
                                            >
                                                {fmtCost(m.inputCostPerM)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Output cost */}
                                    <div style={{ textAlign: "right" }}>
                                        {loading ? (
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    width: 48,
                                                    height: 14,
                                                    background: "#e5e7eb",
                                                    borderRadius: 4,
                                                    animation: "pulse 1.5s infinite",
                                                }}
                                            />
                                        ) : (
                                            <span
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: "0.85rem",
                                                    color:
                                                        m.outputCostPerM === null
                                                            ? "var(--hsg-muted)"
                                                            : m.outputCostPerM === 0
                                                            ? "#00802f"
                                                            : m.outputCostPerM > 40
                                                            ? "#eb6969"
                                                            : m.outputCostPerM > 4
                                                            ? "#b2a834"
                                                            : "var(--hsg-text)",
                                                }}
                                            >
                                                {fmtCost(m.outputCostPerM)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Blended / Avg cost */}
                                    <div style={{ textAlign: "right" }}>
                                        {loading ? (
                                            <span style={{ display: "inline-block", width: 48, height: 14, background: "#e5e7eb", borderRadius: 4, animation: "pulse 1.5s infinite" }} />
                                        ) : (
                                            <span
                                                style={{
                                                    fontWeight: 700,
                                                    fontSize: "0.85rem",
                                                    color:
                                                        bc === null
                                                            ? "var(--hsg-muted)"
                                                            : bc === 0
                                                            ? "#00802f"
                                                            : bc > 20
                                                            ? "#eb6969"
                                                            : bc > 3
                                                            ? "#b2a834"
                                                            : "var(--hsg-dark)",
                                                    background: bc !== null && bc > 0 ? "var(--hsg-green-ultra-pale)" : "transparent",
                                                    padding: bc !== null ? "0.1rem 0.35rem" : 0,
                                                    borderRadius: 4,
                                                }}
                                            >
                                                {fmtCost(bc)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Context */}
                                    <div
                                        style={{
                                            textAlign: "right",
                                            fontSize: "0.82rem",
                                            fontWeight: 500,
                                            color: "var(--hsg-muted)",
                                        }}
                                    >
                                        {fmtCtx(m.contextK)}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Average row */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "48px 1fr 150px 190px 100px 100px 110px 80px",
                                padding: "0.9rem 1.5rem",
                                alignItems: "center",
                                background: "var(--hsg-green-pale)",
                                borderTop: "2px solid var(--hsg-green)",
                            }}
                        >
                            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--hsg-green)" }}>Ø</span>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--hsg-green)" }}>
                                    Average (Top 20)
                                </div>
                                <div style={{ fontSize: "0.72rem", color: "var(--hsg-muted)", marginTop: 2 }}>
                                    {pricedModels.length} of 20 models with live pricing
                                </div>
                            </div>
                            <div />
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ flex: 1, height: 8, background: "var(--hsg-border)", borderRadius: 4, overflow: "hidden" }}>
                                    <div style={{ width: `${(avgScore / maxScore) * 100}%`, height: "100%", background: "linear-gradient(90deg, var(--hsg-green), var(--hsg-green-light))", borderRadius: 4 }} />
                                </div>
                                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--hsg-green)", minWidth: 28, textAlign: "right" }}>
                                    {avgScore.toFixed(1)}
                                </span>
                            </div>
                            <div style={{ textAlign: "right", fontWeight: 700, fontSize: "0.85rem", color: "var(--hsg-green)" }}>
                                {avgInput !== null ? fmtCost(avgInput) : "—"}
                            </div>
                            <div style={{ textAlign: "right", fontWeight: 700, fontSize: "0.85rem", color: "var(--hsg-green)" }}>
                                {avgOutput !== null ? fmtCost(avgOutput) : "—"}
                            </div>
                            <div style={{ textAlign: "right", fontWeight: 700, fontSize: "0.9rem", color: "var(--hsg-green)" }}>
                                {avgBlended !== null ? fmtCost(avgBlended) : "—"}
                            </div>
                            <div style={{ textAlign: "right", fontSize: "0.82rem", color: "var(--hsg-muted)" }}>—</div>
                        </div>
                    </div>

                    {/* Attribution */}
                    <div
                        style={{
                            marginTop: "2rem",
                            padding: "1.25rem 1.5rem",
                            background: "var(--hsg-green-ultra-pale)",
                            border: "1px solid var(--hsg-green-pale)",
                            borderRadius: 10,
                            fontSize: "0.8rem",
                            color: "var(--hsg-muted)",
                            lineHeight: 1.7,
                        }}
                    >
                        <strong style={{ color: "var(--hsg-green)", display: "block", marginBottom: 4 }}>
                            Data Sources
                        </strong>
                        <strong>Benchmark scores</strong> are sourced from the{" "}
                        <a
                            href="https://artificialanalysis.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--hsg-green)", fontWeight: 600 }}
                        >
                            Artificial Analysis Intelligence Index v4.0
                        </a>{" "}
                        and Agentic Index (GDPval-AA), as published on{" "}
                        <a
                            href="https://openrouter.ai/rankings?benchmark=agentic"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--hsg-green)", fontWeight: 600 }}
                        >
                            openrouter.ai/rankings
                        </a>
                        . <strong>Live pricing</strong> is fetched directly from the{" "}
                        <a
                            href="https://openrouter.ai/api/v1/models"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--hsg-green)", fontWeight: 600 }}
                        >
                            OpenRouter public API
                        </a>
                        . Models not yet available on OpenRouter show "—" for pricing. Scores are subject to
                        change as Artificial Analysis updates their evaluation methodology.
                    </div>

                    {/* Formula box */}
                    <div
                        style={{
                            marginTop: "1.25rem",
                            padding: "1.5rem",
                            background: "var(--hsg-gray-bg)",
                            border: "1px solid var(--hsg-border)",
                            borderRadius: 10,
                        }}
                    >
                        <strong style={{ color: "var(--hsg-dark)", display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                            Average Cost & Price Methodology
                        </strong>
                        <p style={{ fontSize: "0.8rem", color: "var(--hsg-muted)", marginBottom: "1rem", lineHeight: 1.6 }}>
                            The <strong>Avg Cost $/1M</strong> column shows the blended cost per million tokens based on assumed
                            input:output ratios. Select a ratio in the toolbar above to switch scenarios. All averages below
                            reflect the currently selected ratio: <strong style={{ color: "var(--hsg-green)" }}>{RATIOS[selectedRatio].label} ({RATIOS[selectedRatio].description})</strong>.
                        </p>

                        {/* Ratio explanation cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.25rem" }}>
                            {RATIOS.map((r, i) => (
                                <div
                                    key={r.label}
                                    style={{
                                        background: selectedRatio === i ? "var(--hsg-green-pale)" : "white",
                                        border: `1px solid ${selectedRatio === i ? "var(--hsg-green)" : "var(--hsg-border)"}`,
                                        borderRadius: 8,
                                        padding: "0.75rem 1rem",
                                    }}
                                >
                                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: selectedRatio === i ? "var(--hsg-green)" : "var(--hsg-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                                        {r.label} · {r.description}
                                    </div>
                                    <div style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "var(--hsg-dark)", marginBottom: 4 }}>
                                        {r.inputW * 100}% × Input + {r.outputW * 100}% × Output
                                    </div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--hsg-muted)" }}>
                                        {i === 0 && "3 input tokens for every 1 output token. Typical for retrieval-augmented generation (RAG), summarisation, and general chat."}
                                        {i === 1 && "Equal input and output volume. Typical for coding agents, where prompts and generated code are similarly sized."}
                                        {i === 2 && "1 input token for every 3 output tokens. Typical for long-form drafting, report generation, and creative writing."}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                            {[
                                {
                                    label: `Avg Cost $/1M (${RATIOS[selectedRatio].label} ratio)`,
                                    value: avgBlended !== null ? fmtCost(avgBlended) : "—",
                                    formula: `${RATIOS[selectedRatio].inputW} × Avg_In + ${RATIOS[selectedRatio].outputW} × Avg_Out`,
                                    detail: `Weighted average using the ${RATIOS[selectedRatio].label} input:output ratio across ${pricedModels.length} priced models`,
                                },
                                {
                                    label: "Avg. Input Price ($/1M tokens)",
                                    value: avgInput !== null ? fmtCost(avgInput) : "—",
                                    formula: `Σ Input₁…${pricedModels.length} ÷ ${pricedModels.length}`,
                                    detail: `Arithmetic mean of input costs across ${pricedModels.length} models with live pricing`,
                                },
                                {
                                    label: "Avg. Output Price ($/1M tokens)",
                                    value: avgOutput !== null ? fmtCost(avgOutput) : "—",
                                    formula: `Σ Output₁…${pricedModels.length} ÷ ${pricedModels.length}`,
                                    detail: `Arithmetic mean of output costs across ${pricedModels.length} models with live pricing`,
                                },
                                {
                                    label: `Avg. ${tabLabel} Score`,
                                    value: avgScore.toFixed(1),
                                    formula: `Σ Score₁…20 ÷ 20`,
                                    detail: "Simple arithmetic mean of all 20 benchmark scores in this index",
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    style={{
                                        background: "white",
                                        border: "1px solid var(--hsg-border)",
                                        borderRadius: 8,
                                        padding: "1rem 1.25rem",
                                    }}
                                >
                                    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--hsg-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                                        {item.label}
                                    </div>
                                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--hsg-green)", marginBottom: 8, lineHeight: 1 }}>
                                        {item.value}
                                    </div>
                                    <div style={{ fontFamily: "monospace", fontSize: "0.78rem", background: "var(--hsg-green-ultra-pale)", color: "var(--hsg-green)", border: "1px solid var(--hsg-green-pale)", borderRadius: 4, padding: "0.3rem 0.6rem", marginBottom: 6, display: "inline-block" }}>
                                        {item.formula}
                                    </div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--hsg-muted)", lineHeight: 1.5 }}>
                                        {item.detail}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: "0.75rem", color: "var(--hsg-muted)", marginTop: "0.75rem", lineHeight: 1.6 }}>
                            Prices are per 1 million tokens as returned by the OpenRouter API (<code style={{ fontFamily: "monospace" }}>pricing.prompt</code> × 10⁶ for input,{" "}
                            <code style={{ fontFamily: "monospace" }}>pricing.completion</code> × 10⁶ for output). Free models ($0) are included in the average. Models without a
                            live price listing are excluded from the price averages.
                        </p>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                @media (max-width: 900px) {
                    .agent-costs-table-header,
                    .agent-costs-table-row {
                        grid-template-columns: 40px 1fr 120px 150px 80px 80px 70px !important;
                    }
                }
                @media (max-width: 700px) {
                    .agent-costs-table-header,
                    .agent-costs-table-row {
                        grid-template-columns: 36px 1fr 100px 130px 70px !important;
                    }
                }
            `}</style>
        </div>
    );
}
