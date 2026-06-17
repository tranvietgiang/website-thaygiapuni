import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
} from "lucide-react";
import { useState } from "react";

export default function SectionThree({ content }) {
  const [activeGallery, setActiveGallery] = useState(0);
  const [activeGalleryPage, setActiveGalleryPage] = useState(0);
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);
  const [activeTestimonialPage, setActiveTestimonialPage] = useState(0);
  const [hoveredTestimonial, setHoveredTestimonial] = useState(0);
  const galleries = content.galleries || [];
  const currentGallery = galleries[activeGallery] || galleries[0];
  const currentGalleryImages = currentGallery?.images || [];
  const totalGalleryPages = Math.ceil(currentGalleryImages.length / 4);
  const visibleGalleryImages = currentGalleryImages.slice(
    activeGalleryPage * 4,
    activeGalleryPage * 4 + 4,
  );
  const testimonialImages = [
    "/assets/images/result-sv-aim/sv-2.jpg",
    "/assets/images/result-sv-aim/sv-3.jpg",
    "/assets/images/result-sv-aim/sv-4.jpg",
    "/assets/images/result-sv-aim/sv-5.jpg",
    "/assets/images/result-sv-aim/sv-6.jpg",
    "/assets/images/result-sv-aim/sv-7.jpg",
  ];
  const fallbackTestimonials = [
    {
      name: "Hoàng Phúc",
      role: "Sinh viên năm 2",
      quote: "Mình học lại từ nền tảng nên dễ theo, phần chữa bài rất kỹ.",
      result: "TOEIC 585",
      image: "/assets/images/result-sv-aim/sv-5.jpg",
    },
    {
      name: "Bảo Trân",
      role: "Sinh viên năm cuối",
      quote:
        "Lộ trình rõ, học tới đâu có bài kiểm tra tới đó nên mình biết mình tiến bộ thật.",
      result: "TOEIC 650",
      image: "/assets/images/result-sv-aim/sv-6.jpg",
    },
    {
      name: "Anh Tú",
      role: "Người đi làm",
      quote:
        "Lớp học gọn, bài tập vừa sức và giáo viên sửa lỗi cá nhân rất sát.",
      result: "+180 điểm",
      image: "/assets/images/result-sv-aim/sv-7.jpg",
    },
  ];
  const testimonials = [
    ...(content.testimonials || []),
    ...fallbackTestimonials,
  ];
  const totalTestimonialPages = Math.ceil(testimonials.length / 4);
  const visibleTestimonials = testimonials.slice(
    activeTestimonialPage * 4,
    activeTestimonialPage * 4 + 4,
  );

  function goPrevGalleryPage() {
    if (totalGalleryPages <= 1) return;
    setActiveGalleryPage(
      (current) => (current - 1 + totalGalleryPages) % totalGalleryPages,
    );
  }

  function goNextGalleryPage() {
    if (totalGalleryPages <= 1) return;
    setActiveGalleryPage((current) => (current + 1) % totalGalleryPages);
  }

  function goPrevLightboxImage() {
    if (activeLightboxImage === null || !currentGalleryImages.length) return;
    setActiveLightboxImage(
      (current) =>
        (current - 1 + currentGalleryImages.length) %
        currentGalleryImages.length,
    );
  }

  function goNextLightboxImage() {
    if (activeLightboxImage === null || !currentGalleryImages.length) return;
    setActiveLightboxImage(
      (current) => (current + 1) % currentGalleryImages.length,
    );
  }

  function goPrevTestimonial() {
    if (totalTestimonialPages <= 1) return;
    setActiveTestimonialPage(
      (current) =>
        (current - 1 + totalTestimonialPages) % totalTestimonialPages,
    );
  }

  function goNextTestimonial() {
    if (totalTestimonialPages <= 1) return;
    setActiveTestimonialPage(
      (current) => (current + 1) % totalTestimonialPages,
    );
  }

  return (
    <>
      <section
        className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        id="programs"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-sm font-black uppercase tracking-wide text-[#0b3f9c]">
              Programs
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {content.programsTitle}
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              {content.programsSubtitle}
            </p>
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
                  <h3 className="mt-4 text-xl font-black text-slate-950">
                    {program.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {program.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/70 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto flex max-w-4xl flex-col gap-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <span className="text-sm font-black uppercase tracking-wide text-[#0b3f9c]">
                {content.testimonialsEyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {content.testimonialsTitle}
              </h2>
            </div>
          </div>

          <div className="relative mt-10">
            {totalTestimonialPages > 1 ? (
              <>
                <button
                  className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg shadow-blue-950/10 ring-1 ring-blue-100 transition hover:bg-blue-50 max-sm:left-4 max-sm:translate-x-0"
                  type="button"
                  onClick={goPrevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2.6} />
                </button>
                <button
                  className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg shadow-blue-950/10 ring-1 ring-blue-100 transition hover:bg-blue-50 max-sm:right-4 max-sm:translate-x-0"
                  type="button"
                  onClick={goNextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2.6} />
                </button>
              </>
            ) : null}

            <div className="flex h-[520px] gap-4 overflow-hidden max-lg:grid max-lg:h-auto max-lg:grid-cols-2 max-sm:grid-cols-1">
              {visibleTestimonials.map((item, index) => (
                <article
                  className={`group relative min-w-0 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm shadow-blue-950/5 transition-all duration-500 ease-out max-lg:h-[420px] ${
                    hoveredTestimonial === index
                      ? "flex-[2.15]"
                      : "flex-[.9]"
                  }`}
                  key={`${item.name}-${activeTestimonialPage}-${index}`}
                  onMouseEnter={() => setHoveredTestimonial(index)}
                  onFocus={() => setHoveredTestimonial(index)}
                  tabIndex={0}
                >
                  <img
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                    src={
                      item.image ||
                      testimonialImages[
                        (activeTestimonialPage * 4 + index) %
                          testimonialImages.length
                      ]
                    }
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#0b3f9c]">
                        {item.result}
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                        {item.role}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-black leading-tight drop-shadow-sm">
                      {item.name}
                    </h3>
                    <p
                      className={`mt-3 text-sm font-semibold leading-6 text-blue-50 transition-all duration-500 ${
                        hoveredTestimonial === index
                          ? "line-clamp-4 opacity-100"
                          : "line-clamp-2 opacity-90"
                      }`}
                    >
                      "{item.quote}"
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {totalTestimonialPages > 1 ? (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalTestimonialPages }).map((_, index) => (
                <button
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeTestimonialPage
                      ? "w-8 bg-[#0b3f9c]"
                      : "w-2.5 bg-blue-200"
                  }`}
                  type="button"
                  onClick={() => setActiveTestimonialPage(index)}
                  aria-label={`Open testimonial group ${index + 1}`}
                  key={index}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-wide text-[#0b3f9c]">
              {content.galleryEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {content.galleryTitle}
            </h2>
          </div>

          {currentGallery ? (
            <article className="relative mt-10 overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/60 p-4 shadow-sm shadow-blue-950/5">
              <div className="mb-5 flex flex-col gap-4">
                <div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-950">
                      {currentGallery.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                      {currentGallery.description}
                    </p>
                  </div>
                </div>

                <div
                  className="flex gap-2 overflow-x-auto rounded-2xl bg-white p-2"
                  role="tablist"
                >
                  {galleries.map((group, index) => (
                    <button
                      className={`h-11 shrink-0 rounded-xl px-4 text-sm font-black transition ${
                        index === activeGallery
                          ? "bg-[#0b3f9c] text-white shadow-sm"
                          : "bg-blue-50 text-slate-600 hover:bg-blue-100"
                      }`}
                      type="button"
                      role="tab"
                      aria-selected={index === activeGallery}
                      key={group.title}
                      onClick={() => {
                        setActiveGallery(index);
                        setActiveGalleryPage(0);
                      }}
                    >
                      {group.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                {totalGalleryPages > 1 ? (
                  <>
                    <button
                      className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg shadow-blue-950/10 ring-1 ring-blue-100 transition hover:bg-blue-50 max-sm:left-3 max-sm:translate-x-0"
                      type="button"
                      onClick={goPrevGalleryPage}
                      aria-label="Previous images"
                    >
                      <ChevronLeft className="h-5 w-5" strokeWidth={2.6} />
                    </button>
                    <button
                      className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg shadow-blue-950/10 ring-1 ring-blue-100 transition hover:bg-blue-50 max-sm:right-3 max-sm:translate-x-0"
                      type="button"
                      onClick={goNextGalleryPage}
                      aria-label="Next images"
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={2.6} />
                    </button>
                  </>
                ) : null}

                <div className="grid gap-3 md:grid-cols-4">
                  {visibleGalleryImages.map((image, index) => (
                    <button
                      className={`group overflow-hidden rounded-2xl bg-white text-left ${
                        index === 0 ? "md:col-span-2" : ""
                      }`}
                      type="button"
                      onClick={() =>
                        setActiveLightboxImage(activeGalleryPage * 4 + index)
                      }
                      key={image}
                      aria-label={`Open ${currentGallery.title} ${activeGalleryPage * 4 + index + 1}`}
                    >
                      <img
                        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105 md:h-72"
                        src={image}
                        alt={`${currentGallery.title} ${activeGalleryPage * 4 + index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {totalGalleryPages > 1 ? (
                <div className="mt-5 flex justify-center gap-2">
                  {Array.from({ length: totalGalleryPages }).map((_, index) => (
                    <button
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeGalleryPage
                          ? "w-8 bg-[#0b3f9c]"
                          : "w-2.5 bg-blue-200"
                      }`}
                      type="button"
                      onClick={() => setActiveGalleryPage(index)}
                      aria-label={`Open image group ${index + 1}`}
                      key={index}
                    />
                  ))}
                </div>
              ) : null}
            </article>
          ) : null}
        </div>
      </section>

      {activeLightboxImage !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4">
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition hover:bg-blue-50"
            type="button"
            onClick={() => setActiveLightboxImage(null)}
            aria-label="Close image"
          >
            <X className="h-5 w-5" strokeWidth={2.6} />
          </button>

          {currentGalleryImages.length > 1 ? (
            <>
              <button
                className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg transition hover:bg-blue-50"
                type="button"
                onClick={goPrevLightboxImage}
                aria-label="Previous large image"
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={2.6} />
              </button>
              <button
                className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg transition hover:bg-blue-50"
                type="button"
                onClick={goNextLightboxImage}
                aria-label="Next large image"
              >
                <ChevronRight className="h-6 w-6" strokeWidth={2.6} />
              </button>
              <button
                className="absolute left-1/2 top-5 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg transition hover:bg-blue-50"
                type="button"
                onClick={goPrevLightboxImage}
                aria-label="Previous large image from top"
              >
                <ChevronUp className="h-6 w-6" strokeWidth={2.6} />
              </button>
              <button
                className="absolute bottom-5 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg transition hover:bg-blue-50"
                type="button"
                onClick={goNextLightboxImage}
                aria-label="Next large image from bottom"
              >
                <ChevronDown className="h-6 w-6" strokeWidth={2.6} />
              </button>
            </>
          ) : null}

          <div className="max-h-[88vh] max-w-6xl overflow-hidden rounded-3xl bg-white p-2 shadow-2xl">
            <img
              className="max-h-[84vh] w-full rounded-2xl object-contain"
              src={currentGalleryImages[activeLightboxImage]}
              alt={`${currentGallery.title} ${activeLightboxImage + 1}`}
            />
          </div>
        </div>
      ) : null}

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
                  <div
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-100"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {content.teachers.map((teacher) => (
                <article
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm"
                  key={teacher.name}
                >
                  <div className="flex gap-4">
                    <img
                      className="h-24 w-24 shrink-0 rounded-xl object-cover object-top"
                      src={teacher.image}
                      alt={teacher.name}
                    />
                    <div>
                      <p className="text-sm font-semibold text-blue-200">
                        {teacher.role}
                      </p>
                      <h3 className="mt-1 font-black">{teacher.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {teacher.school}
                      </p>
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
  );
}
