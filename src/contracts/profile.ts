import { Prisma, Profile, TypeProfile } from '@prisma/client'

import { CreateProfileSchemaType } from '@/validators'

import { FindGenericList } from './commons'

export type ProfileFields = keyof Profile
export type FindProfilesList = FindGenericList<ProfileFields>

type UserGenericType = {
  id: string
  fullName: string
  preferences: Prisma.JsonValue
  email: string
  image?: string
}

export type ProfileAuth = UserGenericType & {
  role: TypeProfile
}

export type PreferencesType = {
  theme: 'light' | 'dark' | 'system'
}

export type CreateUserProfilePayload = Omit<
  CreateProfileSchemaType,
  'confirmPassword' | 'email' | 'password'
> & {
  userId: string
}

export type ProfileWithUser = Profile

export type UpdatePerfilProfilePayload = {
  id: string
  fullName: string
}

export type UpdateProfileBackupPayload = {
  id: string
}
