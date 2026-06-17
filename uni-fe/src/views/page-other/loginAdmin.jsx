import { BookOpen, Home, LockKeyhole } from "lucide-react";

export default function LoginAdmin({ onLogin, goHome }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");

    if (password === "admin123") {
      onLogin();
      return;
    }

    event.currentTarget.reset();
    alert("Sai mật khẩu. Mật khẩu demo: admin123");
  }

  return (
    <main className="grid min-h-screen bg-slate-50 text-slate-900 lg:grid-cols-[1fr_460px]">
      <section className="relative hidden overflow-hidden bg-emerald-700 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.22),transparent_34%),linear-gradient(135deg,#047857,#0f766e_45%,#064e3b)]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
              <BookOpen size={26} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
                AboutUni Admin
              </p>
              <h1 className="text-xl font-bold">UNI Content Studio</h1>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-100">
              Dashboard quản trị
            </p>
            <h2 className="mt-3 text-5xl font-bold leading-tight">
              Chỉnh nội dung song ngữ trong một giao diện gọn và rõ.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-emerald-50">
              Giao diện admin dùng phong cách TDC: nền sáng, card trắng, nhấn
              xanh emerald, bo góc 8px và bố cục thao tác nhanh.
            </p>
          </div>

          <p className="text-sm text-emerald-100">
            http://localhost:5175/admin
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center p-6">
        <form
          className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <LockKeyhole size={24} />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Quản trị hệ thống
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Đăng nhập admin
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Dùng mật khẩu demo để vào dashboard chỉnh nội dung website.
          </p>

          <label className="mt-6 grid gap-2 text-sm font-semibold text-slate-700">
            Mật khẩu
            <input
              className="min-h-11 rounded-lg border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
              name="password"
              placeholder="admin123"
              type="password"
            />
          </label>

          <button
            className="mt-5 min-h-11 w-full rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
            type="submit"
          >
            Đăng nhập
          </button>
          <button
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            type="button"
            onClick={goHome}
          >
            <Home size={17} />
            Về trang chủ
          </button>
        </form>
      </section>
    </main>
  );
}
