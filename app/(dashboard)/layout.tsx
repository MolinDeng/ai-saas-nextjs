import SideBar from '@/components/sidebar';
import SideBarButton from '@/components/sidebar-button';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import { UserButton } from '@clerk/nextjs';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
      {/* hidden in mobile devides */}
      <nav className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-10 bg-gray-900">
        <SideBar apiLimitCount={apiLimitCount} isPro={isPro} />
      </nav>
      <main className="md:pl-72">
        <div className="md:hidden flex items-center py-4 px-10">
          <SideBarButton>
            <SideBar apiLimitCount={apiLimitCount} isPro={isPro} />
          </SideBarButton>
          <div className="flex w-full justify-end px-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <div className="md:pt-12 container max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
