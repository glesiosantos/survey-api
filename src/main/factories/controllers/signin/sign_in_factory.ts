import { makeSignInValidation } from './signin_validation'
import { makeDbAuthentication } from '../../usecases/authentication/db_authentication_factory'
import { Controller } from '../../../../presentation/protocols'
import { SignInController } from '../../../../presentation/controllers/signin/signin_controller'
import { makeLogControllerDecorator } from '../../decorators/log_controller_decorator_factory'

export const makeSignInController = (): Controller => {
  const signInController = new SignInController(makeDbAuthentication(), makeSignInValidation())
  return makeLogControllerDecorator(signInController)
}
