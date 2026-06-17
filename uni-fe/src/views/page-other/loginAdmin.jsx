import { BookOpen, Home, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { api } from "../../services/apiClient.js";

export default function LoginAdmin({ onLogin, goHome }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") || "admin";
    const password = formData.get("password");

    try {
      const csrfResponse = await api.get("", {
        params: { action: "csrf" },
      });

      const csrfToken = csrfResponse.data.csrfToken;
      const loginResponse = await api.post(
        "",
        { username, password },
        {
          params: { action: "login" },
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        },
      );

      const loginData = loginResponse.data;
      sessionStorage.setItem("aboutUni.jwt", loginData.token);
      sessionStorage.setItem("aboutUni.csrf", loginData.csrfToken);
      onLogin(loginData);
    } catch (exception) {
      event.currentTarget.reset();
      setError(
        exception.response?.data?.message ||
          (exception.code === "ERR_NETWORK"
            ? "Không kết nối được API. Kiểm tra Apache/XAMPP và VITE_API_BASE_URL."
            : "Không thể đăng nhập."),
      );
    } finally {
      setIsLoading(false);
    }
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
              Đăng nhập bằng tài khoản trong database. API dùng CSRF token và JWT cho phiên admin.
            </p>
          </div>

          <p className="text-sm text-emerald-100">http://localhost:5175/admin</p>
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
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Đăng nhập admin</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Dùng tài khoản admin trong database để vào dashboard chỉnh nội dung website.
          </p>

          <label className="mt-6 grid gap-2 text-sm font-semibold text-slate-700">
            Tài khoản
            <input
              className="min-h-11 rounded-lg border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
              name="username"
              placeholder="admin"
              type="text"
            />
          </label>

          <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
            Mật khẩu
            <input
              className="min-h-11 rounded-lg border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
              name="password"
              placeholder="Nhập mật khẩu"
              type="password"
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </p>
          ) : null}

          <button
            className="mt-5 min-h-11 w-full rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
