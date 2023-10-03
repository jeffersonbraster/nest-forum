import { expect } from 'vitest'
import { InMemoryQuestionsCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { DeleteQuestionCommentsUseCase } from './delete-question-comments'
import { makeQuestionComments } from 'test/factories/make-question-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryQuestionCommentRepository: InMemoryQuestionsCommentRepository
let sut: DeleteQuestionCommentsUseCase
describe('Delete Question Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionsCommentRepository()
    sut = new DeleteQuestionCommentsUseCase(inMemoryQuestionCommentRepository)
  })
  it('should be able to delete a question comment', async () => {
    const questionComments = makeQuestionComments()

    await inMemoryQuestionCommentRepository.create(questionComments)

    await sut.execute({
      questionCommentId: questionComments.id.toString(),
      authorId: questionComments.authorId.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment', async () => {
    const questionComments = makeQuestionComments({
      authorId: new UniqueEntityID('1'),
    })

    await inMemoryQuestionCommentRepository.create(questionComments)

    const result = await sut.execute({
      questionCommentId: questionComments.id.toString(),
      authorId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
