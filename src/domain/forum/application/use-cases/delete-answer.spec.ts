import { expect } from 'vitest'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments'
import { makeAnswerAttachments } from 'test/factories/make-answer-attachment'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase
describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('answer1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('attachment1'),
      }),
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('attachment2'),
      }),
    )

    await sut.execute({
      authorId: 'author1',
      answerId: 'answer1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author1'),
      },
      new UniqueEntityID('answer1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author2',
      answerId: 'answer1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
