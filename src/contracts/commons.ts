import { ComponentType } from 'react'

export type ParamsTypes = string | string[] | undefined

export type SearchParamsTypes = {
  searchParams: {
    [key: string]: ParamsTypes
  }
}

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export interface BreadcrumbLink {
  label: string
  href?: string
}

export interface Option {
  label: string
  value: string
  icon?: ComponentType<{ className?: string }>
}

export interface DataTableFilterField<TData> {
  label: string
  value: keyof TData
  placeholder?: string
  options?: Option[]
  className?: string
}

export type FindGenericList<TFields> = {
  limit: number
  offset: number
  fromDay?: Date
  toDay?: Date
  column?: TFields
  order?: 'asc' | 'desc'
  search?: string
}
