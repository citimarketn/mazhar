import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type AppUser,
  getStoredUser,
  signOutUser,
  listenToAuth,
  getAdminEmails,
  saveAdminEmails,
  signInWithGoogle,
  signInWithCustomEmail,
  PRIMARY_ADMIN_EMAIL,
} from "../lib/firebase";

export type NavLink = { label: string; href: string };
export type TrustItem = { label: string; icon: string };
export type MarqueeItem = { text: string; icon: string };
export type StatItem = {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  note: string;
};
export type FeatureItem = { icon: string; title: string; desc: string };
export type GalleryItem = { src: string; alt: string; caption: string };
export type SpecItem = { icon: string; k: string; v: string };
export type Plan = {
  name: string;
  tagline: string;
  now: number;
  old: number;
  featured?: boolean;
  cta: string;
  features: string[];
};
export type FaqItem = { q: string; a: string };

export type OrderStatus = "جديد" | "مؤكد" | "قيد الشحن" | "تم التوصيل";

export type Order = {
  id: string;
  name: string;
  phone: string;
  governorate: string; // المحافظة في مصر
  address?: string;
  plan: string;
  qty: number;
  total: number;
  date: string;
  status: OrderStatus;
  customerEmail?: string;
  trackingNumber?: string;
  notes?: string;
};

export interface SiteData {
  site: { pageTitle: string; pageDescription: string; brandName: string; currency: string; country: string };
  contact: {
    waNumber: string;
    phoneDisplay: string;
    email: string;
    hours: string;
  };
  announcement: { enabled: boolean; text: string; suffix: string };
  nav: { links: NavLink[]; ctaLabel: string };
  hero: {
    ratingText: string;
    titleLine1: string;
    titleGradient: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustItems: TrustItem[];
    countdownEnabled: boolean;
    countdownLabel: string;
    heroImage: string;
    heroImageAlt: string;
    ribbonEnabled: boolean;
    ribbonText: string;
    priceLabel: string;
    priceNow: number;
    priceOld: number;
    chips: { label: string; icon: string }[];
  };
  socialProof: { marquee: MarqueeItem[]; stats: StatItem[] };
  featuresSection: {
    eyebrow: string;
    title: string;
    titleGradient: string;
    desc: string;
    items: FeatureItem[];
  };
  showcase: {
    eyebrow: string;
    title: string;
    titleGradient: string;
    desc: string;
    gallery: GalleryItem[];
    specs: SpecItem[];
  };
  pricingSection: {
    eyebrow: string;
    title1: string;
    titleGrad: string;
    desc: string;
    stockEnabled: boolean;
    stockText: string;
    stockPercent: number;
    plans: Plan[];
    trustRow: { icon: string; text: string }[];
  };
  faqSection: {
    eyebrow: string;
    title1: string;
    titleGrad: string;
    items: FaqItem[];
    helpTitle: string;
    helpDesc: string;
    helpCta: string;
  };
  finalCta: {
    badge: string;
    title1: string;
    title2Grad: string;
    desc: string;
    primaryCta: string;
    secondaryCta: string;
    trust: { icon: string; text: string }[];
  };
  footer: {
    description: string;
    quickTitle: string;
    helpTitle: string;
    contactTitle: string;
    helpLinks: string[];
    socials: { label: string; href: string; icon: string }[];
    payments: string[];
    copyright: string;
    ctaLabel: string;
  };
}

export const DEFAULT_DATA: SiteData = {
  site: {
    pageTitle: "دِفء مصر | دفاية حريمي فاخرة — الدفع عند الاستلام بجميع المحافظات",
    pageDescription:
      "دفاية دِفء الحريمية الفاخرة في مصر: تسخين فوري خلال 3 ثوانٍ، استهلاك اقتصادي للكهرباء وأمان كامل للأطفال. شحن سريع لجميع محافظات مصر والدفع عند المعاينة والاستلام.",
    brandName: "دِفء مصر",
    currency: "جنيه",
    country: "جمهورية مصر العربية",
  },
  contact: {
    waNumber: "20102177690",
    phoneDisplay: "0102177690 (20+)",
    email: PRIMARY_ADMIN_EMAIL,
    hours: "يوميًا: 10 صباحًا – 12 منتصف الليل بتوقيت القاهرة",
  },
  announcement: {
    enabled: true,
    text: "عرض شتاء مصر: خصم 30% + شحن مجاني لكافة المحافظات",
    suffix: "العرض متاح اليوم فقط",
  },
  nav: {
    links: [
      { label: "المميزات", href: "#features" },
      { label: "المواصفات", href: "#product" },
      { label: "الأسعار في مصر", href: "#pricing" },
      { label: "تتبعي شحنتك", href: "#track" },
      { label: "الأسئلة الشائعة", href: "#faq" },
    ],
    ctaLabel: "اطلبي الآن",
  },
  hero: {
    ratingText: "— تقييم 4.9 من أكثر من 8,500 عميلة في مصر",
    titleLine1: "دفءٌ يَليقُ بكِ وببيتكِ،",
    titleGradient: "وأناقةٌ شتوية راقية في مصر",
    description:
      "دفاية سيراميك تورنادو حريمية فاخرة — تسخين فوري في 3 ثوانٍ، صوت هادئ تمامًا 25 ديسيبل، ونظام أمان أوتوماتيكي يفصل الكهرباء فورًا عند الميل أو اللمس. متوفرة الآن في كافة المحافظات مع الدفع عند الاستلام.",
    primaryCta: "اطلبيها الآن بخصم 30%",
    secondaryCta: "تتبعي طلبكِ الحالي",
    trustItems: [
      { label: "الدفع عند الاستلام بمصر", icon: "Banknote" },
      { label: "شحن مجاني لكل المحافظات", icon: "Truck" },
      { label: "ضمان عامين واستبدال فوري", icon: "ShieldCheck" },
      { label: "معاينة قبل الدفع", icon: "RefreshCw" },
    ],
    countdownEnabled: true,
    countdownLabel: "ينتهي عرض اليوم بمصر خلال",
    heroImage: "/images/hero-product.png",
    heroImageAlt: "دفاية دِفء الحريمية الفاخرة - مصر",
    ribbonEnabled: true,
    ribbonText: "خصم 30% وشحن مجاني",
    priceLabel: "سعر العرض الحالي",
    priceNow: 1250,
    priceOld: 1800,
    chips: [
      { label: "تسخين في 3 ثوانٍ", icon: "Zap" },
      { label: "فصل ذكي عند السقوط", icon: "ShieldCheck" },
      { label: "هدوء فائق 25dB", icon: "VolumeX" },
    ],
  },
  socialProof: {
    marquee: [
      { text: "الدفع عند الاستلام في جميع محافظات مصر", icon: "Banknote" },
      { text: "شحن مجاني من الإسكندرية لأسوان", icon: "Truck" },
      { text: "ضمان عامين كاملين من الوكيل", icon: "ShieldCheck" },
      { text: "معاينة المنتج وتجربته قبل الاستلام", icon: "RefreshCw" },
      { text: "الأعلى مبيعًا لشتاء 2025 في مصر", icon: "Sparkles" },
    ],
    stats: [
      { value: 8500, suffix: "+", label: "عميلة سعيدة بمصر", note: "القاهرة، الإسكندرية، والدلتا والصعيد" },
      { value: 4.9, decimals: 1, suffix: "/5", label: "تقييم الجودة", note: "تقييمات موثقة من عميلاتنا" },
      { value: 98, suffix: "%", label: "يوصين بالمنتج", note: "لأمهاتهن وأخواتهن" },
      { value: 45, suffix: "%", label: "توفير فاتورة الكهرباء", note: "بفضل الثيرموستات الذكي PTC" },
    ],
  },
  featuresSection: {
    eyebrow: "لماذا دِفء هي الأفضل لكِ؟",
    title: "مزايا وتكنولوجيا عصرية",
    titleGradient: " تضمن دفئكِ وسلامتكِ ",
    desc: "صممت خصيصًا لتمنحكِ حرارة متوازنة فورية بدون جفاف للبشرة أو استهلاك مبالغ فيه للكهرباء.",
    items: [
      {
        icon: "Zap",
        title: "تسخين فوري خلال 3 ثوانٍ",
        desc: "سيراميك تورمالين متطور بتقنية PTC يبث الدفء فور تشغيله بدون أي انتظار أو روائح.",
      },
      {
        icon: "ShieldCheck",
        title: "حماية كاملة للأطفال",
        desc: "جسم خارجي عازل للحرارة وحساس حركة يفصل الكهرباء لحظيًا إذا مالت أو اصطدم بها طفل.",
      },
      {
        icon: "Leaf",
        title: "اقتصادية في فاتورة الكهرباء",
        desc: "ثيرموستات ذكي ينظم التشغيل أوتوماتيكيًا بمجرد تدفئة الغرفة ليوفر حتى 45% من الطاقة.",
      },
      {
        icon: "VolumeX",
        title: "صامتة تمامًا (25 ديسيبل)",
        desc: "صوت منعدم تمامًا يتيح لكِ ولأطفالكِ نومًا هادئًا وعميقًا طوال الليل.",
      },
      {
        icon: "Timer",
        title: "ريموت كنترول + تايمر",
        desc: "تحكمي في درجات الحرارة وأوقات التشغيل حتى 12 ساعة وأنتِ في مكانكِ بالسرير.",
      },
      {
        icon: "FlameKindling",
        title: "وهج كهرماني ديكوري",
        desc: "إضاءة ناعمة ودافئة تضفي طابعًا رومانسيًا وراقيًا على ركن المعيشة أو غرفة النوم.",
      },
    ],
  },
  showcase: {
    eyebrow: "فخامة وأناقة",
    title: "قطعة ديكور فاخرة",
    titleGradient: " تزيّن منزلكِ العصري",
    desc: "وزن خفيف 2.1 كجم مع مقبض مدمج مريح لنقلها بسهولة بين غرف المنزل.",
    gallery: [
      {
        src: "/images/lifestyle-living.jpg",
        alt: "دفاية دِفء في غرفة المعيشة",
        caption: "في الصالون والمعيشة — ضيافة شتوية دافئة",
      },
      {
        src: "/images/lifestyle-bedroom.jpg",
        alt: "دفاية دِفء في غرفة النوم",
        caption: "في غرفة النوم — دفء حنون لنوم مريح",
      },
      {
        src: "/images/lifestyle-office.jpg",
        alt: "دفاية دِفء في المكتب والعمل",
        caption: "في المكتب وغرفة المذاكرة — تركيز وإنتاجية",
      },
      {
        src: "/images/detail-close.jpg",
        alt: "تفاصيل قلب السيراميك الذهبي الوردي",
        caption: "خامات ألمانية ولمسات نحاسية وذهبية وردية",
      },
    ],
    specs: [
      { icon: "Zap", k: "2000 واط", v: "قوة تسخين فائقة" },
      { icon: "ThermometerSun", k: "3 مستويات", v: "اقتصادي / معتدل / قوي" },
      { icon: "Timer", k: "12 ساعة", v: "مؤقت زمني تلقائي" },
      { icon: "Ruler", k: "حتى 25 متر", v: "تغطية كاملة للمساحة" },
      { icon: "Feather", k: "2.1 كجم", v: "سهلة الحمل والتنقل" },
      { icon: "Hand", k: "سطح بارد", v: "آمنة بنسبة 100% للأطفال" },
    ],
  },
  pricingSection: {
    eyebrow: "أسعار عروض مصر الحصرية",
    title1: "اختاري الباقة المناسبة مع",
    titleGrad: "شحن مجاني ودفع عند الاستلام بجميع المحافظات",
    desc: "جميع الأسعار بالجنيه المصري شاملة الشحن حتى باب البيت، مع ضمان سنتين وتجربة قبل الدفع.",
    stockEnabled: true,
    stockText: "متبقي 14 قطعة فقط بسعر الخصم اليوم",
    stockPercent: 86,
    plans: [
      {
        name: "باقة سولو (قطعة واحدة)",
        tagline: "مثالية لغرفة نوم واحدة أو ركن المكتب",
        now: 1250,
        old: 1800,
        cta: "اطلبي سولو الآن",
        features: [
          "دفاية دِفء الأصلية × 1",
          "ريموت تحكم لاسلكي",
          "شحن مجاني لجميع محافظات مصر",
          "ضمان سنتين شامل الاستبدال",
          "الدفع نقدًا أو بالفيزا عند الاستلام",
        ],
      },
      {
        name: "الباقة الفاخرة (الأكثر طلبًا)",
        tagline: "مع هدية شتوية راقية (بطانية صوفية فاخرة)",
        now: 1650,
        old: 2400,
        featured: true,
        cta: "اطلبي الباقة الفاخرة",
        features: [
          "دفاية دِفء الأصلية × 1",
          "هدية مجانية: بطانية شتوية صوف فاخرة",
          "شحن سريع خلال 24–48 ساعة",
          "ضمان سنتين + استبدال فوري",
          "معاينة وتجربة كاملة قبل الدفع",
        ],
      },
      {
        name: "باقة العائلة (قطعتان)",
        tagline: "للصالون وغرفة النوم معًا بتوفير إضافي ضخم",
        now: 2200,
        old: 3400,
        cta: "اطلبي باقة العائلة",
        features: [
          "دفاية دِفء الأصلية × 2",
          "هديتان شتويتان فاخرتان",
          "شحن مجاني أولوية قصوى لمصر",
          "توفير إضافي 1200 جنيه",
          "ضمان سنتين كاملتين للقطعتين",
        ],
      },
    ],
    trustRow: [
      { icon: "Banknote", text: "الدفع كاش أو بالفيزا عند استلام الشحنة" },
      { icon: "Truck", text: "شحن سريع لكافة محافظات ومراكز مصر" },
      { icon: "RefreshCw", text: "حق المعاينة والتجربة قبل الدفع للمندوب" },
    ],
  },
  faqSection: {
    eyebrow: "الأسئلة الشائعة",
    title1: "كل ما تودين معرفته",
    titleGrad: "عن الدفاية وطريقة الاستلام في مصر",
    items: [
      {
        q: "هل الدفع عند الاستلام متاح في محافظتي؟",
        a: "نعم بالتأكيد! متاح الدفع عند الاستلام في جميع محافظات مصر (القاهرة، الجيزة، الإسكندرية، الدلتا، القناة، والصعيد). تدفعين للمندوب نقدًا أو بالبطاقة بعد فتح الكرتونة ومعاينة الدفاية.",
      },
      {
        q: "كم يستغرق التوصيل؟",
        a: "التوصيل يتم خلال 24 إلى 48 ساعة لمحافظات القاهرة الكبرى والإسكندرية، وخلال يومين إلى 3 أيام لباقي محافظات الجمهورية.",
      },
      {
        q: "هل الدفاية آمنة على الأطفال في البيت؟",
        a: "آمنة تمامًا بفضل حساس الأمان الذكي؛ إذا مالت الدفاية أو وقعت على الأرض تفصل الكهرباء فورًا وبشكل تلقائي، بالإضافة إلى أن خاماتها الخارجية لا تسخن.",
      },
      {
        q: "كيف أتتبع طلبي ومعرفة موعد وصول المندوب؟",
        a: "يمكنكِ تسجيل الدخول بحساب Gmail بالضغط على زر (دخول / تتبع الطلب) ومتابعة مراحل شحنتكِ خطوة بخطوة، أو الاستفسار مباشرة عبر واتساب برقم الطلب.",
      },
    ],
    helpTitle: "هل تحتاجين مساعدة إضافية؟",
    helpDesc: "فريق الدعم متاح يوميًا على واتساب للرد على كافة استفساراتكِ.",
    helpCta: "تواصلي معنا عبر واتساب الآن",
  },
  finalCta: {
    badge: "عرض خاص لشتاء مصر — خصم 30% وشحن مجاني",
    title1: "استمتعي بأدفأ شتاء",
    title2Grad: "مع دفاية دِفء في مصر",
    desc: "اطلبي الآن بدون أي مقدم، استلمي شحنتكِ وعاينيها بنفسكِ وادفعي عند الباب مع ضمان عامين.",
    primaryCta: "اطلبي الآن — الدفع عند الاستلام",
    secondaryCta: "تحدثي معنا عبر واتساب",
    trust: [
      { icon: "Truck", text: "شحن مجاني لجميع المحافظات" },
      { icon: "RefreshCw", text: "معاينة وتجربة قبل الدفع" },
      { icon: "ShieldCheck", text: "ضمان عامين شامل الوكيل" },
    ],
  },
  footer: {
    description:
      "دِفء مصر — الماركة المتخصصة في تقديم أجهزة التدفئة العصرية الفاخرة والآمنة للبيوت المصرية، مع أعلى معايير الأمان وتوفير الطاقة.",
    quickTitle: "روابط سريعة",
    helpTitle: "الدعم والمساعدة",
    contactTitle: "التواصل وخدمة العملاء بمصر",
    helpLinks: [
      "تتبع الشحنات بالجميل",
      "شروط الضمان والاستبدال",
      "الشحن والتسليم للمحافظات",
      "سياسة الخصوصية",
    ],
    socials: [
      { label: "فيسبوك", href: "https://facebook.com", icon: "Facebook" },
      { label: "انستجرام", href: "https://instagram.com", icon: "Instagram" },
      { label: "يوتيوب", href: "https://youtube.com", icon: "Youtube" },
      { label: "تليجرام", href: "https://t.me/abdeenali520", icon: "Send" },
      { label: "واتساب", href: `https://wa.me/20102177690`, icon: "MessageCircle" },
    ],
    payments: ["الدفع كاش عند الاستلام", "فيزا / ماستركارد", "فودافون كاش", "إنستاباي InstaPay", "ميزة"],
    copyright: "© 2025 دِفء مصر. جميع الحقوق محفوظة — خدمة عملاء: abdeenali520@gmail.com",
    ctaLabel: "تواصلي معنا على الواتساب",
  },
};

const STORAGE_KEY = "difa_egypt_site_v1";
const ORDERS_KEY = "difa_egypt_orders_v1";

type SiteContextType = {
  data: SiteData;
  update: (updater: (prev: SiteData) => SiteData) => void;
  setData: (d: SiteData) => void;
  reset: () => void;
  waLink: (plan?: string) => string;
  user: AppUser | null;
  setUser: (u: AppUser | null) => void;
  loginWithGoogle: (asAdmin?: boolean) => Promise<AppUser>;
  loginCustom: (email: string, name?: string, asAdmin?: boolean) => AppUser;
  logout: () => Promise<void>;
  adminEmails: string[];
  addAdminEmail: (email: string) => void;
  removeAdminEmail: (email: string) => void;
  orders: Order[];
  addOrder: (o: Omit<Order, "id" | "date" | "status">) => Order;
  updateOrder: (id: string, patch: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  getUserOrders: () => Order[];
  exportJson: () => void;
  importJson: (json: string) => boolean;
};

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<SiteData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_DATA, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_DATA;
  });

  const [user, setUser] = useState<AppUser | null>(() => getStoredUser());
  const [adminEmails, setAdminEmailsState] = useState<string[]>(() =>
    getAdminEmails()
  );

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: "EGY-5120",
        name: "مروة عبد الرحمن",
        phone: "01098765432",
        governorate: "القاهرة (مدينة نصر)",
        plan: "الباقة الفاخرة (الأكثر طلبًا)",
        qty: 1,
        total: 1650,
        date: new Date(Date.now() - 3600000 * 5).toISOString(),
        status: "قيد الشحن",
        customerEmail: "marwa.abd@gmail.com",
        trackingNumber: "EG-POST-8921",
        notes: "تم إرسال الشحنة مع مندوب القاهرة وسيتم التسليم غداً",
      },
      {
        id: "EGY-5121",
        name: "ياسمين الشريف",
        phone: "01123456789",
        governorate: "الإسكندرية (سموحة)",
        plan: "باقة سولو (قطعة واحدة)",
        qty: 1,
        total: 1250,
        date: new Date(Date.now() - 3600000 * 20).toISOString(),
        status: "تم التوصيل",
        customerEmail: "yasmin.sherif@gmail.com",
        trackingNumber: "EG-POST-8700",
        notes: "تم الاستلام والدفع كاش للمندوب بنجاح",
      },
      {
        id: "EGY-5122",
        name: "أحمد علي عبدين",
        phone: "0102177690",
        governorate: "الجيزة",
        plan: "باقة العائلة (قطعتان)",
        qty: 1,
        total: 2200,
        date: new Date(Date.now() - 3600000 * 1).toISOString(),
        status: "مؤكد",
        customerEmail: PRIMARY_ADMIN_EMAIL,
        notes: "طلب تجريبي مباشر - تم التأكيد",
      },
    ];
  });

  useEffect(() => {
    const unsub = listenToAuth((u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
    document.title = data.site.pageTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", data.site.pageDescription);
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const update = (updater: (prev: SiteData) => SiteData) =>
    setDataState((p) => updater(structuredClone(p) as SiteData));
  const setData = (d: SiteData) => setDataState(d);

  const reset = () => {
    if (confirm("هل أنت متأكد من إعادة ضبط بيانات الموقع للوضع الافتراضي المصري؟")) {
      setDataState(DEFAULT_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const waLink = useMemo(() => {
    return (plan?: string) =>
      `https://wa.me/${data.contact.waNumber}?text=${encodeURIComponent(
        plan
          ? `مرحبًا، أودّ طلب «${plan}» من دفاية ${data.site.brandName} في مصر 🧡`
          : `مرحبًا، أودّ الاستفسار عن دفاية ${data.site.brandName} في مصر`
      )}`;
  }, [data.contact.waNumber, data.site.brandName]);

  const loginWithGoogle = async (asAdmin = false) => {
    const logged = await signInWithGoogle(asAdmin);
    setUser(logged);
    return logged;
  };

  const loginCustom = (email: string, name?: string, asAdmin = false) => {
    const logged = signInWithCustomEmail(email, name, asAdmin);
    setUser(logged);
    return logged;
  };

  const logout = async () => {
    await signOutUser();
    setUser(null);
  };

  const addAdminEmail = (email: string) => {
    const clean = email.trim().toLowerCase();
    const updated = [...new Set([...adminEmails, clean])];
    setAdminEmailsState(updated);
    saveAdminEmails(updated);
  };

  const removeAdminEmail = (email: string) => {
    const clean = email.trim().toLowerCase();
    if (clean === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
      alert("لا يمكن حذف البريد الإلكتروني الأساسي للمسؤول!");
      return;
    }
    const updated = adminEmails.filter((e) => e !== clean);
    setAdminEmailsState(updated);
    saveAdminEmails(updated);
  };

  const addOrder = (o: Omit<Order, "id" | "date" | "status">) => {
    const id = "EGY-" + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id,
      date: new Date().toISOString(),
      status: "جديد",
      customerEmail: o.customerEmail || user?.email || undefined,
      ...o,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrder = (id: string, patch: Partial<Order>) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const getUserOrders = () => {
    if (!user?.email) return [];
    const email = user.email.trim().toLowerCase();
    return orders.filter(
      (o) => o.customerEmail && o.customerEmail.trim().toLowerCase() === email
    );
  };

  const exportJson = () => {
    const blob = new Blob(
      [JSON.stringify({ data, orders, adminEmails }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `difa-egypt-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (parsed.data) setDataState(parsed.data);
      if (parsed.orders) setOrders(parsed.orders);
      if (parsed.adminEmails) {
        setAdminEmailsState(parsed.adminEmails);
        saveAdminEmails(parsed.adminEmails);
      }
      return true;
    } catch {
      return false;
    }
  };

  return (
    <SiteContext.Provider
      value={{
        data,
        update,
        setData,
        reset,
        waLink,
        user,
        setUser,
        loginWithGoogle,
        loginCustom,
        logout,
        adminEmails,
        addAdminEmail,
        removeAdminEmail,
        orders,
        addOrder,
        updateOrder,
        deleteOrder,
        getUserOrders,
        exportJson,
        importJson,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
