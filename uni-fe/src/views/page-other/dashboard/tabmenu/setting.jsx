import {
  BookOpen,
  Eye,
  FileText,
  Home,
  Languages,
  Settings,
} from "lucide-react";
import { CiLogout } from "react-icons/ci";

const menuItems = [
  { id: "overview", label: "Dashboard", icon: BookOpen },
  { id: "vi", label: "Nội dung VI", icon: FileText },
  { id: "en", label: "Content EN", icon: Languages },
];

export default function Setting({ activeLang, setActiveLang, goHome }) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <Settings size={24} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            AboutUni
          </p>
          <h1 className="text-lg font-bold text-slate-900">UNI Admin</h1>
        </div>
      </div>

      <nav className="space-y-1 px-4 py-5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.id === activeLang || (item.id === "overview" && !activeLang);

          return (
            <button
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === "vi" || item.id === "en")
                  setActiveLang(item.id);
              }}
            >
              <Icon size={19} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute inset-x-4 bottom-5 grid gap-2">
        <button
          className="flex w-full items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-left text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
          type="button"
          onClick={goHome}
        >
          <Eye size={18} />
          Xem trang chủ
        </button>
        <button
          className="flex w-full items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100"
          type="button"
          // onClick={onLogout}
        >
          <CiLogout size={18} />
          Đăng xuất
        </button>
      </div>

      <div className="fixed bottom-4 left-4 lg:hidden">
        <button type="button" onClick={goHome}>
          <Home size={18} />
        </button>
      </div>
    </aside>
  );
}
