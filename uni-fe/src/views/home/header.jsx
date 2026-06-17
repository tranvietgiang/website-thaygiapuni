export default function Header({ lang, setLang, content }) {
  const navItems = content.nav.slice(0, 4)

  return (
    <header className="sticky top-0 z-30 border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <a className="flex items-center gap-3" href="#top" aria-label="Thầy Giáp English">
          <img
            className="h-14 w-14 rounded-full object-cover ring-1 ring-blue-100"
            src="/assets/logo.png"
            alt="Thầy Giáp English"
          />
          <div className="hidden leading-tight sm:block">
            <p className="text-base font-black text-[#0b3f9c]">Thầy Giáp</p>
            <p className="text-sm font-black text-[#e11d2e]">ENGLISH</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 lg:flex">
          <a className="transition hover:text-[#0b3f9c]" href="#about">
            {lang === 'vi' ? 'Giới thiệu' : 'About'}
          </a>
          {navItems.slice(0, 3).map((item) => (
            <a className="transition hover:text-[#0b3f9c]" href="#programs" key={item}>
              {item}
            </a>
          ))}
          <a className="transition hover:text-[#0b3f9c]" href="#contact">
            {lang === 'vi' ? 'Liên hệ' : 'Contact'}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-blue-100 bg-blue-50 p-1">
            <button
              className={`h-9 rounded-full px-3 text-sm font-black transition ${
                lang === 'vi' ? 'bg-[#0b3f9c] text-white shadow-sm' : 'text-slate-600'
              }`}
              type="button"
              onClick={() => setLang('vi')}
            >
              VI
            </button>
            <button
              className={`h-9 rounded-full px-3 text-sm font-black transition ${
                lang === 'en' ? 'bg-[#0b3f9c] text-white shadow-sm' : 'text-slate-600'
              }`}
              type="button"
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
