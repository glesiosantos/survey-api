import { DbAddAccount } from '../../../../data/usecase/account/db_add_account'
import { BCryptAdapter } from '../../../../infra/criptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account_mongo_repository'
import { SignUpController } from '../../../../presentation/controllers/signup/signup_controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log_controller_decorator_factory'
import { makeDbAuthentication } from '../../usecases/authentication/db_authentication_factory'
import { makeSignUpValidation } from '../signup/signup_validation'

export const makeSignupController = (): Controller => {
  const addAccountRepository = new AccountMongoRepository()
  const hasher = new BCryptAdapter(12)
  const dbAddAccount = new DbAddAccount(hasher, addAccountRepository)
  const signupController = new SignUpController(dbAddAccount, makeDbAuthentication(), makeSignUpValidation())
  return makeLogControllerDecorator(signupController)
}
