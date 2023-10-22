import { DBAthentication } from '../../../../data/usecase/authentication/db_authentication'
import { Authentication } from '../../../../domain/usecase/authentication'
import { BCryptAdapter } from '../../../../infra/criptography/bcrypt_adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt_adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account_mongo_repository'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const accountRepository = new AccountMongoRepository()
  const hasher = new BCryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwt_secret)
  return new DBAthentication(accountRepository, hasher, jwtAdapter, accountRepository)
}
