import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
export default function SectionOne({ content }) {
  const isVi = content.contact.button === "Nhận tư vấn";
  const slides = useMemo(
    () => [
      {
        image: "/assets/banner.jpg",
        badge: isVi ? "Hành trình 9 năm" : "9-year journey",
        title: isVi
          ? "Đồng hành cùng hàng triệu học viên luyện thi Tiếng Anh"
          : "Supporting learners on their English test journey",
        description: isVi
          ? "Nền tảng luyện TOEIC dành cho sinh viên và người đi làm, bắt đầu từ mất gốc đến mục tiêu điểm rõ ràng."
          : "TOEIC learning for students and working adults, from zero foundation to clear score goals.",
      },
      {
        image: content.hero.image,
        badge: isVi ? "TOEIC từ mất gốc" : "TOEIC from zero",
        title: content.hero.title,
        description: content.hero.description,
      },
      {
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
        badge: isVi ? "Lớp nhỏ, theo sát" : "Small focused classes",
        title: isVi
          ? "Có test đầu vào và lộ trình riêng cho từng mục tiêu"
          : "Placement test and a pathway for every score goal",
        description: isVi
          ? "Chọn lộ trình 450+, 550+, 650+ hoặc 750+ theo thời gian học, nền tảng hiện tại và mục tiêu công việc."
          : "Choose a 450+, 550+, 650+, or 750+ roadmap based on your timeline and current level.",
      },
    ],
    [content.hero.description, content.hero.image, content.hero.title, isVi],
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  function goPrev() {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }

  function goNext() {
    setActive((current) => (current + 1) % slides.length);
  }

  const currentSlide = slides[active];

  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-xl shadow-blue-950/10">
          <div className="relative min-h-[420px] lg:min-h-[560px]">
            {slides.map((slide, index) => (
              <img
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
                src={slide.image}
                alt=""
                key={slide.image}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071b45]/85 via-[#0b3f9c]/45 to-transparent" />

            <div className="relative z-10 flex min-h-[420px] max-w-3xl flex-col justify-center p-6 sm:p-10 lg:min-h-[560px] lg:p-14">
              <span className="w-fit rounded-full bg-white/95 px-4 py-2 text-sm font-black text-[#0b3f9c] shadow-sm">
                {currentSlide.badge}
              </span>
              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {currentSlide.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-blue-50 sm:text-lg">
                {currentSlide.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#e11d2e] px-7 text-sm font-black text-white transition hover:bg-[#c91424]"
                  href="#contact"
                >
                  {isVi ? "Đăng ký test miễn phí" : "Book free test"}
                </a>
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-black text-[#0b3f9c] transition hover:bg-blue-50"
                  href="#programs"
                >
                  {isVi ? "Xem lộ trình TOEIC" : "View TOEIC pathway"}
                </a>
              </div>
            </div>

            <button
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-black text-[#0b3f9c] shadow-lg transition hover:bg-white"
              type="button"
              onClick={goPrev}
              aria-label="Previous banner"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2.6} />
            </button>
            <button
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-black text-[#0b3f9c] shadow-lg transition hover:bg-white"
              type="button"
              onClick={goNext}
              aria-label="Next banner"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2.6} />
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((slide, index) => (
                <button
                  className={`h-2.5 rounded-full transition-all ${
                    index === active ? "w-8 bg-white" : "w-2.5 bg-white/55"
                  }`}
                  key={slide.image}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white" id="about">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-[#0b3f9c]">
              {content.hero.eyebrow}
            </span>
            <h2 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              {content.hero.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {content.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#0b3f9c] px-6 text-sm font-black text-white shadow-sm transition hover:bg-[#08327d]"
                href="#programs"
              >
                {content.hero.primaryCta}
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-full border border-blue-100 px-6 text-sm font-black text-[#0b3f9c] transition hover:bg-blue-50"
                href="#contact"
              >
                {content.hero.secondaryCta}
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-3 sm:grid-cols-[1fr_1fr_auto]">
              <select className="h-11 rounded-xl border border-blue-100 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-blue-300">
                <option>{isVi ? "Mục tiêu điểm" : "Score goal"}</option>
                <option>450+</option>
                <option>550+</option>
                <option>650+</option>
                <option>750+</option>
              </select>
              <select className="h-11 rounded-xl border border-blue-100 bg-white px-3 text-sm font-bold text-slate-700 outline-none focus:border-blue-300">
                <option>{isVi ? "Chọn khóa học" : "Program"}</option>
                {content.programs.map((program) => (
                  <option key={program.title}>{program.title}</option>
                ))}
              </select>
              <button className="h-11 rounded-xl bg-[#e11d2e] px-5 text-sm font-black text-white transition hover:bg-[#c91424]">
                {isVi ? "Tư vấn" : "Consult"}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-blue-100 to-red-50" />
            <img
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl shadow-blue-950/10"
              src={content.hero.image}
              alt={content.hero.title}
            />
          </div>
        </div>
      </section>
    </>
  );
}
