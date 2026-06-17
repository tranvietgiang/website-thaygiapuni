import { ArrowDown, ArrowUp, Headphones, MessageCircle, PhoneCall, X } from 'lucide-react'
import { useState } from 'react'

const campusAddresses = ['Lê Văn Việt, quận 9', 'Đặng Văn Bi, Thủ Đức', 'Làng Đại học']

export default function Footer({ content }) {
  const [isContactOpen, setIsContactOpen] = useState(false)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function scrollToBottom() {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  const quickContacts = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/',
      className: 'text-[#1877f2] ring-white/15 hover:bg-[#1877f2] hover:text-white',
      icon: <span className="text-xl font-black leading-none">f</span>,
    },
    {
      label: 'Zalo',
      href: 'https://zalo.me/',
      className: 'text-[#0068ff] ring-white/15 hover:bg-[#0068ff] hover:text-white',
      icon: <MessageCircle className="h-5 w-5" strokeWidth={2.6} />,
    },
    {
      label: 'Call',
      href: `tel:${content.contact.hotline.replaceAll(' ', '')}`,
      className: 'text-[#e11d2e] ring-white/15 hover:bg-[#e11d2e] hover:text-white',
      icon: <PhoneCall className="h-5 w-5" strokeWidth={2.6} />,
    },
  ]

  return (
    <footer className="bg-[#071b45] px-4 py-14 text-white sm:px-6 lg:px-8" id="contact">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/20 lg:grid-cols-[.8fr_1.2fr] lg:p-8">
          <div>
            <div className="flex items-center gap-4">
              <img
                className="h-16 w-16 rounded-full object-cover ring-2 ring-white/20"
                src="/assets/logo.png"
                alt="Thầy Giáp English"
              />
              <div>
                <p className="text-lg font-black text-white">Thầy Giáp</p>
                <p className="text-sm font-black text-red-300">ENGLISH</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-blue-100">
              {content.footer}
            </p>
            <a
              className="mt-4 inline-flex font-black text-white transition hover:text-red-200"
              href={`tel:${content.contact.hotline.replaceAll(' ', '')}`}
            >
              Hotline: {content.contact.hotline}
            </a>

            <div className="mt-6 max-w-md rounded-2xl border border-white/10 bg-white/10 p-4">
              <h3 className="text-sm font-black uppercase tracking-wide text-blue-100">
                Cơ sở
              </h3>
              <div className="mt-3 grid gap-2">
                {campusAddresses.map((address) => (
                  <div
                    className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#0b3f9c]"
                    key={address}
                  >
                    {address}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 text-slate-900">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              {content.contact.title}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">{content.contact.description}</p>
            <form
              className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                className="h-12 rounded-xl border border-blue-100 bg-blue-50/60 px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                aria-label="Name"
                placeholder="Name"
                type="text"
              />
              <input
                className="h-12 rounded-xl border border-blue-100 bg-blue-50/60 px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                aria-label="Phone"
                placeholder="Phone"
                type="tel"
              />
              <button
                className="h-12 rounded-xl bg-[#e11d2e] px-6 text-sm font-black text-white transition hover:bg-[#c91424]"
                type="submit"
              >
                {content.contact.button}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-blue-100 sm:flex-row sm:items-center sm:justify-between">
          <p>© Thầy Giáp English</p>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">Follow us</span>
            {quickContacts.map((item) => (
              <a
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 transition ${item.className}`}
                href={item.href}
                target={item.label === 'Call' ? undefined : '_blank'}
                rel={item.label === 'Call' ? undefined : 'noreferrer'}
                aria-label={item.label}
                key={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="fixed bottom-5 right-5 z-40 grid justify-items-end gap-3">
          <div className="grid gap-2">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg shadow-blue-950/10 ring-1 ring-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-50"
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.6} />
            </button>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0b3f9c] shadow-lg shadow-blue-950/10 ring-1 ring-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-50"
              type="button"
              onClick={scrollToBottom}
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="h-5 w-5" strokeWidth={2.6} />
            </button>
          </div>

          <div
            className={`grid gap-2 transition-all duration-300 ${
              isContactOpen
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-4 opacity-0'
            }`}
          >
            {quickContacts.map((item) => (
              <a
                className={`group flex h-12 items-center gap-3 rounded-full bg-white px-3 pr-4 font-black shadow-lg shadow-blue-950/10 ring-1 transition hover:-translate-y-0.5 ${item.className}`}
                href={item.href}
                target={item.label === 'Call' ? undefined : '_blank'}
                rel={item.label === 'Call' ? undefined : 'noreferrer'}
                aria-label={item.label}
                key={item.label}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-current/10">
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </div>

          <button
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e11d2e] text-white shadow-xl shadow-slate-950/25 ring-4 ring-white/20 transition hover:-translate-y-0.5"
            type="button"
            onClick={() => setIsContactOpen((current) => !current)}
            aria-label="Toggle contact buttons"
            aria-expanded={isContactOpen}
          >
            {isContactOpen ? <X className="h-6 w-6" /> : <Headphones className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </footer>
  )
}
