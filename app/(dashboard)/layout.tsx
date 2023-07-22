import NavBar from '@/components/navbar';
import SideBar from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      {/* hidden in mobile devides */}
      <nav className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-900">
        <SideBar />
      </nav>
      <main className="md:pl-72">
        <NavBar />
        {children}
      </main>
    </div>
  );
}
