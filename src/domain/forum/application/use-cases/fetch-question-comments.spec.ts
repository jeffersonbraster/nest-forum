import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { FetchQuestionCommentUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { makeQuestionComments } from 'test/factories/make-question-comments'

let inMemoryQuestionCommentsRepository: InMemoryQuestionsCommentRepository
let sut: FetchQuestionCommentUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionsCommentRepository()
    sut = new FetchQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComments({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComments({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComments({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComments({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
