import { SideBar } from "./_components/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
};

const DashboardLayout = (
    {
        children,
    }: DashboardLayoutProps
) => {
    return (
        <main className="flex min-h-screen w-full flex-col bg-muted/40">
            <SideBar />
            {children}
        </main>
    );
};

export default DashboardLayout;