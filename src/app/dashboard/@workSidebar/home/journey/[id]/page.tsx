import SelectedResourceRoute from '@/layout/WorkSidebar/SelectedResourceRoute'

interface JourneySidebarPageProps {
  params: Promise<{ id: string }>
}

const JourneySidebarPage = async ({ params }: JourneySidebarPageProps) => {
  const { id } = await params

  return <SelectedResourceRoute resourceId={id} resourceType="journey" />
}

export default JourneySidebarPage
