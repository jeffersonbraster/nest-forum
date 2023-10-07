import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get<PrismaService>(PrismaService)

    await app.init()
  })

  test('[POST] /acounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'Test',
      email: 'teste@gmail.com',
      password: '12345678',
    })

    expect(response.status).toBe(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: { email: 'teste@gmail.com' },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
