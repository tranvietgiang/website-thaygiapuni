import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Eye,
  GraduationCap,
  Image,
  Languages,
  Menu,
  RotateCcw,
  Save,
  Sparkles,
  Users,
} from 'lucide-react'
import Setting from './tabmenu/setting.jsx'

function Field({ label, value, onChange, textarea = false }) {
  const Input = textarea ? 'textarea' : 'input'

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <Input
        className="min-h-11 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function StatCard({ title, value, icon: Icon, tone }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tone}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}

function Panel({ title, description, icon: Icon, children }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <Icon size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {description && <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

export default function Dashboard({
  content,
  activeLang,
  setActiveLang,
  updateContent,
  resetContent,
  goHome,
}) {
  const current = content[activeLang]

  function update(path, value) {
    updateContent((prev) => {
      const next = structuredClone(prev)
      let target = next[activeLang]

      for (let i = 0; i < path.length - 1; i += 1) {
        target = target[path[i]]
      }

      target[path.at(-1)] = value
      return next
    })
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Setting
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        onReset={resetContent}
        goHome={goHome}
      />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
                type="button"
                aria-label="Mở menu"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Quản trị hệ thống
                </p>
                <h2 className="truncate text-xl font-bold md:text-2xl">
                  Chỉnh nội dung website YOLA
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {activeLang.toUpperCase()}
                </p>
              </div>
              <button
                className="hidden items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100 md:flex"
                type="button"
                onClick={goHome}
              >
                <Eye size={17} />
                <span>Xem trang chủ</span>
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                type="button"
                onClick={resetContent}
                title="Khôi phục mặc định"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {[
              ['vi', 'Nội dung VI'],
              ['en', 'Content EN'],
            ].map(([id, label]) => (
              <button
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${
                  activeLang === id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
                key={id}
                type="button"
                onClick={() => setActiveLang(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        <section className="space-y-6 px-4 py-6 md:px-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Ngôn ngữ đang sửa"
              value={activeLang.toUpperCase()}
              icon={Languages}
              tone="bg-cyan-50 text-cyan-700"
            />
            <StatCard
              title="Khóa học"
              value={current.programs.length}
              icon={GraduationCap}
              tone="bg-emerald-50 text-emerald-700"
            />
            <StatCard
              title="Số liệu"
              value={current.stats.length}
              icon={BarChart3}
              tone="bg-amber-50 text-amber-700"
            />
            <StatCard
              title="Giáo viên"
              value={current.teachers?.length || 0}
              icon={Users}
              tone="bg-violet-50 text-violet-700"
            />
          </div>

          <Panel
            title="Hero"
            description="Nội dung phần banner chính, ảnh nền và ảnh chiến dịch phía dưới."
            icon={Sparkles}
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow" value={current.hero.eyebrow} onChange={(value) => update(['hero', 'eyebrow'], value)} />
              <Field label="Tiêu đề" value={current.hero.title} onChange={(value) => update(['hero', 'title'], value)} />
              <Field textarea label="Mô tả" value={current.hero.description} onChange={(value) => update(['hero', 'description'], value)} />
              <Field label="CTA chính" value={current.hero.primaryCta} onChange={(value) => update(['hero', 'primaryCta'], value)} />
              <Field label="Ảnh nền URL" value={current.hero.image} onChange={(value) => update(['hero', 'image'], value)} />
              <Field label="Ảnh campaign URL" value={current.hero.campaign} onChange={(value) => update(['hero', 'campaign'], value)} />
            </div>
          </Panel>

          <Panel
            title="Số liệu"
            description="Section thống kê kiểu dashboard, dùng cho phần 16 năm 1 khát vọng."
            icon={BarChart3}
          >
            <div className="mb-4 grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow section" value={current.statsEyebrow} onChange={(value) => update(['statsEyebrow'], value)} />
              <Field label="Tiêu đề section" value={current.statsTitle} onChange={(value) => update(['statsTitle'], value)} />
            </div>
            <div className="grid gap-3">
              {current.stats.map((item, index) => (
                <div className="grid gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 md:grid-cols-[180px_1fr]" key={index}>
                  <Field label="Giá trị" value={item.value} onChange={(value) => update(['stats', index, 'value'], value)} />
                  <Field label="Nhãn" value={item.label} onChange={(value) => update(['stats', index, 'label'], value)} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Chương trình học"
            description="Card khóa học gồm tên, mô tả, tag và ảnh dọc giống trang YOLA."
            icon={BookOpen}
          >
            <div className="mb-4 grid gap-4 lg:grid-cols-2">
              <Field label="Tiêu đề section" value={current.programsTitle} onChange={(value) => update(['programsTitle'], value)} />
              <Field textarea label="Mô tả section" value={current.programsSubtitle} onChange={(value) => update(['programsSubtitle'], value)} />
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {current.programs.map((program, index) => (
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4" key={index}>
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Image size={17} className="text-emerald-700" />
                    Khóa học {index + 1}
                  </div>
                  <div className="grid gap-3">
                    <Field label="Tên khóa học" value={program.title} onChange={(value) => update(['programs', index, 'title'], value)} />
                    <Field textarea label="Mô tả" value={program.description} onChange={(value) => update(['programs', index, 'description'], value)} />
                    <Field label="Tag" value={program.tag} onChange={(value) => update(['programs', index, 'tag'], value)} />
                    <Field label="Ảnh URL" value={program.image} onChange={(value) => update(['programs', index, 'image'], value)} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Đội ngũ giáo viên"
            description="Thông tin teacher cards ở section sư phạm ưu tú."
            icon={Users}
          >
            <div className="mb-4 grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow section" value={current.teachersEyebrow} onChange={(value) => update(['teachersEyebrow'], value)} />
              <Field label="Tiêu đề section" value={current.teachersTitle} onChange={(value) => update(['teachersTitle'], value)} />
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {(current.teachers || []).map((teacher, index) => (
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4" key={index}>
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                    <CheckCircle2 size={17} className="text-emerald-700" />
                    Giáo viên {index + 1}
                  </div>
                  <div className="grid gap-3">
                    <Field label="Tên" value={teacher.name} onChange={(value) => update(['teachers', index, 'name'], value)} />
                    <Field label="Vai trò" value={teacher.role} onChange={(value) => update(['teachers', index, 'role'], value)} />
                    <Field label="Trường / bằng cấp" value={teacher.school} onChange={(value) => update(['teachers', index, 'school'], value)} />
                    <Field label="Điểm / chứng chỉ" value={teacher.score} onChange={(value) => update(['teachers', index, 'score'], value)} />
                    <Field label="Ảnh URL" value={teacher.image} onChange={(value) => update(['teachers', index, 'image'], value)} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Liên hệ và footer" icon={Save}>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Tiêu đề form" value={current.contact.title} onChange={(value) => update(['contact', 'title'], value)} />
              <Field label="Hotline" value={current.contact.hotline} onChange={(value) => update(['contact', 'hotline'], value)} />
              <Field textarea label="Mô tả form" value={current.contact.description} onChange={(value) => update(['contact', 'description'], value)} />
              <Field textarea label="Footer" value={current.footer} onChange={(value) => update(['footer'], value)} />
            </div>
          </Panel>
        </section>
      </div>
    </main>
  )
}
