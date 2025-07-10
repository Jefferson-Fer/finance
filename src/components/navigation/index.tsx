'use client'

import * as React from 'react'

import { NewAssetSheet } from '@/app/conta/_components/add-asset-sheet'
import { navigationOdin, navigationUser } from '@/config/navigation'
import { ProfileAuth } from '@/contracts/profile'

import { NavMain } from './nav-main'
import { NavigationMenu, NavigationMenuList } from '../ui/navigation-menu'

interface NavigationProps extends React.ComponentProps<typeof NavigationMenu> {
  type: 'user' | 'odin'
  profile: ProfileAuth
}

export function Navigation({
  type = 'user',
  profile,
  ...props
}: NavigationProps) {
  return (
    <div className="h-16 bg-background text-foreground px-8 flex items-center justify-between">
      <nav>
        <NavigationMenu viewport={false} {...props}>
          <NavigationMenuList>
            <NavMain
              links={type === 'user' ? navigationUser : navigationOdin}
              baseUrl={type === 'user' ? '/conta' : '/odin'}
              userType={profile.role}
            />
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="hidden md:block">
        <NewAssetSheet />
      </div>
    </div>
  )
}
