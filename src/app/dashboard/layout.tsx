import type { ReactNode } from "react";
import DashboardShell from "@/components/layouts/DashboardShell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell> {children} </DashboardShell>;
}
