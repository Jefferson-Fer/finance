import { useMemo, useState } from 'react'

import { Command as CommandPrimitive } from 'cmdk'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

import { InputVariantProps } from './input/styles'
import { LoadingOnButton } from './loading'
import { Text } from './text'
import { Icons } from '../icons'
import { Input } from './input/index'

type Props<T extends string> = InputVariantProps & {
  selectedValue: T
  onSelectedValueChange: (value: T) => void
  searchValue: string
  onSearchValueChange: (value: string) => void
  items: { value: T; label: string }[]
  isLoading?: boolean
  emptyMessage?: string
  emptyAction?: React.ReactNode
  placeholder?: string
  className?: string
  disabled?: boolean
  disableAutoFocus?: boolean
}

export function SearchPopover<T extends string>({
  disabled,
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = 'Nenhum item encontrado.',
  placeholder = 'Pesquisar...',
  emptyAction,
  disableAutoFocus = false,
}: Props<T>) {
  const [open, setOpen] = useState(false)

  const labels = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.value] = item.label
          return acc
        },
        {} as Record<string, string>,
      ),
    [items],
  )

  const reset = () => {
    onSelectedValueChange('' as T)
    onSearchValueChange('')
  }

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset()
    } else {
      onSelectedValueChange(inputValue as T)
      onSearchValueChange(labels[inputValue] ?? '')
    }
    setOpen(false)
  }

  const handleFocus = () => {
    if (!disableAutoFocus) {
      setOpen(true)
    }
  }

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input asChild>
              <Input
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => onSearchValueChange(e.target.value)}
                onKeyDown={(e) => setOpen(e.key !== 'Escape')}
                onMouseDown={() => setOpen((open) => !!searchValue || !open)}
                onFocus={handleFocus}
                disabled={disabled}
              />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute('cmdk-input')
              ) {
                e.preventDefault()
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <Text
                    scale="sm"
                    className="w-full p-1 flex items-center gap-1"
                  >
                    <LoadingOnButton
                      defaultText="Carregando..."
                      onActionText="Carregando..."
                      isLoading={isLoading}
                    />
                  </Text>
                </CommandPrimitive.Loading>
              )}
              {items.length > 0 && !isLoading ? (
                <ScrollArea className="h-60">
                  <CommandGroup>
                    {items.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onMouseDown={(e) => e.preventDefault()}
                        onSelect={onSelectItem}
                      >
                        <Icons.check
                          className={cn(
                            'mr-2 size-4',
                            selectedValue === option.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              ) : null}
              {!isLoading && items.length === 0 ? (
                <CommandEmpty className="flex flex-col items-center justify-center py-4 px-2">
                  <Text scale="sm">{emptyMessage ?? 'No items.'}</Text>
                  {emptyAction && emptyAction}
                </CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  )
}
