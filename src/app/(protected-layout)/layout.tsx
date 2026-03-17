import DashboardFooter from "@/components/layout/dashboard-footer";
import DashboardHeader from "@/components/layout/dashboard-header";
import DashboardSidebar from "@/components/layout/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="grow">
        <DashboardHeader />
        <main className="min-h-[calc(100vh-106px)] p-4 md:p-6">{children}</main>
        <DashboardFooter />
      </div>
    </div>
  );
}
