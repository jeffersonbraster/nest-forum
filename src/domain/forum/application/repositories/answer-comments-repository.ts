import { PaginationParams } from '@/core/repositories/Pagination-params'
import { Answer } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentRepository {
  findById(id: string): Promise<Answer | null>
  findManyByAnswerId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  create(answerComment: Answer): Promise<void>
  delete(answerComment: Answer): Promise<void>
}
