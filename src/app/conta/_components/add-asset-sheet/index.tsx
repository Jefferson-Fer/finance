'use client'

import { useState } from 'react'

import { Separator } from '@radix-ui/react-dropdown-menu'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { AssetOptionTabs } from './asset-option-tabs'

export function NewAssetSheet() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="w-full flex justify-end">
        <SheetTrigger asChild>
          <Button className="md:w-[200px] flex gap-2 items-center text-muted dark:text-muted-foreground dark:bg-muted">
            <Icons.new className="size-4" />
            <span className="hidden md:block">Adicionar Ativo</span>
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent className="px-4">
        <SheetHeader>
          <SheetTitle>Adicionar Ativo</SheetTitle>
          <Separator />
        </SheetHeader>
        <SheetDescription className="sr-only">
          Adicione um novo ativo para gerenciar suas receitas e despesas.
        </SheetDescription>

        <AssetOptionTabs setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  )
}
