import { useState } from 'react'

export default function Footer({ content }) {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <footer className="bg-white px-4 py-14 sm:px-6 lg:px-8" id="contact">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-[28px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm shadow-blue-950/5 lg:grid-cols-[.8fr_1.2fr] lg:p-8">
          <div>
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 rounded-full object-cover ring-1 ring-blue-100"
                src="/assets/logo.png"
                alt="Thầy Giáp English"
              />
              <div>
                <p className="text-lg font-black text-[#0b3f9c]">Thầy Giáp</p>
                <p className="text-sm font-black text-[#e11d2e]">ENGLISH</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-slate-600">
              {content.footer}
            </p>
            <a
              className="mt-4 inline-flex font-black text-[#0b3f9c]"
              href={`tel:${content.contact.hotline.replaceAll(' ', '')}`}
            >
              Hotline: {content.contact.hotline}
            </a>
          </div>

          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              {content.contact.title}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">{content.contact.description}</p>
            <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]" onSubmit={(event) => event.preventDefault()}>
              <input className="h-12 rounded-xl border border-blue-100 bg-white px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50" aria-label="Name" placeholder="Name" type="text" />
              <input className="h-12 rounded-xl border border-blue-100 bg-white px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50" aria-label="Phone" placeholder="Phone" type="tel" />
              <button className="h-12 rounded-xl bg-[#e11d2e] px-6 text-sm font-black text-white transition hover:bg-[#c91424]" type="submit">
                {content.contact.button}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-blue-100 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© Thầy Giáp English</p>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">Follow us</span>
            <span className="h-8 w-8 rounded-full bg-blue-50" />
            <span className="h-8 w-8 rounded-full bg-red-50" />
            <span className="h-8 w-8 rounded-full bg-blue-50" />
          </div>
        </div>

        <div className="fixed bottom-5 right-5 z-40 grid justify-items-end gap-3">
          <div
            className={`grid gap-3 transition-all duration-300 ${
              isContactOpen
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-4 opacity-0'
            }`}
          >
            <a
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877f2] text-lg font-black text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0068ff] text-xs font-black text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5"
              href="https://zalo.me/"
              target="_blank"
              rel="noreferrer"
              aria-label="Zalo"
            >
              Zalo
            </a>
            <a
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e11d2e] text-xs font-black text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5"
              href={`tel:${content.contact.hotline.replaceAll(' ', '')}`}
              aria-label="Phone"
            >
              Call
            </a>
          </div>

          <button
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0b3f9c] text-xl font-black text-white shadow-xl shadow-blue-950/25 transition hover:-translate-y-0.5"
            type="button"
            onClick={() => setIsContactOpen((current) => !current)}
            aria-label="Toggle contact buttons"
            aria-expanded={isContactOpen}
          >
            {isContactOpen ? '×' : '☎'}
          </button>
        </div>
      </div>
    </footer>
  )
}
