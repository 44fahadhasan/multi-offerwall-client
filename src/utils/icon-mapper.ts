import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export const getIconCom = (iconName: string): LucideIcon => {
  const IconCom = Icons[iconName as keyof typeof Icons];
  if (!IconCom) return Icons.HelpCircle;

  return IconCom as LucideIcon;
};
