'use client';
import { AppSidebar } from '@/components/common/Sidebar/AppSidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import useMenuStore from '@/hooks/useMenuStore';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LogOutIcon } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'universal-cookie';
import { PERMISSION_COOKIES_KEY, AUTH_COOKIES_KEY, USER_COOKIES_KEY } from '@/lib/constant';

const cookies = new Cookies();

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardChild = pathname.includes('/dashboard/');

  const { menu } = useMenuStore();

  const { isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    cookies.remove(PERMISSION_COOKIES_KEY, { path: '/' });
    cookies.remove(AUTH_COOKIES_KEY, { path: '/' });
    cookies.remove(USER_COOKIES_KEY, { path: '/' });
    router.push('/login');
  };

  return (
    isAuthenticated && (
      <SidebarProvider>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex flex-col flex-1 min-w-0">
          <SidebarInset>
            {/* Header */}
            <header className="flex sticky top-0 bg-white z-10 h-16 items-center gap-2 border-b px-4 justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      {isDashboardChild ? (
                        <Link href="/dashboard">
                          <BreadcrumbLink className="font-bold">Dashboard</BreadcrumbLink>
                        </Link>
                      ) : (
                        <BreadcrumbPage className="font-bold">Dashboard</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {isDashboardChild ? (
                      <>
                        {menu.map((item, index) => (
                          <>
                            <BreadcrumbSeparator key={index} />
                            <BreadcrumbItem key={index}>
                              {index === menu.length - 1 ? (
                                <BreadcrumbPage className="font-bold">{item.name}</BreadcrumbPage>
                              ) : (
                                <Link href={item.path}>
                                  <BreadcrumbLink className="font-bold">{item.name}</BreadcrumbLink>
                                </Link>
                              )}
                            </BreadcrumbItem>
                          </>
                        ))}
                      </>
                    ) : null}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Foto Bulat */}
              <div className="flex items-center">
                <Popover>
                  <PopoverTrigger>
                    <Image
                      src="/boy.png"
                      width={50}
                      height={50}
                      alt=""
                      className="w-11 h-11 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="py-4 px-0">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-red-500 hover:text-red-600 text-sm px-4 py-1 hover:bg-gray-50"
                    >
                      <LogOutIcon />
                      <span className="font-semibold">Logout</span>
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </header>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-4 p-3 bg-gray-100">{children}</div>
          </SidebarInset>
        </main>
      </SidebarProvider>
    )
  );
}
