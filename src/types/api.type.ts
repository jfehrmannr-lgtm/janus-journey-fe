export interface ApiResponse<TPayload> {
  payload: TPayload
}

export interface Pagination {
  page: number
  size: number
  length: number
  totalRecords: number
  totalPages: number
}

export interface CollectionResponse<TItem, TFilters = Record<string, never>> extends ApiResponse<TItem[]> {
  pagination: Pagination
  filters: TFilters
}
