export default function Header({ lang, setLang, content, navigate, route = '/' }) {
  function goHome(hash) {
    if (route !== '/') {
      navigate('/')
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
      return
    }

    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }

  function goRoadmap() {
    navigate('/lo-trinh-hoc')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    { label: lang === 'vi' ? 'Giới thiệu' : 'About', action: () => goHome('#about') },
    { label: content.nav[0], action: () => goHome('#programs') },
    { label: content.nav[1], action: goRoadmap },
    { label: content.nav[2], action: () => goHome('#results') },
    { label: lang === 'vi' ? 'Liên hệ' : 'Contact', action: () => goHome('#contact') },
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <button
          className="flex items-center gap-3 text-left"
          type="button"
          onClick={() => goHome('#top')}
          aria-label="Thầy Giáp English"
        >
          <img
            className="h-14 w-14 rounded-full object-cover ring-1 ring-blue-100"
            src="/assets/logo.png"
            alt="Thầy Giáp English"
          />
          <div className="hidden leading-tight sm:block">
            <p className="text-base font-black text-[#0b3f9c]">Thầy Giáp</p>
            <p className="text-sm font-black text-[#e11d2e]">ENGLISH</p>
          </div>
        </button>

        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 lg:flex">
          {navItems.map((item) => (
            <button
              className="transition hover:text-[#0b3f9c]"
              type="button"
              onClick={item.action}
              key={item.label}
            >
              {item.label}
            </button>
          ))}
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
