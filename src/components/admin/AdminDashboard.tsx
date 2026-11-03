import { useState, useRef } from "react";
import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  Sparkles,
  GalleryVertical,
  BadgeDollarSign,
  HelpCircle,
  Megaphone,
  Monitor,
  Boxes,
  ShoppingBag,
  LogOut,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Eye,
  Search,
  Bell,
  Menu,
  X,
  Check,
  AlertTriangle,
  Flame,
  Palette,
  Layers,
  Zap,
  ShieldCheck,
  Mail,
  ExternalLink,
} from "lucide-react";
import { useSite } from "../../store/siteStore";
import { ICON_OPTIONS } from "../../store/icons";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-zinc-700">{label}</span>
      {children}
      {hint && <span className="block text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-800 placeholder:text-zinc-400 focus:border-ember focus:outline-none focus:ring-4 focus:ring-ember/10 ${
        props.className ?? ""
      }`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium leading-7 text-zinc-800 placeholder:text-zinc-400 focus:border-ember focus:outline-none focus:ring-4 focus:ring-ember/10 ${
        props.className ?? ""
      }`}
    />
  );
}

function SelectIcon({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm font-bold text-zinc-700 focus:border-ember focus:outline-none"
    >
      {ICON_OPTIONS.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function ImagePicker({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(f);
  };
  return (
    <div className="space-y-3 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-4">
      {value && (
        <img
          src={value}
          alt="preview"
          className="h-36 w-full rounded-xl object-cover"
        />
      )}
      <Input
        placeholder="رابط الصورة أو اتركه فارغًا"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold text-white hover:bg-cocoa"
        >
          <Upload className="size-3.5" /> رفع من الجهاز
        </button>
        <span className="self-center text-xs text-zinc-500">
          {label ?? "يدعم JPG/PNG حتى 5MB"}
        </span>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />
    </div>
  );
}

function Card({
  title,
  icon: Icon,
  children,
  action,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-extrabold text-zinc-800">
          <span className="grid size-9 place-items-center rounded-xl bg-ember/10 text-ember">
            <Icon className="size-4.5" />
          </span>
          {title}
        </h3>
        {action}
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}

const TABS = [
  { id: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { id: "general", label: "الهوية والتواصل (مصر)", icon: Settings },
  { id: "hero", label: "قسم البطل Hero", icon: Sparkles },
  { id: "features", label: "المميزات", icon: Zap },
  { id: "showcase", label: "المعرض والمواصفات", icon: GalleryVertical },
  { id: "pricing", label: "الباقات والأسعار (جنيه)", icon: BadgeDollarSign },
  { id: "orders", label: "إدارة الطلبات والمحافظات", icon: ShoppingBag },
  { id: "admins", label: "مسؤولي Gmail", icon: ShieldCheck },
  { id: "faq", label: "الأسئلة والـ CTA", icon: HelpCircle },
  { id: "tools", label: "النسخ والاستعادة", icon: Boxes },
] as const;

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const {
    data,
    update,
    reset,
    exportJson,
    importJson,
    orders,
    updateOrder,
    deleteOrder,
    user,
    logout,
    adminEmails,
    addAdminEmail,
    removeAdminEmail,
  } = useSite();

  const [tab, setTab] = useState<string>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);
  const [orderFilter, setOrderFilter] = useState<string>("الكل");
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const triggerSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  const filteredTabs = TABS.filter(
    (t) => t.label.includes(search) || search === ""
  );

  const stats = [
    {
      label: "إجمالي طلبات مصر",
      value: orders.length,
      icon: ShoppingBag,
      tint: "from-ember to-blaze",
    },
    {
      label: "طلبات قيد التجهيز",
      value: orders.filter((o) => o.status === "جديد" || o.status === "مؤكد").length,
      icon: Bell,
      tint: "from-amber-500 to-orange-500",
    },
    {
      label: "إجمالي المبيعات بمصر",
      value:
        orders.reduce((s, o) => s + o.total, 0).toLocaleString() + " ج.م",
      icon: BadgeDollarSign,
      tint: "from-emerald-500 to-teal-500",
    },
    {
      label: "مسؤولي Gmail",
      value: adminEmails.length,
      icon: ShieldCheck,
      tint: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf8] text-zinc-800" dir="rtl">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="grid size-10 place-items-center rounded-full border border-zinc-200 bg-white lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <span className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-ember to-glow text-white shadow-warm">
                <Flame className="size-5" />
              </span>
              <span className="text-lg font-black">
                {data.site.brandName}{" "}
                <span className="font-medium text-zinc-500">لوحة الإدارة</span>
              </span>
            </span>
            {user?.email && (
              <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 sm:inline-flex">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                {user.email}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحثي في الأقسام..."
                className="w-56 rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pe-4 ps-10 text-sm placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-ember/10"
              />
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-bold hover:bg-zinc-50"
            >
              <Eye className="size-4" /> معاينة الموقع
            </button>
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              title="تسجيل الخروج"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100"
            >
              <LogOut className="size-4" /> خروج
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        {/* Sidebar */}
        <aside className={`${mobileOpen ? "block" : "hidden"} lg:block`}>
          <div className="sticky top-[88px] space-y-4">
            <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-4">
              <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-l from-ember/10 to-glow/10 p-4">
                <img
                  src={data.hero.heroImage}
                  alt=""
                  className="size-12 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-black">{data.site.brandName}</p>
                  <p className="text-xs text-zinc-500">
                    {data.site.pageTitle.slice(0, 24)}…
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <span className="rounded-2xl bg-zinc-900 px-3 py-3 text-white">
                  <span className="block text-lg font-black">{orders.length}</span>
                  <span className="text-[11px] opacity-70">طلب</span>
                </span>
                <span className="rounded-2xl bg-ember px-3 py-3 text-white">
                  <span className="block text-lg font-black">
                    {data.pricingSection.plans.length}
                  </span>
                  <span className="text-[11px] opacity-80">باقات</span>
                </span>
              </div>
            </div>

            <nav className="space-y-1 rounded-[1.5rem] border border-zinc-200 bg-white p-2">
              {filteredTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTab(t.id);
                    setMobileOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    tab === t.id
                      ? "bg-ink text-white shadow-warm"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-ink"
                  }`}
                >
                  <t.icon className="size-4.5" />
                  {t.label}
                  {t.id === "orders" && (
                    <span className="ms-auto rounded-full bg-ember px-2 py-0.5 text-xs text-white">
                      {orders.filter((o) => o.status === "جديد").length}
                    </span>
                  )}
                  {t.id === "admins" && (
                    <span className="ms-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                      {adminEmails.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <button
              onClick={triggerSave}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-ember to-blaze p-4 text-sm font-black text-white shadow-warm hover:scale-[1.01]"
            >
              <Save className="size-4" /> حفظ التغييرات الحالية
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 space-y-6">
          {saved && (
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-md">
              <Check className="size-4" /> تم الحفظ بنجاح — كافة تفاصيل الموقع والطلبات بمصر محدّثة الآن
            </div>
          )}

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-[1.5rem] border border-zinc-200 bg-white p-5"
                  >
                    <div
                      className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ${s.tint} text-white`}
                    >
                      <s.icon className="size-5" />
                    </div>
                    <p className="mt-4 text-2xl font-black">{s.value}</p>
                    <p className="text-sm font-semibold text-zinc-500">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                <Card title="أحدث شحنات وطلبات مصر" icon={Monitor}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-zinc-50 text-xs font-bold text-zinc-500">
                        <tr>
                          <th className="px-3 py-2 text-start">الطلب</th>
                          <th className="px-3 py-2 text-start">العميلة</th>
                          <th className="px-3 py-2">الباقة</th>
                          <th className="px-3 py-2">الحالة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.id} className="border-t border-zinc-100">
                            <td className="px-3 py-3 font-bold">{o.id}</td>
                            <td className="px-3 py-3">
                              <p className="font-bold">{o.name}</p>
                              <p className="text-xs text-zinc-500">{o.governorate}</p>
                            </td>
                            <td className="px-3 py-3 text-center">{o.plan}</td>
                            <td className="px-3 py-3 text-center">
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                  o.status === "تم التوصيل"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : o.status === "قيد الشحن"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card title="إجراءات سريعة" icon={ExternalLink}>
                  <button
                    onClick={() => setTab("orders")}
                    className="flex w-full items-center justify-between rounded-2xl bg-ink p-4 text-sm font-bold text-white"
                  >
                    إدارة الطلبات والشحن بمصر ({orders.length}) <span>‹</span>
                  </button>
                  <button
                    onClick={() => setTab("pricing")}
                    className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-4 text-sm font-bold hover:bg-zinc-50"
                  >
                    تعديل أسعار الباقات بالجنيه <span>‹</span>
                  </button>
                  <button
                    onClick={() => setTab("admins")}
                    className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 p-4 text-sm font-bold hover:bg-zinc-50"
                  >
                    إدارة حسابات الجميل (المسؤول: abdeenali520@gmail.com) <span>‹</span>
                  </button>
                </Card>
              </div>
            </div>
          )}

          {/* GENERAL */}
          {tab === "general" && (
            <div className="space-y-6">
              <Card title="بيانات المتجر في مصر" icon={Palette}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="اسم المتجر">
                    <Input
                      value={data.site.brandName}
                      onChange={(e) =>
                        update((d) => {
                          d.site.brandName = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                  <Field label="عنوان الصفحة (SEO Title)">
                    <Input
                      value={data.site.pageTitle}
                      onChange={(e) =>
                        update((d) => {
                          d.site.pageTitle = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                </div>
                <Field label="وصف الموقع في محركات البحث">
                  <Textarea
                    rows={2}
                    value={data.site.pageDescription}
                    onChange={(e) =>
                      update((d) => {
                        d.site.pageDescription = e.target.value;
                        return d;
                      })
                    }
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="رقم الواتساب للطلبات في مصر (20102177690)">
                    <Input
                      dir="ltr"
                      value={data.contact.waNumber}
                      onChange={(e) =>
                        update((d) => {
                          d.contact.waNumber = e.target.value.replace(/\D/g, "");
                          return d;
                        })
                      }
                    />
                  </Field>
                  <Field label="البريد الإلكتروني للشكاوى والتواصل">
                    <Input
                      dir="ltr"
                      value={data.contact.email}
                      onChange={(e) =>
                        update((d) => {
                          d.contact.email = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                </div>
              </Card>

              <Card
                title="شريط العروض العلوي"
                icon={Megaphone}
                action={
                  <label className="flex items-center gap-2 text-sm font-bold">
                    <input
                      type="checkbox"
                      checked={data.announcement.enabled}
                      onChange={(e) =>
                        update((d) => {
                          d.announcement.enabled = e.target.checked;
                          return d;
                        })
                      }
                      className="size-4 accent-ember"
                    />{" "}
                    تفعيل الشريط
                  </label>
                }
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="نص العرض الرئيسي">
                    <Input
                      value={data.announcement.text}
                      onChange={(e) =>
                        update((d) => {
                          d.announcement.text = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                  <Field label="ملاحظة العرض">
                    <Input
                      value={data.announcement.suffix}
                      onChange={(e) =>
                        update((d) => {
                          d.announcement.suffix = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                </div>
              </Card>
            </div>
          )}

          {/* HERO */}
          {tab === "hero" && (
            <div className="space-y-6">
              <Card title="نصوص القسم الرئيسي" icon={Sparkles}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="السطر الأول">
                    <Input
                      value={data.hero.titleLine1}
                      onChange={(e) =>
                        update((d) => {
                          d.hero.titleLine1 = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                  <Field label="السطر المتدرج بالألوان">
                    <Input
                      value={data.hero.titleGradient}
                      onChange={(e) =>
                        update((d) => {
                          d.hero.titleGradient = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                </div>
                <Field label="الوصف الترويجي">
                  <Textarea
                    rows={3}
                    value={data.hero.description}
                    onChange={(e) =>
                      update((d) => {
                        d.hero.description = e.target.value;
                        return d;
                      })
                    }
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="نص زر الطلب">
                    <Input
                      value={data.hero.primaryCta}
                      onChange={(e) =>
                        update((d) => {
                          d.hero.primaryCta = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                  <Field label="نص زر التتبع">
                    <Input
                      value={data.hero.secondaryCta}
                      onChange={(e) =>
                        update((d) => {
                          d.hero.secondaryCta = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                </div>
              </Card>

              <Card title="صورة المنتج والسعر في مصر" icon={ImageIcon}>
                <ImagePicker
                  value={data.hero.heroImage}
                  onChange={(v) =>
                    update((d) => {
                      d.hero.heroImage = v;
                      return d;
                    })
                  }
                />
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="سعر العرض الحالي (جنيه)">
                    <Input
                      type="number"
                      value={data.hero.priceNow}
                      onChange={(e) =>
                        update((d) => {
                          d.hero.priceNow = Number(e.target.value);
                          return d;
                        })
                      }
                    />
                  </Field>
                  <Field label="السعر قبل الخصم (جنيه)">
                    <Input
                      type="number"
                      value={data.hero.priceOld}
                      onChange={(e) =>
                        update((d) => {
                          d.hero.priceOld = Number(e.target.value);
                          return d;
                        })
                      }
                    />
                  </Field>
                  <Field label="شارة الخصم">
                    <Input
                      value={data.hero.ribbonText}
                      onChange={(e) =>
                        update((d) => {
                          d.hero.ribbonText = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                </div>
              </Card>
            </div>
          )}

          {/* FEATURES */}
          {tab === "features" && (
            <div className="space-y-6">
              <Card
                title="مزايا الدفاية"
                icon={Zap}
                action={
                  <button
                    onClick={() =>
                      update((d) => {
                        d.featuresSection.items.push({
                          icon: "Zap",
                          title: "ميزة جديدة",
                          desc: "وصف الميزة...",
                        });
                        return d;
                      })
                    }
                    className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white"
                  >
                    + إضافة ميزة
                  </button>
                }
              >
                {data.featuresSection.items.map((f, i) => (
                  <div
                    key={i}
                    className="space-y-3 rounded-2xl border border-zinc-100 p-4"
                  >
                    <div className="flex gap-2">
                      <SelectIcon
                        value={f.icon}
                        onChange={(v) =>
                          update((d) => {
                            d.featuresSection.items[i].icon = v;
                            return d;
                          })
                        }
                      />
                      <Input
                        className="flex-1"
                        placeholder="عنوان الميزة"
                        value={f.title}
                        onChange={(e) =>
                          update((d) => {
                            d.featuresSection.items[i].title = e.target.value;
                            return d;
                          })
                        }
                      />
                      <button
                        onClick={() =>
                          update((d) => {
                            d.featuresSection.items.splice(i, 1);
                            return d;
                          })
                        }
                        className="grid size-11 place-items-center rounded-xl bg-red-50 text-red-500"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <Textarea
                      rows={2}
                      value={f.desc}
                      onChange={(e) =>
                        update((d) => {
                          d.featuresSection.items[i].desc = e.target.value;
                          return d;
                        })
                      }
                    />
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* SHOWCASE */}
          {tab === "showcase" && (
            <div className="space-y-6">
              <Card
                title="معرض الصور"
                icon={GalleryVertical}
                action={
                  <button
                    onClick={() =>
                      update((d) => {
                        d.showcase.gallery.push({
                          src: "/images/lifestyle-living.jpg",
                          alt: "صورة جديدة",
                          caption: "تعليق...",
                        });
                        return d;
                      })
                    }
                    className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white"
                  >
                    + إضافة صورة
                  </button>
                }
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.showcase.gallery.map((g, i) => (
                    <div
                      key={i}
                      className="space-y-2 rounded-2xl border border-zinc-100 p-3"
                    >
                      <ImagePicker
                        value={g.src}
                        onChange={(v) =>
                          update((d) => {
                            d.showcase.gallery[i].src = v;
                            return d;
                          })
                        }
                      />
                      <Input
                        placeholder="التعليق"
                        value={g.caption}
                        onChange={(e) =>
                          update((d) => {
                            d.showcase.gallery[i].caption = e.target.value;
                            return d;
                          })
                        }
                      />
                      <button
                        onClick={() =>
                          update((d) => {
                            d.showcase.gallery.splice(i, 1);
                            return d;
                          })
                        }
                        className="rounded-lg bg-red-50 px-3 py-1 text-xs font-bold text-red-600"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="المواصفات السريعة (6)" icon={Layers}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {data.showcase.specs.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <SelectIcon
                        value={s.icon}
                        onChange={(v) =>
                          update((d) => {
                            d.showcase.specs[i].icon = v;
                            return d;
                          })
                        }
                      />
                      <Input
                        placeholder="القيمة"
                        value={s.k}
                        onChange={(e) =>
                          update((d) => {
                            d.showcase.specs[i].k = e.target.value;
                            return d;
                          })
                        }
                      />
                      <Input
                        placeholder="الوصف"
                        value={s.v}
                        onChange={(e) =>
                          update((d) => {
                            d.showcase.specs[i].v = e.target.value;
                            return d;
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* PRICING */}
          {tab === "pricing" && (
            <div className="space-y-6">
              <Card
                title="باقات الأسعار في مصر"
                icon={BadgeDollarSign}
                action={
                  <button
                    onClick={() =>
                      update((d) => {
                        d.pricingSection.plans.push({
                          name: "باقة جديدة",
                          tagline: "وصف الباقة",
                          now: 1500,
                          old: 2000,
                          cta: "اطلبي الآن",
                          features: ["ميزة 1", "ميزة 2"],
                        });
                        return d;
                      })
                    }
                    className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white"
                  >
                    + إضافة باقة
                  </button>
                }
              >
                {data.pricingSection.plans.map((p, i) => (
                  <div
                    key={i}
                    className="space-y-4 rounded-2xl border-2 border-zinc-100 p-5"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="اسم الباقة">
                        <Input
                          value={p.name}
                          onChange={(e) =>
                            update((d) => {
                              d.pricingSection.plans[i].name = e.target.value;
                              return d;
                            })
                          }
                        />
                      </Field>
                      <Field label="الوصف الترويجي">
                        <Input
                          value={p.tagline}
                          onChange={(e) =>
                            update((d) => {
                              d.pricingSection.plans[i].tagline = e.target.value;
                              return d;
                            })
                          }
                        />
                      </Field>
                      <Field label="السعر الحالي (جنيه)">
                        <Input
                          type="number"
                          value={p.now}
                          onChange={(e) =>
                            update((d) => {
                              d.pricingSection.plans[i].now = Number(
                                e.target.value
                              );
                              return d;
                            })
                          }
                        />
                      </Field>
                      <Field label="السعر قبل الخصم (جنيه)">
                        <Input
                          type="number"
                          value={p.old}
                          onChange={(e) =>
                            update((d) => {
                              d.pricingSection.plans[i].old = Number(
                                e.target.value
                              );
                              return d;
                            })
                          }
                        />
                      </Field>
                    </div>
                    <Field label="مزايا الباقة (سطر لكل ميزة)">
                      <Textarea
                        rows={3}
                        value={p.features.join("\n")}
                        onChange={(e) =>
                          update((d) => {
                            d.pricingSection.plans[i].features =
                              e.target.value.split("\n");
                            return d;
                          })
                        }
                      />
                    </Field>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm font-bold">
                        <input
                          type="checkbox"
                          checked={!!p.featured}
                          onChange={(e) =>
                            update((d) => {
                              d.pricingSection.plans[i].featured =
                                e.target.checked;
                              return d;
                            })
                          }
                          className="size-4 accent-ember"
                        />
                        باقة مميزة الأكثر طلباً ⭐
                      </label>
                      <button
                        onClick={() =>
                          update((d) => {
                            d.pricingSection.plans.splice(i, 1);
                            return d;
                          })
                        }
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600"
                      >
                        حذف الباقة
                      </button>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* ORDERS */}
          {tab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-zinc-200 bg-white p-5">
                <h3 className="text-lg font-black">
                  إدارة طلبات محافظات مصر ({orders.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["الكل", "جديد", "مؤكد", "قيد الشحن", "تم التوصيل"].map(
                    (s) => (
                      <button
                        key={s}
                        onClick={() => setOrderFilter(s)}
                        className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                          orderFilter === s
                            ? "bg-ink text-white"
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                        }`}
                      >
                        {s}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 text-xs font-bold text-zinc-500">
                      <tr>
                        <th className="px-4 py-3 text-start">رقم الشحنة</th>
                        <th className="px-4 py-3 text-start">العميلة والتواصل</th>
                        <th className="px-4 py-3 text-start">المحافظة والعنوان</th>
                        <th className="px-4 py-3 text-center">الباقة والكمية</th>
                        <th className="px-4 py-3 text-center">المبلغ</th>
                        <th className="px-4 py-3 text-center">حالة الشحنة</th>
                        <th className="px-4 py-3 text-start">بوليصة الشحن</th>
                        <th className="px-4 py-3 text-center">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders
                        .filter(
                          (o) =>
                            orderFilter === "الكل" || o.status === orderFilter
                        )
                        .map((o) => (
                          <tr
                            key={o.id}
                            className="border-t border-zinc-100 hover:bg-zinc-50/60"
                          >
                            <td className="px-4 py-4">
                              <p className="font-black text-ink">{o.id}</p>
                              <p className="text-xs text-zinc-400">
                                {new Date(o.date).toLocaleDateString("ar-EG")}
                              </p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="font-bold text-zinc-900">{o.name}</p>
                              <p dir="ltr" className="text-xs text-zinc-500">
                                {o.phone}
                              </p>
                              {o.customerEmail && (
                                <p className="text-[11px] text-zinc-400">
                                  {o.customerEmail}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <p className="font-semibold text-zinc-800">
                                {o.governorate}
                              </p>
                              {o.address && (
                                <p className="text-xs text-zinc-500">
                                  {o.address}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-4 text-center font-bold">
                              {o.plan} × {o.qty}
                            </td>
                            <td className="px-4 py-4 text-center font-black text-ember">
                              {o.total} ج.م
                            </td>
                            <td className="px-4 py-4 text-center">
                              <select
                                value={o.status}
                                onChange={(e) =>
                                  updateOrder(o.id, {
                                    status: e.target.value as any,
                                  })
                                }
                                className={`rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-black ${
                                  o.status === "تم التوصيل"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : o.status === "قيد الشحن"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                <option value="جديد">جديد</option>
                                <option value="مؤكد">مؤكد</option>
                                <option value="قيد الشحن">قيد الشحن</option>
                                <option value="تم التوصيل">تم التوصيل</option>
                              </select>
                            </td>
                            <td className="px-4 py-4">
                              <input
                                placeholder="بوليصة الشحن..."
                                value={o.trackingNumber || ""}
                                onChange={(e) =>
                                  updateOrder(o.id, {
                                    trackingNumber: e.target.value,
                                  })
                                }
                                className="w-32 rounded-lg border border-zinc-200 px-2 py-1 text-xs"
                              />
                            </td>
                            <td className="px-4 py-4 text-center">
                              <button
                                onClick={() => deleteOrder(o.id)}
                                className="rounded-lg bg-red-50 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-100"
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ADMIN TEAM (abdeenali520@gmail.com) */}
          {tab === "admins" && (
            <div className="space-y-6">
              <Card title="إدارة حسابات الجميل للمسؤولين" icon={ShieldCheck}>
                <p className="text-sm leading-6 text-zinc-600">
                  الحساب الأساسي المعتمد للمتجر: <b className="text-ink">abdeenali520@gmail.com</b>
                  <br />
                  بمجرد الدخول بهذا البريد عبر زر Google، يتم فتح لوحة التحكم الإدارية كاملة بدون أي خطوات إضافية.
                </p>

                {/* Current logged in status */}
                {user?.email && (
                  <div className="flex items-center justify-between rounded-2xl bg-zinc-900 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Mail className="size-5 text-ember" />
                      <div>
                        <p className="text-sm font-bold">الحساب المسجل حاليًا:</p>
                        <p className="text-xs opacity-75">{user.email}</p>
                      </div>
                    </div>
                    {!adminEmails.includes(user.email.toLowerCase()) && (
                      <button
                        onClick={() => addAdminEmail(user.email!)}
                        className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600"
                      >
                        + اعتماد بريدي كمسؤول
                      </button>
                    )}
                  </div>
                )}

                {/* Add new admin Gmail */}
                <div className="flex gap-2">
                  <Input
                    placeholder="أدخلي بريد Gmail لمسؤول إضافي..."
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    dir="ltr"
                  />
                  <button
                    onClick={() => {
                      if (newAdminEmail.trim() && newAdminEmail.includes("@")) {
                        addAdminEmail(newAdminEmail);
                        setNewAdminEmail("");
                        triggerSave();
                      }
                    }}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-bold text-white hover:bg-cocoa"
                  >
                    <Plus className="size-4" /> إضافة مسؤول
                  </button>
                </div>

                {/* Admin list */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-bold text-zinc-500">
                    قائمة الإيميلات المعتمدة كمسؤول ({adminEmails.length})
                  </h4>
                  {adminEmails.map((email) => (
                    <div
                      key={email}
                      className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3"
                    >
                      <span className="font-mono text-sm font-bold text-zinc-800">
                        {email}
                      </span>
                      {email.toLowerCase() === "abdeenali520@gmail.com" ? (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                          البريد الأساسي للمالك
                        </span>
                      ) : (
                        <button
                          onClick={() => removeAdminEmail(email)}
                          className="text-xs font-bold text-red-500 hover:text-red-700"
                        >
                          إزالة
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* FAQ & CTA */}
          {tab === "faq" && (
            <div className="space-y-6">
              <Card
                title="الأسئلة الشائعة"
                icon={HelpCircle}
                action={
                  <button
                    onClick={() =>
                      update((d) => {
                        d.faqSection.items.push({
                          q: "سؤال جديد؟",
                          a: "الإجابة...",
                        });
                        return d;
                      })
                    }
                    className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white"
                  >
                    + إضافة سؤال
                  </button>
                }
              >
                {data.faqSection.items.map((f, i) => (
                  <div
                    key={i}
                    className="space-y-2 rounded-2xl border border-zinc-100 p-4"
                  >
                    <Input
                      placeholder="السؤال"
                      value={f.q}
                      onChange={(e) =>
                        update((d) => {
                          d.faqSection.items[i].q = e.target.value;
                          return d;
                        })
                      }
                    />
                    <Textarea
                      rows={2}
                      placeholder="الإجابة"
                      value={f.a}
                      onChange={(e) =>
                        update((d) => {
                          d.faqSection.items[i].a = e.target.value;
                          return d;
                        })
                      }
                    />
                    <button
                      onClick={() =>
                        update((d) => {
                          d.faqSection.items.splice(i, 1);
                          return d;
                        })
                      }
                      className="rounded-lg bg-red-50 px-3 py-1 text-xs font-bold text-red-600"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </Card>

              <Card title="الدعوة الختامية للطلب" icon={Megaphone}>
                <Field label="شارة العرض">
                  <Input
                    value={data.finalCta.badge}
                    onChange={(e) =>
                      update((d) => {
                        d.finalCta.badge = e.target.value;
                        return d;
                      })
                    }
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="السطر الأول">
                    <Input
                      value={data.finalCta.title1}
                      onChange={(e) =>
                        update((d) => {
                          d.finalCta.title1 = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                  <Field label="السطر المتدرج">
                    <Input
                      value={data.finalCta.title2Grad}
                      onChange={(e) =>
                        update((d) => {
                          d.finalCta.title2Grad = e.target.value;
                          return d;
                        })
                      }
                    />
                  </Field>
                </div>
                <Field label="الوصف الختامي">
                  <Textarea
                    rows={2}
                    value={data.finalCta.desc}
                    onChange={(e) =>
                      update((d) => {
                        d.finalCta.desc = e.target.value;
                        return d;
                      })
                    }
                  />
                </Field>
              </Card>
            </div>
          )}

          {/* BACKUP & TOOLS */}
          {tab === "tools" && (
            <div className="space-y-6">
              <Card title="النسخ الاحتياطي والنقل" icon={Download}>
                <p className="text-sm leading-6 text-zinc-600">
                  صدّري ملف JSON كامل يحتوي على إعدادات متجركِ في مصر، باقات الأسعار بالجنيه، وبيانات الطلبات.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={exportJson}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white hover:bg-cocoa"
                  >
                    <Download className="size-4" /> تصدير نسخة كاملة JSON
                  </button>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-800 hover:bg-zinc-50">
                    <Upload className="size-4" /> استيراد نسخة احتياطية
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const content = ev.target?.result as string;
                            if (importJson(content)) {
                              alert("تم استيراد البيانات بنجاح!");
                            } else {
                              alert("الملف غير صالح أو تالف.");
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </Card>

              <Card title="إعادة الضبط" icon={RotateCcw}>
                <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-xs leading-6 text-amber-800">
                  <AlertTriangle className="size-4 shrink-0" />
                  سيتم مسح التعديلات المحلية والعودة للبيانات الافتراضية الأصلية للدفاية الحريمية في مصر.
                </div>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white hover:bg-red-700"
                >
                  <RotateCcw className="size-4" /> إعادة ضبط المتجر للافتراضي
                </button>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
