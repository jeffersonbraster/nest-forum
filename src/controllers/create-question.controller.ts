import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('/question')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  // constructor() {}

  @Post()
  async handle() {
    return 'Hello World'
  }
}
