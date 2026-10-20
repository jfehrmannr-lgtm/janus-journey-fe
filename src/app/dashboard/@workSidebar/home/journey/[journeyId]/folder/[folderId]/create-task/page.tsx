import Link from 'next/link'

interface JourneyFolderPageCreateTaskProps {
  params: Promise<{
    journeyId: string
    folderId: string
  }>
}

const JourneyFolderPageCreateTask = async ({ params }: JourneyFolderPageCreateTaskProps) => {
  const { journeyId, folderId } = await params

  return (
    <div className="flex flex-col gap-3">
      <h2>Selected Folder: {folderId}</h2>

      <Link href={`/dashboard/home/journey/${journeyId}`}>Back to Journey</Link>
    </div>
  )
}

export default JourneyFolderPageCreateTask
