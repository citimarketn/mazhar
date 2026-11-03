import {
  Zap,
  ShieldCheck,
  Leaf,
  VolumeX,
  Timer,
  FlameKindling,
  Truck,
  Banknote,
  RefreshCw,
  Star,
  Sparkles,
  ThermometerSun,
  Ruler,
  Feather,
  Hand,
  Check,
  Flame,
  X,
  Menu,
  ChevronLeft,
  Clock,
  Mail,
  Phone,
  MessageCircle,
  PackageCheck,
  Send,
  User,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import type { ComponentType } from "react";

export const ICON_MAP: Record<string, ComponentType<any>> = {
  Zap,
  ShieldCheck,
  Leaf,
  VolumeX,
  Timer,
  FlameKindling,
  Truck,
  Banknote,
  RefreshCw,
  Star,
  Sparkles,
  ThermometerSun,
  Ruler,
  Feather,
  Hand,
  Check,
  Flame,
  X,
  Menu,
  ChevronLeft,
  Clock,
  Mail,
  Phone,
  MessageCircle,
  PackageCheck,
  Send,
  User,
  LogOut,
  ShoppingBag,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP).sort();

export function IconByName({
  name,
  className,
  strokeWidth,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICON_MAP[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
