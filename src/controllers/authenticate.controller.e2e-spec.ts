import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate (E2E)', () => {
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

  test('[POST] /session', async () => {
    await prisma.user.create({
      data: {
        name: 'Test',
        email: 'teste@gmail.com',
        password: await hash('12345678', 8),
      },
    })

    const response = await request(app.getHttpServer()).post('/session').send({
      email: 'teste@gmail.com',
      password: '12345678',
    })

    expect(response.status).toBe(201)

    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
