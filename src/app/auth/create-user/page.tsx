import JanusAuthBoundary from '@/components/Authentication/JanusAuthBoundary'
import CreateUserScreen from '@/components/Provisioning/CreateUserScreen'

/**
 * Composes the first-time Janus User creation route.
 *
 * @returns The provisioning screen.
 */
const ProvisioningPage = () => {
  return (
    <JanusAuthBoundary>
      <CreateUserScreen />
    </JanusAuthBoundary>
  )
}

export default ProvisioningPage
