'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
  try {
    return useNextTheme()
  } catch {
    return {
      theme: 'dark',
      setTheme: () => {},
      resolvedTheme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
    }
  }
}
