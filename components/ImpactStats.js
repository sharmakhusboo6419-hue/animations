"use client";

const STATS = [
  { value: "95%", label: "Refreshing taste" },
  { value: "87%", label: "Loved by fizz fans" },
  { value: "100%", label: "Made for good vibes" },
];

export default function ImpactStats() {
  return (
    <ul className="stat-row mt-10 grid w-full max-w-xl grid-cols-1 gap-6 border-t border-fizz-cream/15 pt-8 sm:max-w-2xl sm:grid-cols-3 sm:gap-8">
      {STATS.map((stat) => (
        <li key={stat.label} className="stat-item">
          <p className="font-display text-4xl font-medium tracking-[0.12em] text-fizz-cream sm:text-5xl">
            {stat.value}
          </p>
          <p className="mt-2 max-w-[11rem] text-xs uppercase tracking-[0.22em] text-fizz-cream/55">
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
