import { expect, test } from 'vitest'
import { Slug } from './slug'

test('it shoud be able to create a new slug from test', () => {
  const slug = Slug.createFromText('Example teste @title')

  expect(slug.value).toEqual('example-teste-title')
})
