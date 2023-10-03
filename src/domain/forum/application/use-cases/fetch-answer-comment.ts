import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

interface FetchanswerCommentUseCaseRequest {
  answerId: string
  page: number
}

type FetchanswerCommentUseCaseResponse = Either<
  null,
  {
    answerComments: Answer[]
  }
>

export class FetchAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchanswerCommentUseCaseRequest): Promise<FetchanswerCommentUseCaseResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({ answerComments })
  }
}
