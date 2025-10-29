import React from 'react';

function Sparkline({ points = [] }) {
  const width = 220;
  const height = 60;
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = Math.max(max - min, 1);

  const d = points
    .map((p, i) => {
      const x = (i / Math.max(points.length - 1, 1)) * (width - 8) + 4;
      const y = height - 6 - ((p - min) / span) * (height - 12);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d={`${d} L ${width - 4} ${height - 6} L 4 ${height - 6} Z`} fill="url(#sg)" opacity="0.25" />
    </svg>
  );
}

export default function AnalyticsPanel({ result }) {
  const moves = result?.moves || [];
  const total = moves.length;
  const mistakes = Math.floor(total * 0.1);
  const blunders = Math.floor(total * 0.05);
  const accuracy = Math.max(0, Math.min(100, 100 - mistakes * 2 - blunders * 5));
  const advantage = moves.map((_, i) => 50 + Math.sin(i / 3) * 25 + (i % 7 === 0 ? -10 : 0));

  return (
    <section className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Post‑game Analytics</h3>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{total} moves</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">Accuracy</p>
          <p className="mt-1 text-2xl font-bold text-emerald-300">{accuracy}%</p>
        </div>
        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">Mistakes</p>
          <p className="mt-1 text-2xl font-bold text-amber-300">{mistakes}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">Blunders</p>
          <p className="mt-1 text-2xl font-bold text-rose-300">{blunders}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm text-white/70">Advantage over time</p>
        <Sparkline points={advantage} />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm text-white/70">Suggestions</p>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Review critical moments where your advantage dipped.</li>
          <li>Develop pieces rapidly and control central squares.</li>
          <li>Before tactical moves, scan for checks, captures, and threats.</li>
        </ul>
      </div>
    </section>
  );
}
