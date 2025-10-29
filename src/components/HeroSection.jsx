import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative h-[56vh] w-full overflow-hidden rounded-2xl bg-neutral-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/sbYFqA9b8WbqgI6E/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          TEBDASH Chess
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-base text-white/80 sm:text-lg">
          Real-time multiplayer chess with private lobbies, VIP insights, and post‑game analytics.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-white backdrop-blur">
          <span className="text-sm font-medium">Play • Analyze • Improve</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
    </section>
  );
}
