import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Image,
  Images,
  Languages,
  LogOut,
  MessageSquareQuote,
  Menu,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { saveSiteContent } from "../../../services/contentApi.js";
import Setting from "./tabmenu/setting.jsx";

function Field({ label, value, onChange, textarea = false }) {
  const Input = textarea ? "textarea" : "input";

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <Input
        className="min-h-11 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function StatCard({ title, value, icon: Icon, tone }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${tone}`}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
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
          {description ? (
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function RemoveButton({ label, onClick, className = "" }) {
  return (
    <button
      className={`flex items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 transition hover:bg-rose-50 ${className}`}
      type="button"
      onClick={onClick}
      aria-label={label}
    >
      <Trash2 size={16} />
    </button>
  );
}

function AddButton({ children, onClick, className = "" }) {
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg border border-dashed border-emerald-300 bg-emerald-50 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 ${className}`}
      type="button"
      onClick={onClick}
    >
      <Plus size={18} />
      {children}
    </button>
  );
}

export default function Dashboard({
  content,
  activeLang,
  setActiveLang,
  updateContent,
  resetContent,
  goHome,
  onLogout,
}) {
  const current = content[activeLang];
  const [activeTab, setActiveTab] = useState("hero");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedAt, setSavedAt] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const tabs = [
    { id: "hero", label: "Hero", icon: Sparkles },
    { id: "stats", label: "Số liệu", icon: BarChart3 },
    { id: "programs", label: "Chương trình học", icon: BookOpen },
    { id: "testimonials", label: "Cảm nhận về Uni", icon: MessageSquareQuote },
    { id: "galleries", label: "Hình ảnh tại Uni", icon: Images },
    { id: "teachers", label: "Đội ngũ giáo viên", icon: Users },
    { id: "contact", label: "Liên hệ và footer", icon: Save },
  ];

  function markDirty() {
    setHasUnsavedChanges(true);
  }

  function update(path, value) {
    updateContent((prev) => {
      const next = structuredClone(prev);
      let target = next[activeLang];

      for (let i = 0; i < path.length - 1; i += 1) {
        target = target[path[i]];
      }

      target[path.at(-1)] = value;
      return next;
    });
    markDirty();
  }

  function addItem(key, item) {
    updateContent((prev) => {
      const next = structuredClone(prev);
      next[activeLang][key] = [...(next[activeLang][key] || []), item];
      return next;
    });
    markDirty();
  }

  function removeItem(key, index) {
    updateContent((prev) => {
      const next = structuredClone(prev);
      next[activeLang][key] = (next[activeLang][key] || []).filter(
        (_, itemIndex) => itemIndex !== index,
      );
      return next;
    });
    markDirty();
  }

  function addGalleryImage(galleryIndex) {
    updateContent((prev) => {
      const next = structuredClone(prev);
      const gallery = next[activeLang].galleries[galleryIndex];
      gallery.images = [
        ...(gallery.images || []),
        "/assets/images/buoi-hoc/buoihoc-1.jpg",
      ];
      return next;
    });
    markDirty();
  }

  function removeGalleryImage(galleryIndex, imageIndex) {
    updateContent((prev) => {
      const next = structuredClone(prev);
      const gallery = next[activeLang].galleries[galleryIndex];
      gallery.images = (gallery.images || []).filter(
        (_, itemIndex) => itemIndex !== imageIndex,
      );
      return next;
    });
    markDirty();
  }

  async function handleSave() {
    setIsSaving(true);
    setSaveError("");

    try {
      const savedContent = await saveSiteContent(content);
      if (savedContent?.vi || savedContent?.en) {
        updateContent((prev) => ({
          vi: { ...prev.vi, ...(savedContent.vi || {}) },
          en: { ...prev.en, ...(savedContent.en || {}) },
        }));
      }
      setHasUnsavedChanges(false);
      setSavedAt(
        new Intl.DateTimeFormat("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    } catch (exception) {
      setSaveError(
        exception.response?.data?.message ||
          "Không lưu được nội dung vào MySQL. Kiểm tra API, JWT hoặc CSRF.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  const activePanel = {
    hero: (
      <Panel
        title="Hero"
        description="Quản lý nội dung banner, ảnh banner carousel và ảnh chính trong section hero."
        icon={Sparkles}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Field
            label="Eyebrow"
            value={current.hero.eyebrow}
            onChange={(value) => update(["hero", "eyebrow"], value)}
          />
          <Field
            label="Tiêu đề"
            value={current.hero.title}
            onChange={(value) => update(["hero", "title"], value)}
          />
          <Field
            textarea
            label="Mô tả"
            value={current.hero.description}
            onChange={(value) => update(["hero", "description"], value)}
          />
          <Field
            label="CTA chính"
            value={current.hero.primaryCta}
            onChange={(value) => update(["hero", "primaryCta"], value)}
          />
          <Field
            label="Ảnh chính URL"
            value={current.hero.image}
            onChange={(value) => update(["hero", "image"], value)}
          />
          <Field
            label="Ảnh banner carousel URL"
            value={current.hero.campaign}
            onChange={(value) => update(["hero", "campaign"], value)}
          />
        </div>
      </Panel>
    ),
    stats: (
      <Panel
        title="Số liệu"
        description="Mỗi dòng là một record trong bảng site_stats."
        icon={BarChart3}
      >
        <div className="mb-4 grid gap-4 lg:grid-cols-2">
          <Field
            label="Eyebrow section"
            value={current.statsEyebrow}
            onChange={(value) => update(["statsEyebrow"], value)}
          />
          <Field
            label="Tiêu đề section"
            value={current.statsTitle}
            onChange={(value) => update(["statsTitle"], value)}
          />
        </div>
        <div className="grid gap-3">
          {(current.stats || []).map((item, index) => (
            <div
              className="grid gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 md:grid-cols-[180px_1fr_auto]"
              key={index}
            >
              <Field
                label="Giá trị"
                value={item.value}
                onChange={(value) => update(["stats", index, "value"], value)}
              />
              <Field
                label="Nhãn"
                value={item.label}
                onChange={(value) => update(["stats", index, "label"], value)}
              />
              <RemoveButton
                className="mt-7 h-11 w-11"
                label="Xóa số liệu"
                onClick={() => removeItem("stats", index)}
              />
            </div>
          ))}
          <AddButton
            className="h-11"
            onClick={() =>
              addItem("stats", {
                value: "Mốc mới",
                label: "Mô tả số liệu mới",
              })
            }
          >
            Thêm số liệu
          </AddButton>
        </div>
      </Panel>
    ),
    programs: (
      <Panel
        title="Chương trình học"
        description="Mỗi card là một record trong bảng site_programs, có ảnh riêng cho lộ trình."
        icon={BookOpen}
      >
        <div className="mb-4 grid gap-4 lg:grid-cols-2">
          <Field
            label="Tiêu đề section"
            value={current.programsTitle}
            onChange={(value) => update(["programsTitle"], value)}
          />
          <Field
            textarea
            label="Mô tả section"
            value={current.programsSubtitle}
            onChange={(value) => update(["programsSubtitle"], value)}
          />
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {(current.programs || []).map((program, index) => (
            <div
              className="rounded-lg border border-slate-100 bg-slate-50 p-4"
              key={index}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Image size={17} className="text-emerald-700" />
                  Khóa học {index + 1}
                </div>
                <RemoveButton
                  className="h-9 w-9"
                  label="Xóa khóa học"
                  onClick={() => removeItem("programs", index)}
                />
              </div>
              <div className="grid gap-3">
                <Field
                  label="Tên khóa học"
                  value={program.title}
                  onChange={(value) =>
                    update(["programs", index, "title"], value)
                  }
                />
                <Field
                  textarea
                  label="Mô tả"
                  value={program.description}
                  onChange={(value) =>
                    update(["programs", index, "description"], value)
                  }
                />
                <Field
                  label="Tag"
                  value={program.tag}
                  onChange={(value) =>
                    update(["programs", index, "tag"], value)
                  }
                />
                <Field
                  label="Ảnh lộ trình URL"
                  value={program.image}
                  onChange={(value) =>
                    update(["programs", index, "image"], value)
                  }
                />
              </div>
            </div>
          ))}
          <AddButton
            className="min-h-40"
            onClick={() =>
              addItem("programs", {
                title: "Khóa học mới",
                description: "Mô tả khóa học mới",
                tag: "TOEIC",
                image: "/assets/images/buoi-hoc/buoihoc-1.jpg",
              })
            }
          >
            Thêm khóa học
          </AddButton>
        </div>
      </Panel>
    ),
    testimonials: (
      <Panel
        title="Cảm nhận về Uni"
        description="Mỗi card là một record trong bảng site_testimonials, có ảnh học viên riêng."
        icon={MessageSquareQuote}
      >
        <div className="mb-4 grid gap-4 lg:grid-cols-2">
          <Field
            label="Eyebrow section"
            value={current.testimonialsEyebrow}
            onChange={(value) => update(["testimonialsEyebrow"], value)}
          />
          <Field
            label="Tiêu đề section"
            value={current.testimonialsTitle}
            onChange={(value) => update(["testimonialsTitle"], value)}
          />
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {(current.testimonials || []).map((testimonial, index) => (
            <div
              className="rounded-lg border border-slate-100 bg-slate-50 p-4"
              key={index}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <MessageSquareQuote size={17} className="text-emerald-700" />
                  Cảm nhận {index + 1}
                </div>
                <RemoveButton
                  className="h-9 w-9"
                  label="Xóa cảm nhận"
                  onClick={() => removeItem("testimonials", index)}
                />
              </div>
              <div className="grid gap-3">
                <Field
                  label="Tên học viên"
                  value={testimonial.name}
                  onChange={(value) =>
                    update(["testimonials", index, "name"], value)
                  }
                />
                <Field
                  label="Vai trò"
                  value={testimonial.role}
                  onChange={(value) =>
                    update(["testimonials", index, "role"], value)
                  }
                />
                <Field
                  label="Kết quả"
                  value={testimonial.result}
                  onChange={(value) =>
                    update(["testimonials", index, "result"], value)
                  }
                />
                <Field
                  label="Ảnh cảm nhận URL"
                  value={testimonial.image}
                  onChange={(value) =>
                    update(["testimonials", index, "image"], value)
                  }
                />
                <Field
                  textarea
                  label="Nội dung cảm nhận"
                  value={testimonial.quote}
                  onChange={(value) =>
                    update(["testimonials", index, "quote"], value)
                  }
                />
              </div>
            </div>
          ))}
          <AddButton
            className="min-h-40"
            onClick={() =>
              addItem("testimonials", {
                name: "Học viên mới",
                role: "Sinh viên",
                quote: "Cảm nhận sau khóa học TOEIC tại Uni.",
                result: "TOEIC 600+",
                image: "/assets/images/result-sv-aim/sv-2.jpg",
              })
            }
          >
            Thêm cảm nhận
          </AddButton>
        </div>
      </Panel>
    ),
    galleries: (
      <Panel
        title="Hình ảnh tại Uni"
        description="Quản lý nhóm ảnh và từng ảnh trong bảng site_galleries, site_gallery_images."
        icon={Images}
      >
        <div className="mb-4 grid gap-4 lg:grid-cols-2">
          <Field
            label="Eyebrow section"
            value={current.galleryEyebrow}
            onChange={(value) => update(["galleryEyebrow"], value)}
          />
          <Field
            label="Tiêu đề section"
            value={current.galleryTitle}
            onChange={(value) => update(["galleryTitle"], value)}
          />
        </div>
        <div className="grid gap-4">
          {(current.galleries || []).map((gallery, galleryIndex) => (
            <div
              className="rounded-lg border border-slate-100 bg-slate-50 p-4"
              key={galleryIndex}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Images size={17} className="text-emerald-700" />
                  Nhóm ảnh {galleryIndex + 1}
                </div>
                <RemoveButton
                  className="h-9 w-9"
                  label="Xóa nhóm ảnh"
                  onClick={() => removeItem("galleries", galleryIndex)}
                />
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                <Field
                  label="Tên nhóm"
                  value={gallery.title}
                  onChange={(value) =>
                    update(["galleries", galleryIndex, "title"], value)
                  }
                />
                <Field
                  label="Mô tả nhóm"
                  value={gallery.description}
                  onChange={(value) =>
                    update(["galleries", galleryIndex, "description"], value)
                  }
                />
              </div>
              <div className="mt-4 grid gap-3">
                {(gallery.images || []).map((imageUrl, imageIndex) => (
                  <div
                    className="grid gap-3 md:grid-cols-[1fr_auto]"
                    key={`${galleryIndex}-${imageIndex}`}
                  >
                    <Field
                      label={`Ảnh ${imageIndex + 1} URL`}
                      value={imageUrl}
                      onChange={(value) =>
                        update(
                          ["galleries", galleryIndex, "images", imageIndex],
                          value,
                        )
                      }
                    />
                    <RemoveButton
                      className="mt-7 h-11 w-11"
                      label="Xóa ảnh"
                      onClick={() =>
                        removeGalleryImage(galleryIndex, imageIndex)
                      }
                    />
                  </div>
                ))}
                <AddButton
                  className="h-11 bg-white hover:bg-emerald-50"
                  onClick={() => addGalleryImage(galleryIndex)}
                >
                  Thêm ảnh vào nhóm
                </AddButton>
              </div>
            </div>
          ))}
          <AddButton
            className="h-14"
            onClick={() =>
              addItem("galleries", {
                title: "Nhóm ảnh mới",
                description: "Mô tả nhóm ảnh mới",
                images: ["/assets/images/buoi-hoc/buoihoc-1.jpg"],
              })
            }
          >
            Thêm nhóm ảnh
          </AddButton>
        </div>
      </Panel>
    ),
    teachers: (
      <Panel
        title="Đội ngũ giáo viên"
        description="Mỗi card là một record trong bảng site_teachers."
        icon={Users}
      >
        <div className="mb-4 grid gap-4 lg:grid-cols-2">
          <Field
            label="Eyebrow section"
            value={current.teachersEyebrow}
            onChange={(value) => update(["teachersEyebrow"], value)}
          />
          <Field
            label="Tiêu đề section"
            value={current.teachersTitle}
            onChange={(value) => update(["teachersTitle"], value)}
          />
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {(current.teachers || []).map((teacher, index) => (
            <div
              className="rounded-lg border border-slate-100 bg-slate-50 p-4"
              key={index}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <CheckCircle2 size={17} className="text-emerald-700" />
                  Giáo viên {index + 1}
                </div>
                <RemoveButton
                  className="h-9 w-9"
                  label="Xóa giáo viên"
                  onClick={() => removeItem("teachers", index)}
                />
              </div>
              <div className="grid gap-3">
                <Field
                  label="Tên"
                  value={teacher.name}
                  onChange={(value) =>
                    update(["teachers", index, "name"], value)
                  }
                />
                <Field
                  label="Vai trò"
                  value={teacher.role}
                  onChange={(value) =>
                    update(["teachers", index, "role"], value)
                  }
                />
                <Field
                  label="Trường / bằng cấp"
                  value={teacher.school}
                  onChange={(value) =>
                    update(["teachers", index, "school"], value)
                  }
                />
                <Field
                  label="Điểm / chứng chỉ"
                  value={teacher.score}
                  onChange={(value) =>
                    update(["teachers", index, "score"], value)
                  }
                />
                <Field
                  label="Ảnh URL"
                  value={teacher.image}
                  onChange={(value) =>
                    update(["teachers", index, "image"], value)
                  }
                />
              </div>
            </div>
          ))}
          <AddButton
            className="min-h-40"
            onClick={() =>
              addItem("teachers", {
                name: "GIÁO VIÊN MỚI",
                role: "TOEIC Trainer",
                school: "Thông tin chuyên môn",
                score: "TOEIC 900+",
                image: "/assets/images/teacheruni/kieunhi.jpg",
              })
            }
          >
            Thêm giáo viên
          </AddButton>
        </div>
      </Panel>
    ),
    contact: (
      <Panel title="Liên hệ và footer" icon={Save}>
        <div className="grid gap-4 lg:grid-cols-2">
          <Field
            label="Tiêu đề form"
            value={current.contact.title}
            onChange={(value) => update(["contact", "title"], value)}
          />
          <Field
            label="Hotline"
            value={current.contact.hotline}
            onChange={(value) => update(["contact", "hotline"], value)}
          />
          <Field
            textarea
            label="Địa chỉ liên hệ"
            value={current.contact.address}
            onChange={(value) => update(["contact", "address"], value)}
          />
          <Field
            textarea
            label="Mô tả form"
            value={current.contact.description}
            onChange={(value) => update(["contact", "description"], value)}
          />
          <Field
            label="Nút CTA form"
            value={current.contact.button}
            onChange={(value) => update(["contact", "button"], value)}
          />
          <Field
            textarea
            label="Google Map embed URL"
            value={current.contact.mapUrl}
            onChange={(value) => update(["contact", "mapUrl"], value)}
          />
          <Field
            textarea
            label="Footer"
            value={current.footer}
            onChange={(value) => update(["footer"], value)}
          />
        </div>
      </Panel>
    ),
  }[activeTab];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Setting
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        onReset={resetContent}
        goHome={goHome}
        onLogout={onLogout}
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
                  Chỉnh nội dung website UNI
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {hasUnsavedChanges
                    ? "Có thay đổi chưa lưu"
                    : savedAt
                      ? `Đã lưu ${savedAt}`
                      : activeLang.toUpperCase()}
                </p>
              </div>
              <button
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                  hasUnsavedChanges
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
                type="button"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save size={17} />
                <span className="hidden sm:inline">
                  {isSaving
                    ? "Đang lưu..."
                    : hasUnsavedChanges
                      ? "Lưu thay đổi"
                      : "Đã lưu"}
                </span>
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 md:hidden"
                type="button"
                onClick={onLogout}
                aria-label="Đăng xuất"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {[
              ["vi", "Nội dung VI"],
              ["en", "Content EN"],
            ].map(([id, label]) => (
              <button
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${
                  activeLang === id
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
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
          {saveError ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {saveError}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Ngôn ngữ đang sửa"
              value={activeLang.toUpperCase()}
              icon={Languages}
              tone="bg-cyan-50 text-cyan-700"
            />
            <StatCard
              title="Khóa học"
              value={current.programs?.length || 0}
              icon={GraduationCap}
              tone="bg-emerald-50 text-emerald-700"
            />
            <StatCard
              title="Cảm nhận"
              value={current.testimonials?.length || 0}
              icon={MessageSquareQuote}
              tone="bg-amber-50 text-amber-700"
            />
            <StatCard
              title="Giáo viên"
              value={current.teachers?.length || 0}
              icon={Users}
              tone="bg-violet-50 text-violet-700"
            />
          </div>

          <div className="sticky top-[81px] z-10 flex gap-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  className={`flex h-11 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-bold transition ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  key={tab.id}
                >
                  <Icon size={17} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activePanel}
        </section>
      </div>
    </main>
  );
}
