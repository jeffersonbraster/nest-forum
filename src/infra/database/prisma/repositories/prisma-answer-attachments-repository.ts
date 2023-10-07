import { Injectable } from '@nestjs/common'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

@Injectable()
export class PrismaAnswerAttachmentRepositoryRepository
  implements AnswerAttachmentRepository
{
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
