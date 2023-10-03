import { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id.toString() === id)
    return notification || null
  }

  async save(notification: Notification) {
    const index = this.items.findIndex(
      (item) => item.id.toString() === notification.id.toString(),
    )

    this.items[index] = notification
  }

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
