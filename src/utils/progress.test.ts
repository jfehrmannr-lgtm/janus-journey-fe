import { describe, expect, it } from 'vitest'

import { calculateProgress, calculateProgressPercentage } from './progress'
import type { Task, TaskStatus } from '@/types/resources'

const createTask = (uid: string, status: TaskStatus, isVisible = true, parentUid = 'journey-1'): Task => ({
  uid,
  type: 'task',
  parentUid,
  name: uid,
  description: '',
  status,
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

    expect(progress).toEqual({ completed: 1, discarded: 1, pending: 1, inProgress: 1, inPause: 1, total: 5 })
    expect(calculateProgressPercentage(progress)).toBe(40)
  })

  it('ignores invisible tasks regardless of their state', () => {
    const progress = calculateProgress([
      createTask('hidden-completed', 'completed', false),
      createTask('hidden-discarded', 'discarded', false),
      createTask('visible-pending', 'pending')
    ])

    expect(progress).toEqual({ completed: 0, discarded: 0, pending: 1, inProgress: 0, inPause: 0, total: 1 })
  })

  it('returns empty progress for an empty folder', () => {
    const progress = calculateProgress([])

    expect(progress).toEqual({ completed: 0, discarded: 0, pending: 0, inProgress: 0, inPause: 0, total: 0 })
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
      pending: 1,
      inProgress: 0,
      inPause: 0,
      total: 3
    })
  })
})
