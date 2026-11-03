import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import Pricing from "./components/Pricing";
import OrderTracker from "./components/OrderTracker";
import Faq from "./components/Faq";
import { FinalCta, Footer, StickyBar } from "./components/CtaFooter";
import { SiteProvider, useSite } from "./store/siteStore";
import AdminDashboard from "./components/admin/AdminDashboard";
import AuthModal from "./components/auth/AuthModal";
import OrderModal from "./components/OrderModal";
import { ShieldCheck, LogOut, PackageCheck } from "lucide-react";

function MainContent({
  onOpenAdmin,
  onOpenAuth,
  onOrder,
}: {
  onOpenAdmin: () => void;
  onOpenAuth: (mode?: "customer" | "admin") => void;
  onOrder: (plan: string, total: number) => void;
}) {
  const { user, logout } = useSite();

  return (
    <div className="min-h-screen bg-cream font-sans text-ink antialiased selection:bg-ember selection:text-white">
      <Navbar onOpenAdmin={onOpenAdmin} onOpenAuth={onOpenAuth} />

      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Showcase />
        <Pricing onOrder={onOrder} />
        <OrderTracker onLoginClick={() => onOpenAuth("customer")} />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <StickyBar />

      {/* Floating Admin & Tracking Quick FAB */}
      <div className="fixed bottom-5 end-5 z-40 hidden flex-col items-end gap-2.5 sm:flex">
        {user?.isAdmin && (
          <button
            onClick={onOpenAdmin}
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-black text-white shadow-lift transition hover:bg-cocoa hover:scale-105"
            aria-label="لوحة تحكم المسؤول"
          >
            <ShieldCheck className="size-4 text-glow" />
            لوحة الإدارة
          </button>
        )}

        <button
          onClick={() => {
            const el = document.getElementById("track");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-parchment/90 px-4 py-2.5 text-xs font-bold text-ink shadow-lift backdrop-blur transition hover:bg-white"
        >
          <PackageCheck className="size-4 text-ember" />
          تتبع الطلب
        </button>

        {user && (
          <button
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white/90 px-3 py-1.5 text-[11px] font-bold text-red-600 shadow-sm transition hover:bg-red-50"
            title="تسجيل الخروج من الحساب"
          >
            <LogOut className="size-3" />
            تسجيل خروج ({user.displayName || user.email?.split("@")[0]})
          </button>
        )}
      </div>
    </div>
  );
}

function AppContent() {
  const { user } = useSite();
  const [view, setView] = useState<"site" | "admin">("site");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"customer" | "admin">("customer");
  const [orderModal, setOrderModal] = useState<{
    plan: string;
    total: number;
  } | null>(null);

  useEffect(() => {
    // Check deep link hash or query params
    if (window.location.hash === "#admin") {
      if (user?.isAdmin) {
        setView("admin");
      } else {
        setAuthMode("admin");
        setAuthModalOpen(true);
      }
    }
  }, [user]);

  const handleOpenAdmin = () => {
    if (user?.isAdmin) {
      setView("admin");
    } else {
      setAuthMode("admin");
      setAuthModalOpen(true);
    }
  };

  const handleOpenAuth = (mode: "customer" | "admin" = "customer") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      {view === "site" ? (
        <MainContent
          onOpenAdmin={handleOpenAdmin}
          onOpenAuth={handleOpenAuth}
          onOrder={(plan, total) => setOrderModal({ plan, total })}
        />
      ) : (
        <AdminDashboard onClose={() => setView("site")} />
      )}

      {/* Google Auth Modal (Customer / Admin) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onOpenAdmin={() => setView("admin")}
      />

      {/* Customer Quick Order Modal */}
      {orderModal && (
        <OrderModal
          plan={orderModal.plan}
          total={orderModal.total}
          onClose={() => setOrderModal(null)}
          onTrackOrder={() => {
            const el = document.getElementById("track");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
