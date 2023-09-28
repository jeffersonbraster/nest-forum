import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'

// const createAccountBodySchema = z.object({
//   name: z.string().min(4).max(20),
//   email: z.string().email(),
//   password: z.string().min(8).max(10),
// })

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/session')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  // @HttpCode(201)
  // @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' })

    return {
      token,
    }
  }
}
