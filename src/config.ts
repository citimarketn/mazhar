export const WA_NUMBER = "20102177690";
export const ADMIN_EMAIL = "abdeenali520@gmail.com";
export const CURRENCY = "ج.م";
export const COUNTRY = "مصر";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  telegram: "https://t.me/abdeenali520",
  whatsapp: `https://wa.me/${WA_NUMBER}`,
};

export const waLink = (plan?: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    plan
      ? `مرحبًا، أودّ طلب باقة «${plan}» من دفاية دِفء في مصر 🧡`
      : "مرحبًا، أودّ الاستفسار عن دفاية دِفء الحريمية في مصر"
  )}`;

export const BRAND = "دِفء";

export const PRICES = {
  solo: { now: 1250, old: 1800 },
  luxe: { now: 1650, old: 2400 },
  family: { now: 2200, old: 3400 },
};
