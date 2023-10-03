import { expect } from 'vitest'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentsUseCase } from './delete-answer-comment'
import { makeAnswerComments } from 'test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentsUseCase
describe('Delete Answer Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })
  it('should be able to delete a Answer comment', async () => {
    const AnswerComments = makeAnswerComments()

    await inMemoryAnswerCommentRepository.create(AnswerComments)

    await sut.execute({
      answerCommentId: AnswerComments.id.toString(),
      authorId: AnswerComments.authorId.toString(),
    })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a Answer comment', async () => {
    const AnswerComments = makeAnswerComments({
      authorId: new UniqueEntityID('1'),
    })

    await inMemoryAnswerCommentRepository.create(AnswerComments)

    const result = await sut.execute({
      answerCommentId: AnswerComments.id.toString(),
      authorId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
