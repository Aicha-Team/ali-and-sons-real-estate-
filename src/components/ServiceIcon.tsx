import { Users, Presentation, Wifi, ShieldCheck, Router, Coffee, Mail, LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Users,
  Presentation,
  Wifi,
  ShieldCheck,
  Router,
  Coffee,
  Mail,
};

export default function ServiceIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Users;
  return <Icon size={size} />;
}
