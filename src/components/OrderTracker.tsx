import { useState } from "react";
import {
  PackageCheck,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShoppingBag,
  LogIn,
} from "lucide-react";
import { useSite, type Order } from "../store/siteStore";

export default function OrderTracker({
  onLoginClick,
}: {
  onLoginClick?: () => void;
}) {
  const { orders, user } = useSite();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const userOrders = user?.email
    ? orders.filter(
        (o) =>
          o.customerEmail?.toLowerCase() === user.email?.toLowerCase()
      )
    : [];

  const searchResults = query.trim()
    ? orders.filter(
        (o) =>
          o.id.toLowerCase().includes(query.trim().toLowerCase()) ||
          o.phone.includes(query.trim())
      )
    : [];

  const displayOrders = query.trim() ? searchResults : userOrders;

  const getStatusStep = (status: Order["status"]) => {
    switch (status) {
      case "جديد":
        return 1;
      case "مؤكد":
        return 2;
      case "قيد الشحن":
        return 3;
      case "تم التوصيل":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <section id="track" className="relative overflow-hidden bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ember/25 bg-ember/[0.08] px-4 py-1.5 text-sm font-semibold text-ember">
            <PackageCheck className="size-4" />
            خدمة ما بعد البيع والتوصيل بمصر
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
            تتبّعي شحنتكِ <span className="text-gradient">لحظة بلحظة في مصر</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-ink-soft">
            أدخلي رقم الطلب أو رقم الموبايل المصري، أو سجلي دخولكِ بـ Google لعرض كافة
            طلباتكِ فورًا.
          </p>
        </div>

        {/* Search bar & Google Auth status */}
        <div className="mx-auto mt-8 max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearched(true);
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ink-soft/50" />
              <input
                type="text"
                placeholder="رقم الشحنة (مثال: EGY-5120) أو رقم الموبايل..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearched(false);
                }}
                className="w-full rounded-2xl border border-ink/15 bg-parchment py-3.5 pe-4 ps-12 text-sm font-bold text-ink placeholder:font-normal placeholder:text-ink-soft/60 focus:border-ember focus:bg-white focus:outline-none focus:ring-4 focus:ring-ember/10"
              />
            </div>
            <button
              type="submit"
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-7 py-3.5 text-sm font-bold text-cream transition hover:bg-cocoa"
            >
              بحث عن الطلب
            </button>
          </form>

          {/* Customer Google Quick Bar */}
          {!user ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ember/20 bg-gradient-to-l from-ember/[0.07] to-glow/[0.07] p-4 text-sm">
              <span className="font-semibold text-ink">
                💡 تتبّعي طلباتكِ تلقائيًا عبر حساب Gmail بدون كتابة أرقام
              </span>
              <button
                onClick={onLoginClick}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-ink shadow-sm transition hover:bg-sand"
              >
                <LogIn className="size-3.5 text-ember" />
                دخول بالجميل (Google)
              </button>
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-50/70 p-3.5 text-sm font-bold text-emerald-900">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600" />
                أنتِ مسجلة دخول بحساب Gmail: <b>{user.email}</b>
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800">
                {userOrders.length} طلب مسجل
              </span>
            </div>
          )}
        </div>

        {/* Orders list */}
        <div className="mt-8 space-y-6">
          {displayOrders.length > 0 ? (
            displayOrders.map((o) => {
              const step = getStatusStep(o.status);
              return (
                <div
                  key={o.id}
                  className="overflow-hidden rounded-[2rem] border border-ink/[0.08] bg-parchment p-6 shadow-sm transition hover:shadow-lift sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] pb-5">
                    <div>
                      <span className="text-xs font-bold text-ink-soft">
                        رقم الشحنة
                      </span>
                      <h3 className="text-xl font-black text-ink">{o.id}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-4 py-1.5 text-xs font-black ${
                          o.status === "تم التوصيل"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.status === "قيد الشحن"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {o.status}
                      </span>
                      <span className="text-xs font-semibold text-ink-soft">
                        {new Date(o.date).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                  </div>

                  {/* 4-step Progress Tracker */}
                  <div className="mt-8">
                    <div className="relative grid grid-cols-4 gap-2 text-center text-xs font-bold sm:text-sm">
                      <div className="absolute inset-x-8 top-4 -z-0 h-1 bg-ink/10" />
                      <div
                        className="absolute start-8 top-4 -z-0 h-1 bg-gradient-to-l from-ember to-glow transition-all duration-700"
                        style={{
                          width: `${((step - 1) / 3) * 100}%`,
                          maxWidth: "calc(100% - 4rem)",
                        }}
                      />

                      {[
                        { title: "تم تسجيل الحجز", s: 1 },
                        { title: "تم تأكيد الطلب", s: 2 },
                        { title: "مع المندوب للشحن", s: 3 },
                        { title: "تم التسليم بنجاح", s: 4 },
                      ].map((item) => (
                        <div key={item.title} className="relative z-10 flex flex-col items-center">
                          <span
                            className={`grid size-9 place-items-center rounded-full text-xs font-black transition ${
                              step >= item.s
                                ? "bg-gradient-to-br from-ember to-blaze text-white shadow-warm"
                                : "border border-ink/20 bg-parchment text-ink-soft"
                            }`}
                          >
                            {step > item.s ? (
                              <CheckCircle2 className="size-4" />
                            ) : (
                              item.s
                            )}
                          </span>
                          <span
                            className={`mt-2 font-extrabold ${
                              step >= item.s ? "text-ink" : "text-ink-soft/60"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details summary */}
                  <div className="mt-8 grid gap-4 rounded-2xl bg-sand/40 p-4 text-sm sm:grid-cols-4">
                    <div>
                      <span className="block text-xs font-semibold text-ink-soft">
                        الباقة والكمية
                      </span>
                      <span className="font-extrabold text-ink">
                        {o.plan} × {o.qty}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-ink-soft">
                        المحافظة / العنوان
                      </span>
                      <span className="font-extrabold text-ink">{o.governorate} {o.address ? `- ${o.address}` : ""}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-ink-soft">
                        المبلغ المطلوب
                      </span>
                      <span className="font-black text-ember">
                        {o.total} جنيه مصري{" "}
                        <span className="text-[11px] font-normal text-ink-soft">
                          (عند الاستلام)
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-ink-soft">
                        بوليصة الشحن
                      </span>
                      <span className="font-extrabold text-ink">
                        {o.trackingNumber || "جاري التجهيز مع شركة الشحن"}
                      </span>
                    </div>
                  </div>

                  {o.notes && (
                    <p className="mt-4 flex items-center gap-2 rounded-xl bg-parchment p-3 text-xs font-semibold text-ink-soft">
                      <Clock className="size-4 shrink-0 text-ember" />
                      تحديث المتجر: {o.notes}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.06] pt-4">
                    <span className="text-xs text-ink-soft">
                      للاستفسار السريع عن شحنتكِ مع خدمة عملاء مصر:
                    </span>
                    <a
                      href={`https://wa.me/20102177690?text=${encodeURIComponent(
                        `مرحبًا، أودّ الاستفسار عن طلبي رقم ${o.id}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      <ExternalLink className="size-3.5" />
                      واتساب خدمة العملاء بمصر (0102177690)
                    </a>
                  </div>
                </div>
              );
            })
          ) : searched || (user && userOrders.length === 0) ? (
            <div className="rounded-3xl border border-dashed border-ink/15 bg-parchment p-10 text-center">
              <ShoppingBag className="mx-auto size-12 text-ink-soft/40" />
              <h4 className="mt-3 text-lg font-extrabold text-ink">
                لم نجد طلبات مطابقة
              </h4>
              <p className="mt-1 text-sm text-ink-soft">
                تأكدي من رقم الطلب (مثال: EGY-5120) أو رقم الموبايل المسجل عند الحجز.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
