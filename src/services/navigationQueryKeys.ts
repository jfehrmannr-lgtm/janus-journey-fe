import type { ResourceType } from '@/types/resource.type'

const navigationQueryKeys = {
  rootResources: () => ['navigation', 'root-resources'] as const,
  resourceTree: (resourceType: ResourceType, resourceId: string) =>
    ['navigation', 'resource-tree', resourceType, resourceId] as const
}

export { navigationQueryKeys }
