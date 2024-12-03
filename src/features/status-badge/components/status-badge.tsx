import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  icon: LucideIcon;
  color: string;
  children: ReactNode;
};

export const StatusBadge = ({ icon: Icon, color, children }: Props) => (
  <div className="badge">
    <span
      className="icon"
      style={{
        backgroundColor: `var(--catppuccin-${color}`,
      }}
    >
      <Icon size="1rem" />
    </span>
    <span className="status">{children}</span>
  </div>
);
