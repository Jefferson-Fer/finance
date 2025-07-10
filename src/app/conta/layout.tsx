import { redirect } from 'next/navigation'

import { Navigation } from '@/components/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PreferencesType } from '@/contracts/profile'
import { getProfile } from '@/lib/prisma/queries/cached-queries'

import { HeaderAccount } from './_components/header'

interface ContaLayoutProps {
  children: React.ReactNode
}

export default async function ContaLayout({ children }: ContaLayoutProps) {
  const profile = await getProfile()

  if (!profile) {
    return redirect('/sign-in')
  }

  const { theme } = (profile.preferences as PreferencesType) ?? {}

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={theme ?? 'system'}
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen overflow-hidden bg-muted w-full">
        <aside className="flex flex-col w-full">
          <HeaderAccount profile={profile} />

          <Navigation type="user" profile={profile} />

          <ScrollArea className="w-full">
            <div className="h-full flex flex-col gap-4 lg:gap-2 p-4 max-w-screen-xl xl:mx-auto">
              {children}
            </div>
          </ScrollArea>
        </aside>
      </div>
    </ThemeProvider>
  )
}
