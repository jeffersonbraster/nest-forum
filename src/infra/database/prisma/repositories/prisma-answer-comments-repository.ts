import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repositories/Pagination-params'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer-comment'

@Injectable()
export class PrismaAnswerCommentRepository implements AnswerCommentRepository {
  findById(id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.')
  }

  findManyByAnswerId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    throw new Error('Method not implemented.')
  }

  create(answerComment: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(answerComment: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
