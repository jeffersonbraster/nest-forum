import { expect } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository'
import { makeQuestionAttachments } from 'test/factories/make-question-attachment'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let sut: EditQuestionUseCase
describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    )
  })
  it('should be able to edit a question', async () => {
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
      questionId: newQuestion.id.toString(),
      title: 'New Title edit',
      content: 'New Content',
      attachmentsIds: ['attachment1', 'attachment3'],
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New Title edit',
      content: 'New Content',
    })

    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('question1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author2',
      questionId: newQuestion.id.toString(),
      title: 'New Title edit',
      content: 'New Content',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
