export default function SectionTwo({ content }) {
  return (
    <section
      className="border-y border-blue-100 bg-gradient-to-b from-white to-blue-50 px-4 py-16 sm:px-6 lg:px-8"
      id="results"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="text-sm font-black uppercase tracking-wide text-[#0b3f9c]">
            {content.statsEyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {content.statsTitle}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {content.stats.map((item) => (
            <div
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5"
              key={`${item.value}-${item.label}`}
            >
              <strong className="block text-3xl font-black text-[#0b3f9c]">
                {item.value}
              </strong>
              <span className="mt-3 block text-sm font-semibold leading-6 text-slate-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
