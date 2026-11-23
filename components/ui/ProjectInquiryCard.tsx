
"use client";

import { useRef } from "react";
import styles from "./ProjectInquiryCard.module.css";

export function ProjectInquiryCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onPointerMove={handlePointerMove}
    >
      {/* Cursor-following glow */}
      <div className={styles.cursorGlow} />

      {/* Shine */}
      <div className={styles.shine} />

      {/* Animated background tiles */}
      <div className={styles.background}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`${styles.tile} ${styles[`tile${index + 1}`]}`}
          />
        ))}
      </div>

      {/* Decorative border lines */}
      <div className={`${styles.line} ${styles.lineTop}`} />
      <div className={`${styles.line} ${styles.lineRight}`} />
      <div className={`${styles.line} ${styles.lineBottom}`} />
      <div className={`${styles.line} ${styles.lineLeft}`} />

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          PROJECT INQUIRY
          <span className={styles.dot} />
        </span>

        <h2>
          Tell me about
          <br />
          your <span>project.</span>
        </h2>

        <p>
          Have an idea in mind? Let&apos;s work together
          and turn it into something meaningful.
        </p>

        <a href="/contact" className={styles.button}>
          START A PROJECT
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
