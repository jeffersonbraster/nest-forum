import { Module } from '@nestjs/common'
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { JwtEncrypter } from './jwt-encrypter'
import { HasherCompare } from '@/domain/forum/application/cryptography/hash-comparer'
import { BcryptHasher } from './bcrypt-hasher'
import { HasherGenerator } from '@/domain/forum/application/cryptography/hash-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HasherCompare,
      useClass: BcryptHasher,
    },
    {
      provide: HasherGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HasherCompare, HasherGenerator],
})
export class CryptographyModule {}
