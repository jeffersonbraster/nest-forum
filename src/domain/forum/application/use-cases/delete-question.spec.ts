import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { makeQuestionAttachments } from 'test/factories/make-question-attachment'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let sut: DeleteQuestionUseCase
describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('question1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('attachment1'),
      }),
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('attachment2'),
      }),
    )

    await sut.execute({
      authorId: 'author1',
      questionId: 'question1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('question1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author2',
      questionId: 'question1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
