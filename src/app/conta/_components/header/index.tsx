import { ProfileAuth } from '@/contracts/profile'

import { DropdownSidebarUser } from './dropdown-sidebar-user'
import { ModeToggle } from './mode-toggle'
import { NewAssetSheet } from '../add-asset-sheet'

interface HeaderAccountProps {
  profile: ProfileAuth
}

export function HeaderAccount({ profile }: HeaderAccountProps) {
  return (
    <header className="bg-header-background text-header-text-color px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex md:hidden">
          <DropdownSidebarUser profile={profile} />
        </div>
        <span className="text-xl font-semibold">Finance | Logo</span>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <div className="block md:hidden">
          <NewAssetSheet />
        </div>
        <div className="hidden md:block">
          <DropdownSidebarUser profile={profile} />
        </div>
      </div>
    </header>
  )
}
