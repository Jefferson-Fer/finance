'use client'

import * as React from 'react'
import { useState } from 'react'

import dayjs from 'dayjs'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, formatDate } from '@/lib/utils'

import { Icons } from '../icons'
import { Calendar2 } from './calendar2'

interface DatePickerSingleProps {
  value: string | undefined
  onChange: (value: string) => void
  className?: string
  isDisabled?: boolean
}

export function DatePickerSingle({ value, onChange }: DatePickerSingleProps) {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
  )

  const handleSelectDate = (date: Date | undefined) => {
    setDate(date)
    onChange(`${dayjs(date).add(1, 'day').format('YYYY-MM-DD')}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <Icons.calendar />
          {date ? formatDate(date as Date) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar2
          mode="single"
          showYearSwitcher={false}
          selected={date}
          onSelect={handleSelectDate}
          className="w-fit mx-auto"
          disabled={{
            before: new Date(),
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
