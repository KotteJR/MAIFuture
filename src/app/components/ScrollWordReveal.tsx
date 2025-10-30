'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type ScrollWordRevealProps = {
  text: string;
  className?: string;
  /**
   * Optional: duration in ms for color transition per word
   */
  transitionMs?: number;
};

/**
 * Splits text into words and reveals each word from gray (#888) to black (#000)
 * progressively as the user scrolls the paragraph through the viewport.
 */
export default function ScrollWordReveal({
  text,
  className,
  transitionMs = 600,
}: ScrollWordRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..1 how much of the block has scrolled through the viewport

  // Support paragraph breaks via double newlines. Compute a flat list of words
  // and track paragraph end indexes to render spacing between paragraphs.
  const { words, paragraphEndIndexes } = useMemo((): { words: string[]; paragraphEndIndexes: number[] } => {
    const paragraphs = text
      .replace(/\r\n/g, "\n")
      .trim()
      .split(/\n\s*\n/g)
      .filter((p) => p.length > 0);

    const flatWords: string[] = [];
    const ends: number[] = [];

    for (let i = 0; i < paragraphs.length; i++) {
      const pWords = paragraphs[i].trim().split(/\s+/g);
      for (const w of pWords) flatWords.push(w);
      ends.push(flatWords.length - 1);
    }

    return { words: flatWords, paragraphEndIndexes: ends };
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rAF = 0;
    const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: when paragraph top hits bottom of viewport => 0
      // when paragraph bottom hits top of viewport => 1
      const total = rect.height + vh;
      const advanced = vh - rect.top; // px progressed through the section
      const p = clamp(advanced / total);
      setProgress(p);
      rAF = 0;
    };

    const onScroll = () => {
      if (rAF) return;
      rAF = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (rAF) cancelAnimationFrame(rAF);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Determine how many words should be fully revealed based on progress.
  // Use a small start delay and an ease-in-out curve so the beginning feels calm
  // and readability ramps up smoothly, still finishing a bit earlier overall.
  const startDelay = 0.06; // delay revealing until ~6% scroll progress
  const normalized = Math.max(0, (progress - startDelay) / (1 - startDelay));
  // easeInOutCubic
  const eased = normalized < 0.5
    ? 4 * normalized * normalized * normalized
    : 1 - Math.pow(-2 * normalized + 2, 3) / 2;
  const bias = 0.01; // tiny bias to complete slightly earlier
  const revealFraction = Math.min(1, eased + bias);
  const revealCount = Math.ceil(revealFraction * words.length);

  return (
    <div ref={containerRef} className={className} style={{ lineHeight: 2 }}>
      {words.map((w, i) => {
        const revealed = i < revealCount;
        const isParagraphEnd = paragraphEndIndexes.includes(i);
        return (
          <span key={`w-${i}`}>
            <span
              style={{
                color: revealed ? '#444' : '#f3f4f6',
                transition: `color ${transitionMs}ms ease`,
                willChange: 'color',
              }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </span>
            {isParagraphEnd && i < words.length - 1 ? (
              <span style={{ display: 'block', height: '1.25rem' }} />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}


