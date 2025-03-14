'use client';
import * as React from 'react';
import {
  Activity,
  ChevronRight,
  DatabaseZap,
  LayoutDashboardIcon,
  Users,
  Wallet,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { usePermissionStore } from '@/store/permissionStore';
import Image from 'next/image';

const menus = [
  {
    title: 'Dashboard',
    url: '/',
    icon: <LayoutDashboardIcon />,
  },
  {
    title: 'Master Data',
    url: 'masterdata',
    icon: <DatabaseZap />,
    items: [
      {
        title: 'User',
        url: '/masterdata/user',
        permission: 'VIEW.USER',
      },
      {
        title: 'Role',
        url: '/masterdata/role',
        permission: 'VIEW.ROLE',
      },
      {
        title: 'Permission',
        url: '/masterdata/permission',
        permission: 'VIEW.PERMISSION',
      },
      {
        title: 'Menu',
        url: '/masterdata/menu',
        permission: 'VIEW.MENU',
      },
    ],
  },
  {
    title: 'Activity',
    url: 'activity',
    icon: <Activity />,
    items: [
      {
        title: 'Attendance',
        url: '/activity/attendance',
        permission: 'VIEW.ATTENDANCE',
      },
      {
        title: 'Leave',
        url: '/activity/leave',
        permission: 'VIEW.LEAVE',
      },
    ],
  },
  {
    title: 'Finance',
    url: 'finance',
    icon: <Wallet />,
    items: [
      {
        title: 'Payroll',
        url: '/finance/payroll',
        permission: 'VIEW.PAYROLL',
      },
      {
        title: 'Reimburse',
        url: '/finance/reimburse',
        permission: 'VIEW.REIMBURSE',
      },
    ],
  },
  {
    title: 'Human Resource',
    url: 'hr',
    icon: <Users />,
    items: [
      {
        title: 'Job Title',
        url: '/hr/job-title',
        permission: 'VIEW.JOB_TITLE',
      },
      {
        title: 'Department',
        url: '/hr/department',
        permission: 'VIEW.DEPARTMENT',
      },
      {
        title: 'Employee',
        url: '/hr/employee',
        permission: 'VIEW.EMPLOYEE',
      },
      {
        title: 'Recruitment',
        url: '/hr/recruitment',
        permission: 'VIEW.RECRUITMENT',
      },
      {
        title: 'Training',
        url: '/hr/training',
        permission: 'VIEW.TRAINING',
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const { hasPermission } = usePermissionStore();

  const filteredMenus = menus
    .map((item) => ({
      ...item,
      items: item.items?.filter((subItem) => hasPermission(subItem.permission)),
    }))
    .filter((item) => !item.items || item.items.length > 0);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-center items-center w-full">
          <Image src="/kny.png" alt="logo" width={50} height={50} />
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {filteredMenus.map((item) => {
          if (item.items && item.items.length > 0) {
            return (
              <Collapsible
                asChild
                key={item.title}
                title={item.title}
                defaultOpen={pathname.includes(item.url)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} keepOpenOnMobile>
                      <div className="flex w-7">{item.icon}</div>
                      {item.title}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname.includes(subItem.url)}
                            className="pl-2"
                          >
                            <Link href={`/dashboard${subItem.url}`} prefetch>
                              {subItem.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={pathname.includes(item.url) && item.url != '/'}
              >
                <div className="flex w-7">{item.icon}</div>
                <Link href={`/dashboard/${item.url}`} prefetch>
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>

      <SidebarRail />
    </Sidebar>
  );
}
