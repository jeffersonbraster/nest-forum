import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswerAttachmentRepositoryRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-question-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaAnswerCommentRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaQuestionsCommentRepository } from './prisma/repositories/prisma-question-coments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepositoryRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaQuestionsCommentRepository,
  ],
  exports: [
    PrismaService,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepositoryRepository,
    QuestionsRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaQuestionsCommentRepository,
  ],
})
export class DatabaseModule {}
