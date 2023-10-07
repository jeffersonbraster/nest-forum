import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch recent questions (E2E)', () => {
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

  test('[GET] /question', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Test',
        email: 'teste@gmail.com',
        password: '12345678',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'Test title',
          content: 'Test content',
          slug: '12345678',
          authorId: user.id,
        },
        {
          title: 'Test title 2',
          content: 'Test content 2',
          slug: '123456789',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .post('/question')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(200)

    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({
          title: 'Test title',
        }),
        expect.objectContaining({
          title: 'Test title 2',
        }),
      ],
    })
  })
})
