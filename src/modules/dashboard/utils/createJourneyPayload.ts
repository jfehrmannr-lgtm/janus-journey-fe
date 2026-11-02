import type {
  CreateJourneyFolderDraft,
  CreateJourneyDraftTaskPayload,
  CreateJourneyFormState,
  CreateJourneyComposePayload,
  CreateJourneyTaskDraft
} from '@/types/createJourney'

const defaultJourneyImageUrl = '/janus_journey_backgrounds/mount-sunrise.png'
const resourceNameMaxLength = 100
const resourceDescriptionMaxLength = 500

const createClientId = (prefix: string): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/**
 * Creates a new empty draft Task with a client-only identifier.
 *
 * @returns An empty Task form item.
 */
const createEmptyTask = (): CreateJourneyTaskDraft => ({
  clientId: createClientId('task'),
  name: '',
  description: '',
  state: 'pending',
  isVisible: true
})

/**
 * Creates a new empty draft Folder with a client-only identifier.
 *
 * @returns An empty Folder form item.
 */
const createEmptyFolder = (): CreateJourneyFolderDraft => ({
  clientId: createClientId('folder'),
  name: '',
  description: '',
  tasks: []
})

/**
 * Creates the initial local state for a Create Journey form.
 *
 * @returns A clean Create Journey form state.
 */
const createInitialCreateJourneyFormState = (): CreateJourneyFormState => ({
  name: '',
  description: '',
  imgUrl: defaultJourneyImageUrl,
  folders: [],
  tasks: []
})

/**
 * Converts a draft Task into its frontend-only payload representation.
 *
 * @param task - Local Task form data.
 * @param orderIndex - Deterministic position within its parent collection.
 * @returns A payload Task without client-only identifiers.
 */
const buildTaskPayload = (task: CreateJourneyTaskDraft, orderIndex: number): CreateJourneyDraftTaskPayload => ({
  name: task.name.trim(),
  description: task.description.trim() || null,
  state: task.state,
  isVisible: task.isVisible,
  orderIndex
})

/**
 * Builds the nested frontend draft that will be logged for future contract review.
 *
 * @param formState - Current local Create Journey form state.
 * @returns A parentless hierarchical Journey draft payload.
 */
const buildCreateJourneyPayload = (formState: CreateJourneyFormState): CreateJourneyComposePayload => ({
  imgUrl: defaultJourneyImageUrl,
  name: formState.name.trim(),
  description: formState.description.trim() || null,
  folders: formState.folders.map((folder, folderIndex) => ({
    name: folder.name.trim(),
    clientId: folder.clientId.trim(),
    description: folder.description.trim() || null,
    orderIndex: folderIndex,
    tasks: folder.tasks.map((task, taskIndex) => buildTaskPayload(task, taskIndex))
  })),
  tasks: formState.tasks.map((task, taskIndex) => buildTaskPayload(task, taskIndex))
})

/**
 * Validates required names throughout a Create Journey draft.
 *
 * @param formState - Current local Create Journey form state.
 * @returns Human-readable validation messages, or an empty array when valid.
 */
const getCreateJourneyValidationErrors = (formState: CreateJourneyFormState): string[] => {
  const errors: string[] = []

  if (formState.name.trim().length === 0 || formState.name.trim().length > resourceNameMaxLength) {
    errors.push(`Journey name is required and must be between 1 and ${resourceNameMaxLength} characters.`)
  }
  if (formState.description.length > resourceDescriptionMaxLength) {
    errors.push(`Journey description must be ${resourceDescriptionMaxLength} characters or fewer.`)
  }

  formState.folders.forEach((folder, folderIndex) => {
    if (folder.name.trim().length === 0 || folder.name.trim().length > resourceNameMaxLength) {
      errors.push(`Folder ${folderIndex + 1} needs a name between 1 and ${resourceNameMaxLength} characters.`)
    }
    if (folder.description.length > resourceDescriptionMaxLength) {
      errors.push(`Folder ${folderIndex + 1} description must be ${resourceDescriptionMaxLength} characters or fewer.`)
    }

    folder.tasks.forEach((task, taskIndex) => {
      if (task.name.trim().length === 0 || task.name.trim().length > resourceNameMaxLength) {
        errors.push(
          `Task ${taskIndex + 1} in Folder ${folderIndex + 1} needs a name between 1 and ${resourceNameMaxLength} characters.`
        )
      }
      if (task.description.length > resourceDescriptionMaxLength) {
        errors.push(
          `Task ${taskIndex + 1} in Folder ${folderIndex + 1} description must be ${resourceDescriptionMaxLength} characters or fewer.`
        )
      }
    })
  })

  formState.tasks.forEach((task, taskIndex) => {
    if (task.name.trim().length === 0 || task.name.trim().length > resourceNameMaxLength) {
      errors.push(`Root Task ${taskIndex + 1} needs a name between 1 and ${resourceNameMaxLength} characters.`)
    }
    if (task.description.length > resourceDescriptionMaxLength) {
      errors.push(`Root Task ${taskIndex + 1} description must be ${resourceDescriptionMaxLength} characters or fewer.`)
    }
  })

  return errors
}

export {
  buildCreateJourneyPayload,
  createEmptyFolder,
  createEmptyTask,
  createInitialCreateJourneyFormState,
  getCreateJourneyValidationErrors,
  resourceDescriptionMaxLength,
  resourceNameMaxLength
}
