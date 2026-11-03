import { useState } from "react";
import { X, ShoppingBag, Check, AlertCircle, PackageCheck } from "lucide-react";
import { useSite } from "../store/siteStore";

const EGYPT_GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "القليوبية",
  "الشرقية",
  "الدقهلية (المنصورة)",
  "الغربية (طنطا)",
  "المنوفية",
  "البحيرة",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "مطروح والساحل الشمالي",
  "البحر الأحمر (الغردقة)",
  "جنوب سيناء (شرم الشيخ)",
  "شمال سيناء",
  "الوادي الجديد",
];

export default function OrderModal({
  plan,
  total,
  onClose,
  onTrackOrder,
}: {
  plan: string;
  total: number;
  onClose: () => void;
  onTrackOrder?: (orderId: string) => void;
}) {
  const { data, addOrder, user } = useSite();
  const [form, setForm] = useState({
    name: user?.displayName || "",
    phone: "",
    email: user?.email || "",
    governorate: "القاهرة",
    address: "",
    qty: 1,
  });
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const totalPrice = total * form.qty;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("من فضلكِ أدخلي الاسم ورقم الموبايل المصري لتأكيد الشحن");
      return;
    }

    const newOrder = addOrder({
      name: form.name.trim(),
      phone: form.phone.trim(),
      customerEmail: form.email.trim() || undefined,
      governorate: form.governorate,
      address: form.address.trim(),
      plan,
      qty: form.qty,
      total: totalPrice,
      notes: "طلب مباشر من الموقع في مصر — الدفع عند المعاينة والاستلام",
    });

    setCreatedOrderId(newOrder.id);
  };

  if (createdOrderId) {
    return (
      <div
        className="fixed inset-0 z-[70] grid place-items-center bg-ink/65 p-4 backdrop-blur-sm"
        dir="rtl"
      >
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-lift">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500 text-white shadow-warm">
            <Check className="size-8" />
          </span>
          <h3 className="mt-5 text-2xl font-black text-ink">
            تم استلام طلبكِ بنجاح! 🧡
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            شكرًا لثقتكِ بـ {data.site.brandName}. جاري تجهيز باقة «{plan}» وسيتواصل
            معكِ مندوب الشحن المصري لتأكيد موعد التسليم.
          </p>

          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
            <span className="text-xs text-emerald-800">رقم شحنتكِ للمتابعة:</span>
            <p className="text-2xl font-black tracking-wider text-emerald-900">
              {createdOrderId}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                if (onTrackOrder) onTrackOrder(createdOrderId);
              }}
              className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-ember to-blaze py-3.5 text-sm font-bold text-white shadow-warm"
            >
              <PackageCheck className="size-4" /> تتبّعي طلبكِ الآن بالجميل
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-zinc-100 py-3 text-sm font-bold text-zinc-700 hover:bg-zinc-200"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/65 p-4 backdrop-blur-sm"
      dir="rtl"
    >
      <form
        onSubmit={submit}
        className="relative w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-lift sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 grid size-9 place-items-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
        >
          <X className="size-4" />
        </button>

        <h3 className="flex items-center gap-2 text-xl font-black text-ink">
          <ShoppingBag className="size-5 text-ember" /> حجز باقة «{plan}»
        </h3>
        <p className="mt-1 text-xs text-zinc-500">
          الدفع عند الاستلام بجميع المحافظات المصرية • شحن مجاني • ضمان سنتين
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 sm:col-span-2">
            <span className="text-xs font-bold text-zinc-700">الاسم ثلاثي *</span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="مثال: ياسمين محمد حسن"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium focus:border-ember focus:outline-none focus:ring-4 focus:ring-ember/10"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-bold text-zinc-700">
              رقم الموبايل المصري *
            </span>
            <input
              dir="ltr"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="010xxxxxxxx أو 011 / 012 / 015"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium focus:border-ember focus:outline-none focus:ring-4 focus:ring-ember/10"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-bold text-zinc-700">
              البريد الإلكتروني (Gmail)
            </span>
            <input
              dir="ltr"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="example@gmail.com"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium focus:border-ember focus:outline-none focus:ring-4 focus:ring-ember/10"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-bold text-zinc-700">المحافظة</span>
            <select
              value={form.governorate}
              onChange={(e) => setForm({ ...form, governorate: e.target.value })}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-700 focus:border-ember focus:outline-none"
            >
              {EGYPT_GOVERNORATES.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-bold text-zinc-700">العنوان بالتفصيل</span>
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="المدينة / المركز، اسم الشارع، رقم العمارة"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium focus:border-ember focus:outline-none"
            />
          </label>

          <label className="space-y-1.5 sm:col-span-2">
            <span className="text-xs font-bold text-zinc-700">الكمية المطلوبة</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setForm({ ...form, qty: Math.max(1, form.qty - 1) })
                }
                className="grid size-11 place-items-center rounded-xl border border-zinc-200 text-lg font-bold text-zinc-700 hover:bg-zinc-100"
              >
                −
              </button>
              <span className="grid h-11 flex-1 place-items-center rounded-xl bg-zinc-900 font-black text-white">
                {form.qty}
              </span>
              <button
                type="button"
                onClick={() => setForm({ ...form, qty: form.qty + 1 })}
                className="grid size-11 place-items-center rounded-xl border border-zinc-200 text-lg font-bold text-zinc-700 hover:bg-zinc-100"
              >
                +
              </button>
            </div>
          </label>

          <div className="sm:col-span-2 rounded-2xl border border-ember/20 bg-gradient-to-l from-ember/10 to-glow/10 p-4 text-center">
            <p className="text-xs font-bold text-zinc-600">المبلغ الإجمالي عند الاستلام بمصر:</p>
            <p className="text-3xl font-black text-ember">
              {totalPrice}{" "}
              <span className="text-sm font-bold text-zinc-800">جنيه مصري</span>
            </p>
            <p className="text-[11px] font-semibold text-zinc-500">
              الدفع كاش للمندوب أو بالفيزا / ميزة عند الاستلام بعد المعاينة والتأكد من المنتج
            </p>
          </div>
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-bold text-red-600">
            <AlertCircle className="size-4 shrink-0" /> {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-shine mt-6 w-full rounded-full bg-gradient-to-l from-ember to-blaze py-4 text-base font-black text-white shadow-warm transition hover:scale-[1.01]"
        >
          تأكيد الحجز الآن — شحن مجاني ودفع عند الاستلام
        </button>
      </form>
    </div>
  );
}
