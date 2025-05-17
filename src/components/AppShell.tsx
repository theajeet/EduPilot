"use client";

import type { ReactNode } from 'react';
import { Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button'; // For mobile trigger
import { PanelLeft } from 'lucide-react'; // For mobile trigger icon

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon" className="hidden md:flex flex-col">
        <AppSidebar />
      </Sidebar>
      <div className="flex flex-col w-full">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:hidden">
          {/* SidebarTrigger is part of ui/sidebar, let's use it if it exists and works as expected */}
          {/* Or a simple button to toggle mobile sidebar state if SidebarTrigger is not suitable here */}
          <SidebarTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SidebarTrigger>
        </header>
        <SidebarInset> {/* This should be the main content wrapper from ui/sidebar */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </div>
  );
}
