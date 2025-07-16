'use client'

import { useMemo } from 'react'

import { TypeProfile } from '@prisma/client'
import { useSelectedLayoutSegment } from 'next/navigation'

import { SidebarLink } from '@/config/navigation'
import { cn } from '@/lib/utils'

import { Icons } from '../icons'
import { ButtonLink } from '../ui/button-link'
import { NavigationMenuItem, NavigationMenuLink } from '../ui/navigation-menu'

interface NavMainProps {
  links: SidebarLink[]
  baseUrl: string
  userType: TypeProfile
}

export function NavMain({ links, baseUrl, userType }: NavMainProps) {
  const segment = useSelectedLayoutSegment()

  const sidebarLinksWithActived = useMemo(() => {
    return links
      .filter((link) => !link.hideTo?.includes(userType))
      .map((link) => ({
        ...link,
        actived:
          (link && link.url?.includes(String(segment))) ||
          (link.url === '/' && !segment),
      }))
  }, [links, segment, userType])

  return sidebarLinksWithActived.map(({ actived, icon, title, url }) => {
    const Icon = Icons[icon as keyof typeof Icons]
    return (
      <NavigationMenuItem key={title}>
        <NavigationMenuLink asChild>
          <ButtonLink
            className={cn(
              'flex flex-row items-center justify-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-foreground group-[.isOpen]:justify-center h-8',
              {
                'text-foreground': actived,
              },
            )}
            variant="ghost"
            href={`${baseUrl}${url}`}
          >
            {Icon && (
              <Icon className={cn('h-4 w-4', { 'text-foreground': actived })} />
            )}
            <span>{title}</span>
          </ButtonLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  })
}
