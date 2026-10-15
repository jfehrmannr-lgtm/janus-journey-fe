export type UserAuthProvider = 'platform' | 'google' | 'github' | 'microsoft'

export interface UserConfig {
  username: string
  avatarUrl: string | null
}

export interface AuthLogin {
  authLogin: string
  provider: UserAuthProvider
  providerEmail: string | null
  providerUsername: string | null
  providerAvatarUrl: string | null
  metadata: Record<string, unknown>
  createdAt: string
  lastLoginAt: string
}

export interface User {
  id: string
  userId: string
  email: string
  isVerified: boolean
  authLogins: AuthLogin[]
  config: UserConfig
}
