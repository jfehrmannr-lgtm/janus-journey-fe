'use server'

import CreateRootFolderView from '@/modules/dashboard/layout/WorkSidebar/DetailedFolder/CreateRootFolderView'
import { createFolderAction } from './actions'

/**
 * Renders the root Folder creation workspace in the Dashboard work-sidebar slot.
 *
 * @returns The root Folder creation workspace.
 */
const CreateRootFolderPage = async () => {
  return <CreateRootFolderView actions={{ createFolderAction }} />
}

export default CreateRootFolderPage
