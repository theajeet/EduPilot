
"use client";

import { Moon, Sun } from 'lucide-react';
import { useCustomTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useCustomTheme();

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={toggleTheme}
      className="w-full sm:w-auto flex items-center justify-center gap-2"
    >
      {theme === 'light' ? (
        <>
          <Sun className="h-5 w-5" /> Switch to Dark Mode
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" /> Switch to Light Mode
        </>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
