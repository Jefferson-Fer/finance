import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button/index'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Text } from '@/components/ui/text'
import { ProfileAuth } from '@/contracts/profile'

import { DropdownLogoutButton } from './dropdown-logout-button'

interface DropdownSidebarUserProps {
  profile: ProfileAuth
}
export function DropdownSidebarUser({ profile }: DropdownSidebarUserProps) {
  const { image, fullName } = profile

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2 items-center justify-between cursor-pointer bg-transparent hover:bg-transparent text-header-text-color hover:text-header-text-color">
          <Icons.menu className="size-4" />
          <Avatar className="hidden md:block size-6 text-foreground">
            <AvatarImage src={image} alt={fullName} />
            <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={image} alt={fullName} />
            <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <Text>{fullName}</Text>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icons.creditCard className="size-4 mr-2" />
            Minha carteira
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.notifications className="size-4 mr-2" />
            Notificações
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.settings className="size-4 mr-2" />
            Configurações
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <DropdownLogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
