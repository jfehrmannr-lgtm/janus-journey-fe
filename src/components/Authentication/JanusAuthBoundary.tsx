'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { authClient } from '@/services/authClient'
import { BffRequestError } from '@/services/bffClient'
import AuthErrorState from '@/components/Authentication/AuthErrorState'
import AuthLoadingState from '@/components/Authentication/AuthLoadingState'
import useJanusAuthStore from '@/stores/janusAuthStore'
import useUserQuery from '@/hooks/useUserQuery'

interface JanusAuthBoundaryProps {
  children: ReactNode
}

/**
 * Resolves Better Auth plus Janus User state before protected content renders.
 *
 * @param children - Route content rendered after the Janus state is resolved.
 * @returns The protected or provisioning route content.
 */
const JanusAuthBoundary = ({ children }: JanusAuthBoundaryProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const session = authClient.useSession()
  const userQuery = useUserQuery({ enabled: Boolean(session.data) && !session.isPending })
  const { isAuthenticated, isError, isProvisioning } = useJanusAuthStore()
  const setState = useJanusAuthStore((state) => state.setState)
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isProvisioningRoute = pathname === '/provisioning'

  useEffect(() => {
    if (session.isPending) {
      setState({ isAuthenticated: false, isError: false, isLoading: true, isProvisioning: false })
      return
    }

    if (!session.data) {
      setState({ isAuthenticated: false, isError: false, isLoading: false, isProvisioning: false })
      return
    }

    if (userQuery.isPending || userQuery.isFetching) {
      setState({ isAuthenticated: false, isError: false, isLoading: true, isProvisioning: false })
      return
    }

    if (userQuery.error) {
      const status = userQuery.error instanceof BffRequestError ? userQuery.error.status : undefined
      setState({
        isAuthenticated: false,
        isError: status !== 404,
        isLoading: false,
        isProvisioning: status === 404
      })
      return
    }

    if (userQuery.data) {
      setState({
        isAuthenticated: true,
        isError: false,
        isLoading: false,
        isProvisioning: false
      })
    }
  }, [
    session.data,
    session.isPending,
    setState,
    userQuery.data,
    userQuery.error,
    userQuery.isFetching,
    userQuery.isPending
  ])

  useEffect(() => {
    if (isProvisioning && isDashboardRoute) {
      router.replace('/provisioning')
      return
    }

    if (isAuthenticated && isProvisioningRoute) {
      router.replace('/dashboard/home')
      return
    }

    if (!session.isPending && !session.data && isProvisioningRoute) {
      router.replace('/login')
    }
  }, [isAuthenticated, isDashboardRoute, isProvisioning, isProvisioningRoute, router, session.data, session.isPending])

  if (isDashboardRoute) {
    if (isError) {
      return <AuthErrorState />
    }

    if (!isAuthenticated) {
      return <AuthLoadingState />
    }
  }

  if (isProvisioningRoute) {
    if (isError) {
      return <AuthErrorState />
    }

    if (!isProvisioning) {
      return <AuthLoadingState />
    }
  }

  return children
}

export default JanusAuthBoundary
