
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react'; // Added useMemo
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { EduPilotLogo } from '@/components/icons';
import { Home, Layers, ListChecks, Library, BookMarked, FileText, CalendarDays, Settings, LogOut, FileQuestion, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

const baseNavItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
  { href: '/habits', label: 'Habit Tracker', icon: ListChecks },
  { href: '/courses', label: 'Course Catalog', icon: Library },
  { href: '/reading-log', label: 'Reading Log', icon: BookMarked },
  { href: '/notes', label: 'Note Editor', icon: FileText },
  { href: '/schedule', label: 'Lesson Tracker', icon: CalendarDays },
  { href: '/quizzes', label: 'Quizzes', icon: FileQuestion },
  { href: '/interactive-videos', label: 'Interactive Videos', icon: Video },
];

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = useMemo(() => baseNavItems.map(item => ({
    ...item,
    tooltipConfig: { children: item.label, side: 'right' as const, align: 'center' as const }
  })), []); // baseNavItems is stable

  const settingsTooltipConfig = useMemo(() => ({
    children: 'Settings', side: 'right' as const, align: 'center' as const
  }), []);

  const logoutTooltipConfig = useMemo(() => ({
    children: 'Logout', side: 'right' as const, align: 'center' as const
  }), []);


  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 group">
          <EduPilotLogo className="h-8 w-8 text-primary group-hover:animate-pulse" />
          <span className="text-xl font-semibold text-foreground group-data-[state=collapsed]:hidden">EduPilot</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        <SidebarMenu className="space-y-1 px-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')}
                  tooltip={item.tooltipConfig}
                  className={cn(
                    "justify-start w-full",
                    (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')) 
                      ? "bg-primary/10 text-primary hover:bg-primary/20" 
                      : "hover:bg-accent/50 dark:hover:bg-accent/10"
                  )}
                >
                  <span>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[state=collapsed]:hidden">{item.label}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-border group-data-[state=collapsed]:justify-center">
        <SidebarMenu className="px-2">
           <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  tooltip={settingsTooltipConfig}
                  className="justify-start w-full hover:bg-accent/50 dark:hover:bg-accent/10"
                >
                    <Link href="/settings">
                        <Settings className="h-5 w-5" />
                        <span className="group-data-[state=collapsed]:hidden">Settings</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  tooltip={logoutTooltipConfig}
                  className="justify-start w-full hover:bg-accent/50 dark:hover:bg-accent/10 text-destructive hover:text-destructive/80"
                >
                    <button onClick={() => alert('Logout clicked (mock)')}>
                        <LogOut className="h-5 w-5" />
                        <span className="group-data-[state=collapsed]:hidden">Logout</span>
                    </button>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
