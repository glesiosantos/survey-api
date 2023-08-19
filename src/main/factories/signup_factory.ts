import { DbAddAccount } from '../../data/usecase/account/db_add_account'
import { BCryptAdapter } from '../../infra/criptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account_mongo_repository'
import { LogMongoRepository } from '../../infra/db/mongodb/log_mongo_repository'
import { SignUpController } from '../../presentation/controllers/signup/signup_controller'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../presentation/util/email_validator_adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignupController = (): Controller => {
  const addAccountRepository = new AccountMongoRepository()
  const encrypter = new BCryptAdapter(12)
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()
  const signupController = new SignUpController(emailValidator, dbAddAccount)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logMongoRepository)
}
