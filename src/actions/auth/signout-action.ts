'use server'

import { createServerClient } from '@/lib/supabase/server'

export async function signOutAction() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.auth.signOut({
    scope: 'local',
  })

  if (error || !user) {
    throw new Error('Error logging out')
  }

  /*revalidatePath('/', 'layout')
  revalidateTag(`user_${user.id}`)*/

  return { success: true }
}
