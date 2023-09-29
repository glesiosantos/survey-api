import { DbAddAccount } from '../../../data/usecase/account/db_add_account'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account_mongo_repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log_mongo_repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup_controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log_controller_decorator'
import { makeSignUpValidation } from '../signup/signup_validation'

export const makeSignupController = (): Controller => {
  const addAccountRepository = new AccountMongoRepository()
  const hasher = new BCryptAdapter(12)
  const dbAddAccount = new DbAddAccount(hasher, addAccountRepository)
  const signupController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}
