import { expect } from 'vitest'
import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'

let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase
describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })
  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'nova notificação',
      content: 'nova notificação',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
