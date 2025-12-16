import { FeedbackWithRelations } from './feedback'

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface FeedbackListResponse {
  feedbacks: FeedbackWithRelations[]
  total: number
}

export interface ApiError {
  error: string
  statusCode: number
  details?: any
}