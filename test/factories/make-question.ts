import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      slug: Slug.create('qualquer-coisa'),
      title: faker.lorem.sentence(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.paragraph(),
      ...override,
    },
    id,
  )

  return question
}
