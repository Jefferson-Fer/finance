'use client'

import { ReactNode } from 'react'
import React from 'react'

import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input, InputProps, inputVariants } from '@/components/ui/input/index'
import { InputPassword } from '@/components/ui/input-password'
import { cn } from '@/lib/utils'

import { Skeleton } from '../ui/skeleton'

type InputFormProps = Omit<InputProps, 'name'> & {
  name: string
  label?: string
  labelSupport?: ReactNode
  toogleView?: boolean
  classContainer?: string
  description?: string
}

const InputForm = ({
  name,
  label,
  labelSupport,
  required,
  radii,
  className,
  type = 'text',
  toogleView,
  classContainer,
  description,
  ...rest
}: InputFormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const Component = type === 'password' && toogleView ? InputPassword : Input

  return (
    <FormItem
      className={cn('[user-select: none] flex w-full flex-col', classContainer)}
    >
      {label && (
        <FormLabel
          className="font-semibold text-muted-foreground flex items-center justify-between"
          htmlFor={name}
        >
          {label}
          {labelSupport}
        </FormLabel>
      )}
      <FormControl>
        <div>
          <Component
            type={type}
            id={name}
            {...rest}
            {...register(name, { required, onChange: rest.onChange })}
            className={cn(inputVariants({ radii, className }))}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <FormMessage>{message}</FormMessage>}
          />
          {description && <FormDescription>{description}</FormDescription>}
        </div>
      </FormControl>
    </FormItem>
  )
}

const InputFormSkeleton = ({ label }: InputFormProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <div className="font-bold flex items-center justify-between">
          {label}
        </div>
      )}
      <Skeleton className="w-full h-9" />
    </div>
  )
}

export { InputForm, InputFormSkeleton }
