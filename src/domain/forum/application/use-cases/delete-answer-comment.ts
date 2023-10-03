import { Either, left, right } from '@/core/either'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteQuestionCommentsUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteQuestionCommentsUseCaseRequest): Promise<DeleteAnswerCommentsUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId,
    )

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answerComment)

    return right(null)
  }
}
