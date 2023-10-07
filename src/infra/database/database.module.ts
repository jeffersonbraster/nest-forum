import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswerAttachmentRepositoryRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-question-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaAnswerCommentRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaQuestionsCommentRepository } from './prisma/repositories/prisma-question-coments-repository'

@Module({
  providers: [
    PrismaService,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepositoryRepository,
    PrismaQuestionsRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaQuestionsCommentRepository,
  ],
  exports: [
    PrismaService,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerAttachmentRepositoryRepository,
    PrismaQuestionsRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaQuestionsCommentRepository,
  ],
})
export class DatabaseModule {}
