"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDictionary } from "@/i18n/LocaleProvider";

const SEEN_KEY = "spiora-intro-seen";
const FADE_MS = 600;

/**
 * Runs before the page paints: hides the intro for visitors who already saw it
 * in this browser session or who prefer reduced motion, so the site never
 * flashes the overlay for them.
 */
export const introGateScript = `(function(){try{var h=document.documentElement;if(sessionStorage.getItem("${SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){h.classList.add("intro-done");}else{h.classList.add("intro-active");}}catch(e){document.documentElement.classList.add("intro-done");}})();`;

type Phase = "playing" | "leaving" | "gone";

export function IntroSplash() {
  const { copy } = useDictionary();
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<Phase>("playing");
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Private mode: the intro may show again next time, which is fine.
    }
    videoRef.current?.pause();
    setPhase((current) => (current === "playing" ? "leaving" : current));
  }, []);

  // Decide on the client whether this visit gets the intro.
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("intro-done")) {
      setPhase("gone");
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const start = () => {
      if (cancelled || document.hidden) return;
      video.play().catch((error: unknown) => {
        // Autoplay forbidden even when muted (e.g. low-power mode): go straight to the site.
        if (error instanceof DOMException && error.name === "NotAllowedError") finish();
        // Anything else (a background tab pausing media) is retried when the tab is shown.
      });
    };
    start();
    document.addEventListener("visibilitychange", start);
    skipRef.current?.focus({ preventScroll: true });
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", start);
    };
  }, [finish]);

  // Esc skips the intro. Page scroll is locked by html.intro-active in CSS.
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => {
      setPhase("gone");
      const root = document.documentElement;
      root.classList.remove("intro-active");
      root.classList.add("intro-done");
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "gone") return null;

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    if (!video.muted && video.volume === 0) video.volume = 1;
    setMuted(video.muted);
  }

  return (
    <div
      className={phase === "leaving" ? "intro is-leaving" : "intro"}
      role="dialog"
      aria-modal="true"
      aria-label={copy.ui.introLabel}
    >
      <video
        ref={videoRef}
        className="intro-video"
        src="/intro/spiora-intro.mp4"
        poster="/intro/spiora-intro-poster.jpg"
        muted
        playsInline
        preload="auto"
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (video.duration) setProgress(video.currentTime / video.duration);
        }}
        onEnded={finish}
        onError={finish}
      />

      <div className="intro-controls">
        <button type="button" className="intro-sound" onClick={toggleSound} aria-pressed={!muted}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z" />
            {muted ? (
              <path
                d="M16.5 9.5l5 5m0-5l-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </svg>
          {muted ? copy.ui.introSoundOn : copy.ui.introSoundOff}
        </button>

        <button ref={skipRef} type="button" className="intro-skip" onClick={finish}>
          {copy.ui.introSkip}
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="intro-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
