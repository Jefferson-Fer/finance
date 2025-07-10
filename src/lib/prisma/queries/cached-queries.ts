'use server'

import { unstable_cache } from 'next/cache'

import { FindExpenseFields } from '@/contracts/expense'
import { FindRevenueFields } from '@/contracts/revenue'
import { createServerClient } from '@/lib/supabase/server'

import * as Queries from './no-cached-queries'

const THREE_MINUTES = 180
const FIVE_MINUTES = 300
//const ONE_HOUR = 3600

export const getUser = async () => {
  const supabase = await createServerClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return null
  }

  return unstable_cache(
    async () => {
      return Queries.getUserQuery(data.user.id)
    },
    ['user', data.user.id],
    {
      tags: [`user_${data.user.id}`],
      revalidate: THREE_MINUTES,
    },
  )()
}

export const getProfile = async () => {
  const user = await getUser()

  if (!user) {
    return null
  }

  return unstable_cache(
    async () => {
      return Queries.getProfileQuery(user)
    },
    ['profile', user.id],
    {
      tags: [`profile_${user.id}`],
      revalidate: THREE_MINUTES,
    },
  )()
}

export const getRevenuesList = async (
  profileId: string,
  params: FindRevenueFields,
) => {
  return unstable_cache(
    (params, profileId) => {
      return Queries.getRevenuesListQuery(profileId, params)
    },
    ['RevenuesList', JSON.stringify(params)],
    {
      tags: ['revenues_list' + profileId],
      revalidate: FIVE_MINUTES,
    },
  )(params, profileId)
}

export const getExpensesList = async (
  profileId: string,
  params: FindExpenseFields,
) => {
  return unstable_cache(
    (params, profileId) => {
      return Queries.getExpensesListQuery(profileId, params)
    },
    ['ExpensesList', JSON.stringify(params)],
    {
      tags: ['expenses_list' + profileId],
      revalidate: FIVE_MINUTES,
    },
  )(params, profileId)
}

export const getAssetsAllList = async (profileId: string) => {
  return unstable_cache(
    (profileId) => {
      return Queries.getAssetsAllListQuery(profileId)
    },
    ['AssetsAllList', JSON.stringify(profileId)],
    {
      tags: ['assets_all_list' + profileId],
      revalidate: FIVE_MINUTES,
    },
  )(profileId)
}
