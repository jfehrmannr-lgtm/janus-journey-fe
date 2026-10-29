import { describe, expect, it } from 'vitest'

import { calculateProgress, calculateProgressPercentage } from './progress'
import type { Task, TaskState } from '@/types/resource.type'

const createTask = (uid: string, state: TaskState, isVisible = true, parentUid = 'journey-1'): Task => ({
  uid,
  type: 'task',
  parent: { uid: parentUid, type: 'journey' },
  name: uid,
  description: null,
  metadata: {},
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  lastActivityAt: '2026-01-01T00:00:00.000Z',
  state,
  isVisible,
  orderIndex: 0
})

describe('calculateProgress', () => {
  it('counts completed, discarded, and unresolved visible tasks', () => {
    const progress = calculateProgress([
      createTask('completed', 'completed'),
      createTask('discarded', 'discarded'),
      createTask('pending', 'pending'),
      createTask('in-progress', 'in-progress'),
      createTask('in-pause', 'in-pause')
    ])

    expect(progress).toEqual({ completed: 1, discarded: 1, total: 5, percentage: 40 })
    expect(calculateProgressPercentage(progress)).toBe(40)
  })

  it('ignores invisible tasks regardless of their state', () => {
    const progress = calculateProgress([
      createTask('hidden-completed', 'completed', false),
      createTask('hidden-discarded', 'discarded', false),
      createTask('visible-pending', 'pending')
    ])

    expect(progress).toEqual({ completed: 0, discarded: 0, total: 1, percentage: 0 })
  })

  it('returns empty progress for an empty folder', () => {
    const progress = calculateProgress([])

    expect(progress).toEqual({ completed: 0, discarded: 0, total: 0, percentage: 0 })
    expect(calculateProgressPercentage(progress)).toBe(0)
  })

  it('aggregates direct Journey tasks and tasks from multiple folders', () => {
    const directJourneyTasks = [createTask('direct-complete', 'completed')]
    const firstFolderTasks = [createTask('folder-one-pending', 'pending', true, 'folder-1')]
    const secondFolderTasks = [
      createTask('folder-two-discarded', 'discarded', true, 'folder-2'),
      createTask('folder-two-hidden', 'completed', false, 'folder-2')
    ]

    expect(calculateProgress([...directJourneyTasks, ...firstFolderTasks, ...secondFolderTasks])).toEqual({
      completed: 1,
      discarded: 1,
      total: 3,
      percentage: 66.66666666666666
    })
  })
})
