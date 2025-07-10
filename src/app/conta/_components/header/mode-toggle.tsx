'use client'

import { useCallback, useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === 'light' || theme === null ? 'dark' : 'light')
  }, [theme, setTheme])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault()
        handleChangeTheme()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleChangeTheme])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // ou um fallback
  }

  return (
    <div className="flex items-center gap-2" suppressHydrationWarning>
      <Button
        onClick={handleChangeTheme}
        variant="ghost"
        size="icon"
        className="cursor-pointer bg-transparent hover:bg-transparent text-header-text-color hover:text-header-text-color"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Icons.sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-100 dark:-rotate-90" />
        ) : (
          <Icons.moon className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-100 dark:-rotate-90" />
        )}
      </Button>
    </div>
  )
}
