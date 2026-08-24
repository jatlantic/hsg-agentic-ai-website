"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const HSG_VIDEO_URL =
    "https://www.unisg.ch/fileadmin/user_upload/HSG_ROOT/_Kernauftritt_HSG/Universitaet/AU-01814_UniSG_Luftaufnahmen_Sommer_WEBPage_HD_002.mp4";

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleVideo = () => {
        if (!videoRef.current) return;
        if (playing) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setPlaying(!playing);
    };

    return (
        <section className="hero">
            {/* Background video — only rendered client-side to avoid SSR hydration mismatch */}
            {mounted && (
                <>
                    <video
                        ref={videoRef}
                        className="hero-video"
                        src={HSG_VIDEO_URL}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                    />
                    <div className="hero-video-overlay" />
                    <button
                        onClick={toggleVideo}
                        className="hero-video-toggle"
                        aria-label={playing ? "Pause background video" : "Play background video"}
                        title={playing ? "Pause video" : "Play video"}
                    >
                        {playing ? "⏸" : "▶"}
                    </button>
                </>
            )}

            <div className="container">
                <div className="hero-content">
                    <div className="hero-tag">
                        <span className="hero-tag-dot" />
                        University of St.Gallen · Agentic AI Research Initiative
                    </div>

                    <h1 className="hero-title">
                        The Next Frontier: <br />
                        <em>Agentic AI</em> for Business
                    </h1>

                    <p className="hero-subtitle">
                        The Agentic AI knowledge platform of the Institute of Technology Management, University of St. Gallen — practical, research-backed
                        expertise to help you orchestrate autonomous AI for real business value.
                    </p>

                    <div className="hero-actions">
                        <Link
                            href="/ai-foundations"
                            className="btn"
                            id="hero-cta-primary"
                            style={{
                                background: "white",
                                color: "var(--hsg-green)",
                                border: "2px solid white",
                                fontWeight: 700,
                                padding: "1rem 2.25rem",
                                borderRadius: "4px",
                            }}
                        >
                            Explore AI Foundations →
                        </Link>
                        <Link href="/anwendungen" className="btn btn-outline-white" id="hero-cta-secondary">
                            View Use Cases
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div>
                            <div className="hero-stat-value">50+</div>
                            <div className="hero-stat-label">AI Use Cases</div>
                        </div>
                        <div>
                            <div className="hero-stat-value">1,200+</div>
                            <div className="hero-stat-label">Businesses Reached</div>
                        </div>
                        <div>
                            <div className="hero-stat-value">ITEM</div>
                            <div className="hero-stat-label">Backed Research</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
