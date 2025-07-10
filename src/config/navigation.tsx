import { TypeProfile } from '@prisma/client'

import { Icons } from '@/components/icons'

export type SidebarLink = {
  title: string
  url: string
  icon: keyof typeof Icons
  hideTo?: TypeProfile[]
}

export const navigationUser: SidebarLink[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'home',
  },
  {
    title: 'Receitas',
    url: '/receitas',
    icon: 'money',
  },
  {
    title: 'Despesas',
    url: '/despesas',
    icon: 'creditCard',
  },
]

export const navigationOdin: SidebarLink[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'home',
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: 'user',
  },
]
