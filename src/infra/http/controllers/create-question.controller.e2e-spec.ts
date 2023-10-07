import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create questions (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get<PrismaService>(PrismaService)
    jwt = moduleRef.get<JwtService>(JwtService)

    await app.init()
  })

  test('[POST] /question', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Test',
        email: 'teste@gmail.com',
        password: '12345678',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/question')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Test title',
        content: 'Test content',
        slug: '12345678',
      })

    expect(response.status).toBe(201)

    const questionOnDatabase = await prisma.question.findFirst({
      where: { title: 'Test title' },
    })

    expect(questionOnDatabase).toBeTruthy()
  })
})
