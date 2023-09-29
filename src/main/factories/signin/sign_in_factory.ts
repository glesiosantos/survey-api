import { makeSignInValidation } from './signin_validation'
import { Controller } from '../../../presentation/protocols'
import { SignInController } from '../../../presentation/controllers/signin/signin_controller'
import { LogMongoRepository } from '../../../infra/db/mongodb/log_mongo_repository'
import { DBAthentication } from '../../../data/usecase/authentication/db_authentication'
import { LogControllerDecorator } from '../../decorators/log_controller_decorator'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account_mongo_repository'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt_adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt_adapter'
import env from '../../config/env'

export const makeSignInController = (): Controller => {
  const bcrypterAdapter = new BCryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwt_secret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAthentication = new DBAthentication(accountMongoRepository, bcrypterAdapter, jwtAdapter, accountMongoRepository)
  const signInController = new SignInController(dbAthentication, makeSignInValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signInController, logMongoRepository)
}
