export default function SectionThree({ content }) {
  const testimonialImages = [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
  ]

  return (
    <>
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24" id="programs">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-sm font-black uppercase tracking-wide text-[#0b3f9c]">
              Programs
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {content.programsTitle}
            </h2>
            <p className="mt-4 leading-7 text-slate-600">{content.programsSubtitle}</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.programs.map((program) => (
              <article
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm shadow-blue-950/5 transition hover:-translate-y-1 hover:shadow-lg"
                key={program.title}
              >
                <img
                  className="h-52 w-full object-cover"
                  src={program.image}
                  alt={program.title}
                />
                <div className="p-5">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#0b3f9c]">
                    {program.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-black text-slate-950">{program.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{program.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/70 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-wide text-[#0b3f9c]">
              {content.testimonialsEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {content.testimonialsTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {(content.testimonials || []).map((item, index) => (
              <article
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm shadow-blue-950/5"
                key={item.name}
              >
                <img
                  className="h-48 w-full object-cover object-center"
                  src={item.image || testimonialImages[index % testimonialImages.length]}
                  alt={item.name}
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-black text-slate-950">{item.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{item.role}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#0b3f9c]">
                      {item.result}
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">"{item.quote}"</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-[#0b3f9c]">
                {content.galleryEyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {content.galleryTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600 lg:justify-self-end">
              Những khoảnh khắc thật từ lớp học, kết quả học viên và các chương trình khai giảng được gom thành từng mảng ảnh lớn để dễ xem hơn.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {(content.galleries || []).map((group, groupIndex) => (
              <article
                className={`grid gap-5 rounded-[32px] border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-4 shadow-sm shadow-blue-950/5 lg:grid-cols-[1.25fr_0.75fr] lg:p-5 ${
                  groupIndex % 2 === 1 ? 'lg:grid-cols-[0.75fr_1.25fr]' : ''
                }`}
                key={group.title}
              >
                <div className={`${groupIndex % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    className="h-[280px] w-full rounded-[24px] object-cover shadow-lg shadow-blue-950/10 sm:h-[360px] lg:h-[430px]"
                    src={group.images[0]}
                    alt={group.title}
                  />
                </div>

                <div className="grid content-between gap-5">
                  <div className="rounded-[24px] bg-white p-6 shadow-sm">
                    <span className="text-xs font-black uppercase tracking-wide text-[#e11d2e]">
                      Album {String(groupIndex + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 text-2xl font-black text-slate-950">{group.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{group.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {group.images.slice(1, 4).map((image, index) => (
                      <img
                        className={`h-28 w-full rounded-2xl object-cover shadow-sm sm:h-36 ${
                          index === 1 ? 'translate-y-4' : ''
                        }`}
                        src={image}
                        alt={`${group.title} ${index + 2}`}
                        key={image}
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071b45] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-blue-200">
                {content.teachersEyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {content.teachersTitle}
              </h2>
              <div className="mt-6 grid gap-3">
                {content.highlights.map((item) => (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-100" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {content.teachers.map((teacher) => (
                <article className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm" key={teacher.name}>
                  <div className="flex gap-4">
                    <img
                      className="h-24 w-24 shrink-0 rounded-xl object-cover object-top"
                      src={teacher.image}
                      alt={teacher.name}
                    />
                    <div>
                      <p className="text-sm font-semibold text-blue-200">{teacher.role}</p>
                      <h3 className="mt-1 font-black">{teacher.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{teacher.school}</p>
                      <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-[#0b3f9c]">
                        {teacher.score}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
