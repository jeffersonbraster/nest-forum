import { hash, compare } from 'bcryptjs'
import { HasherCompare } from '@/domain/forum/application/cryptography/hash-comparer'
import { HasherGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class BcryptHasher implements HasherGenerator, HasherCompare {
  hash(plain: string): Promise<string> {
    return hash(plain, 8)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
