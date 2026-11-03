'use client'

import { ApiFolderWithTasks } from '@/types/resource-api.type'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { navigationQueryKeys } from '@/services/navigationQueryKeys'
import FolderItem from '../Items/FolderItem'

interface FolderBodyProps {
  folderId: string
}

const FolderBody = ({ folderId }: FolderBodyProps) => {
  const queryClient = useQueryClient()

  const { data: folder } = useQuery<ApiFolderWithTasks>({
    enabled: false,
    queryFn: () => {
      const cachedJourney = queryClient.getQueryData<ApiFolderWithTasks>(
        navigationQueryKeys.resourceTree('folder', folderId)
      )

      if (!cachedJourney) {
        throw new Error('The Journey resource is not available in the query cache.')
      }

      return cachedJourney
    },
    queryKey: navigationQueryKeys.resourceTree('folder', folderId)
  })

  if (!folder || !('tasks' in folder)) {
    return <div className="px-5 py-6 text-sm text-text-muted">Invalid Folder resource</div>
  }

  return (
    <div>
      <FolderItem folder={folder} />
    </div>
  )
}

export default FolderBody
