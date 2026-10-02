import { DoodleArrow, PaperCard, Pin, Reveal, SectionHead, TornBottom, TornTop } from "./paper";

const steps = [
  {
    n: "01",
    title: "Pin your brief",
    copy: "Describe the work in plain words. Two minutes, no jargon, no 40-field form.",
  },
  {
    n: "02",
    title: "Meet your matches",
    copy: "Hand-picked verified freelancers answer. Compare real portfolios, chat directly.",
  },
  {
    n: "03",
    title: "Seal it in escrow",
    copy: "Your payment waits in a sealed envelope. The freelancer sees it's real — and starts.",
  },
  {
    n: "04",
    title: "Stamp it approved",
    copy: "Love it? Slam approve and the money releases. Not yet? Revisions first — money stays sealed.",
  },
];

export default function How() {
  return (
    <section id="how" aria-label="How Foontro works" className="relative bg-paper">
      <TornTop className="text-paper-2" />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20">
        <SectionHead
          eyebrow="How it works"
          title={
            <>
              From brief to <em className="font-medium">paid</em> in four folds.
            </>
          }
          lede="No bidding wars, no ghosting, no 'please release the payment' DMs. Just a clean paper trail from hello to paid."
        />

        <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <Reveal delay={i * 0.09}>
                <PaperCard tilt={i % 2 ? "1.2deg" : "-1.2deg"} className="h-full p-6">
                  <div className="flex items-start justify-between">
                    <span className="tnum font-display text-[2.2rem] font-black text-line">
                      {s.n}
                    </span>
                    <Pin className="-mt-8" />
                  </div>
                  <h3 className="mt-2 font-display text-[1.35rem] font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{s.copy}</p>
                </PaperCard>
              </Reveal>
              {i < steps.length - 1 && (
                <DoodleArrow
                  flip={i % 2 === 1}
                  className="absolute -right-4 top-1/2 z-10 hidden w-16 -translate-y-1/2 lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <TornBottom className="text-ink" />
    </section>
  );
}
