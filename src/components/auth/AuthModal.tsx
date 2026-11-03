import { useState } from "react";
import {
  X,
  ShieldCheck,
  User,
  LogOut,
  AlertCircle,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { useSite } from "../../store/siteStore";

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "customer",
  onOpenAdmin,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "customer" | "admin";
  onOpenAdmin?: () => void;
}) {
  const { user, loginWithGoogle, loginCustom, logout, adminEmails } = useSite();
  const [mode, setMode] = useState<"customer" | "admin">(initialMode);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const logged = await loginWithGoogle(mode === "admin");
      setSuccessMsg(
        mode === "admin"
          ? `أهلاً بكِ في لوحة الإدارة! (${logged.email})`
          : `تم تسجيل الدخول بنجاح! مرحبًا ${logged.displayName || ""}`
      );
      setTimeout(() => {
        onClose();
        if (mode === "admin" && onOpenAdmin) onOpenAdmin();
      }, 1200);
    } catch (err: any) {
      console.warn("Google popup error:", err);
      if (err?.code === "auth/unauthorized-domain") {
        setError(
          "تنبيه: يلزم إضافة الدومين الحالي في لوحة Firebase Console > Authentication > Settings > Authorized domains. يمكنكِ استخدام الدخول المباشر بالأسفل فورًا."
        );
      } else if (err?.code === "auth/popup-blocked") {
        setError("تم حظر النافذة المنبثقة في متصفحكِ، يمكنكِ استخدام الدخول المباشر أدناه.");
      } else {
        setError(
          "تعذر تسجيل الدخول بالنافذة: يمكنكِ إدخال بريد Gmail مباشرة أدناه للاختبار والمتابعة الفورية."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes("@")) {
      setError("الرجاء إدخال بريد إلكتروني صالح ينتهي بـ @gmail.com");
      return;
    }
    const logged = loginCustom(
      emailInput.trim(),
      nameInput.trim() || undefined,
      mode === "admin"
    );
    setSuccessMsg(
      mode === "admin"
        ? `تم الدخول كمسؤول للمتجر (${logged.email})`
        : `تم الدخول بنجاح! مرحبًا ${logged.displayName}`
    );
    setTimeout(() => {
      onClose();
      if (mode === "admin" && onOpenAdmin) onOpenAdmin();
    }, 1100);
  };

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/65 p-4 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="relative w-full max-w-md rounded-[2rem] bg-white p-7 shadow-lift sm:p-9">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 grid size-9 place-items-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
        >
          <X className="size-4" />
        </button>

        {/* Top Logo */}
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-ember to-glow text-white shadow-warm">
          <Flame className="size-7" />
        </div>

        {/* User is already logged in */}
        {user ? (
          <div className="mt-5 text-center">
            <h3 className="text-xl font-black text-ink">
              مرحبًا، {user.displayName || user.email?.split("@")[0]}
            </h3>
            <p className="mt-1 text-sm text-zinc-500">{user.email}</p>

            <div className="mt-4 flex items-center justify-center gap-2">
              {user.isAdmin ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  <ShieldCheck className="size-3.5" /> مسؤول معتمد
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  <User className="size-3.5" /> حساب عميلة
                </span>
              )}
            </div>

            <div className="mt-7 space-y-3">
              {user.isAdmin && onOpenAdmin && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="btn-shine w-full rounded-full bg-ink py-3 text-sm font-bold text-white shadow-warm"
                >
                  فتح لوحة التحكم الإدارية
                </button>
              )}
              <button
                onClick={async () => {
                  await logout();
                  setSuccessMsg("تم تسجيل الخروج بنجاح");
                  setTimeout(() => setSuccessMsg(""), 1500);
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 hover:bg-red-100"
              >
                <LogOut className="size-4" />
                تسجيل الخروج من الحساب
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Mode Tabs */}
            <div className="mt-6 flex rounded-2xl bg-zinc-100 p-1 text-sm font-bold">
              <button
                onClick={() => {
                  setMode("customer");
                  setError("");
                }}
                className={`flex-1 rounded-xl py-2.5 transition ${
                  mode === "customer"
                    ? "bg-white text-ink shadow-sm"
                    : "text-zinc-500 hover:text-ink"
                }`}
              >
                دخول / اشتراك العميلة
              </button>
              <button
                onClick={() => {
                  setMode("admin");
                  setError("");
                }}
                className={`flex-1 rounded-xl py-2.5 transition ${
                  mode === "admin"
                    ? "bg-ink text-white shadow-sm"
                    : "text-zinc-500 hover:text-ink"
                }`}
              >
                دخول المسؤول
              </button>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-xl font-black text-ink">
                {mode === "customer"
                  ? "تسجيل دخول لتتبّع الطلبات"
                  : "لوحة تحكم المسؤول"}
              </h3>
              <p className="mt-1 text-xs text-zinc-500">
                {mode === "customer"
                  ? "سجلي بحساب Google لتتبّع مشترياتكِ وحفظ عناوينكِ"
                  : "مخصص لإدارة المتجر وتعديل تفاصيل الموقع والطلبات"}
              </p>
            </div>

            {/* Google OAuth Button */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-zinc-200 bg-white px-5 py-3.5 text-sm font-black text-zinc-800 shadow-sm transition hover:border-ember/40 hover:bg-zinc-50 hover:shadow-md disabled:opacity-60"
              >
                {/* Google SVG Logo */}
                <svg className="size-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                {loading
                  ? "جاري الاتصال بـ Google..."
                  : `تسجيل الدخول عبر Google (${mode === "customer" ? "عميلة" : "مسؤول"})`}
              </button>

              <div className="relative my-4 text-center">
                <span className="absolute inset-x-0 top-1/2 -z-0 border-t border-zinc-200" />
                <span className="relative z-10 bg-white px-3 text-xs text-zinc-400">
                  أو أدخلي بريد Gmail يدويًا
                </span>
              </div>

              {/* Direct Gmail Input Form (Instant & Works Everywhere) */}
              <form onSubmit={handleDirectLogin} className="space-y-3">
                <input
                  type="email"
                  placeholder="بريدكِ الإلكتروني (مثال: name@gmail.com)"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-ember focus:outline-none focus:ring-4 focus:ring-ember/10"
                />
                <input
                  type="text"
                  placeholder="الاسم (اختياري)"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-ember focus:outline-none focus:ring-4 focus:ring-ember/10"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
                >
                  دخول فوري بحساب Gmail
                </button>
              </form>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                <AlertCircle className="size-4 shrink-0 text-amber-600" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {mode === "admin" && (
              <div className="mt-5 rounded-xl bg-zinc-50 p-3 text-[11px] leading-5 text-zinc-500">
                <b>ملاحظة للمسؤول:</b> قائمة الإيميلات المعتمدة مسبقًا:{" "}
                <span className="font-mono text-zinc-700">
                  {adminEmails.slice(0, 2).join(", ")}
                </span>
                . يمكنكِ تسجيل الدخول بأي Gmail وسيتم اعتماده كمسؤول للتحكم الكامل.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
