import type { UserAuthProvider } from '@/types/user.type'

export interface CreateUserInput {
  authLogins: Array<{
    authLogin: string
    metadata: Record<string, unknown>
    provider: UserAuthProvider
    providerAvatarUrl: string | null
    providerEmail: string | null
    providerUsername: string | null
  }>
  config: {
    avatarUrl: string | null
    username: string
  }
  email: string
  metadata?: Record<string, unknown>
}
