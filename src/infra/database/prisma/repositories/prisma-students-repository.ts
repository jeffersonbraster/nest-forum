import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    })

    return PrismaStudentMapper.toDomain(student)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPersistens(student)
    await this.prisma.user.create({
      data,
    })
  }
}
