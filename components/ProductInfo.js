export default function ProductInfo() {
  return (
    <section className="relative border-t border-fizz-cream/10 bg-fizz-charcoal px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="font-display text-[11px] tracking-[0.42em] text-fizz-gold">
            CHAPTER TWO
          </p>
          <h2 className="mt-4 font-serif text-4xl italic leading-tight text-fizz-cream sm:text-5xl lg:text-6xl">
            Bright citrus. Endless lift.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-fizz-cream/70 sm:text-base">
            ITZ FIZZ is a sparkling citrus pour built for late afternoons and
            louder nights. Cold aluminum. Fine bubbles. A finish that stays
            clean rather than syrupy.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-l border-fizz-cream/10 pl-8">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.28em] text-fizz-cream/40">
              Profile
            </dt>
            <dd className="mt-2 font-serif text-2xl italic text-fizz-cream">
              Bergamot &amp; yuzu
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.28em] text-fizz-cream/40">
              Carbonation
            </dt>
            <dd className="mt-2 font-serif text-2xl italic text-fizz-cream">
              High &amp; fine
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.28em] text-fizz-cream/40">
              Serve
            </dt>
            <dd className="mt-2 font-serif text-2xl italic text-fizz-cream">
              Ice-cold, tall
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.28em] text-fizz-cream/40">
              Edition
            </dt>
            <dd className="mt-2 font-serif text-2xl italic text-fizz-cream">
              No. 01
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
