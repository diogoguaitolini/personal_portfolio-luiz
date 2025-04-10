"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Simply pass the props through without trying to type them explicitly
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 