export default function LearningPath({ content, goHome }) {
  return (
    <main>
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-[#0b3f9c]">
              Lộ trình học TOEIC
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Học từ mất gốc đến mục tiêu điểm rõ ràng
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Trang này gom riêng toàn bộ lộ trình học để học viên dễ xem mình đang ở đâu,
              cần học gì trước và mục tiêu từng chặng là gì.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#0b3f9c] px-6 text-sm font-black text-white shadow-sm transition hover:bg-[#08327d]"
                type="button"
                onClick={goHome}
              >
                Về trang chủ
              </button>
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#e11d2e] px-6 text-sm font-black text-white transition hover:bg-[#c91424]"
                href="#roadmap"
              >
                Xem các chặng học
              </a>
            </div>
          </div>

          <img
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl shadow-blue-950/10"
            src="/assets/images/buoi-hoc/buoihoc-8.jpg"
            alt="Lộ trình học TOEIC"
          />
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24" id="roadmap">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-sm font-black uppercase tracking-wide text-[#0b3f9c]">
              Roadmap
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {content.programsTitle}
            </h2>
            <p className="mt-4 leading-7 text-slate-600">{content.programsSubtitle}</p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {content.programs.map((program, index) => (
              <article
                className="relative rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5"
                key={program.title}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0b3f9c] text-sm font-black text-white">
                  {index + 1}
                </span>
                <img
                  className="mt-5 h-40 w-full rounded-xl object-cover"
                  src={program.image}
                  alt={program.title}
                />
                <span className="mt-5 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#0b3f9c]">
                  {program.tag}
                </span>
                <h3 className="mt-4 text-xl font-black text-slate-950">{program.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{program.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/70 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {content.stats.map((item) => (
            <div
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5"
              key={`${item.value}-${item.label}`}
            >
              <strong className="block text-3xl font-black text-[#0b3f9c]">{item.value}</strong>
              <span className="mt-3 block text-sm font-semibold leading-6 text-slate-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
