"use client";

export default function ProductCan({ className = "" }) {
  return (
    <div className={`relative ${className}`} aria-hidden="false">
      <div className="absolute left-1/2 top-[88%] h-8 w-[58%] -translate-x-1/2 rounded-[100%] bg-black/45 blur-xl" />
      <img
        src="/images/fizz-can.svg"
        alt="ITZ FIZZ sparkling citrus can"
        width={360}
        height={720}
        className="relative z-10 mx-auto h-auto w-full max-w-[220px] drop-shadow-[0_28px_40px_rgba(0,0,0,0.45)] sm:max-w-[260px] lg:max-w-[300px]"
      />
    </div>
  );
}
