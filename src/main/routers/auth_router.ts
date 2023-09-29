import { Router } from 'express'
import { makeSignupController } from '../factories/signup/signup_factory'
import { adapterRoute } from '../adapters/express/express_routes_adapter'
import { makeSignInController } from '../factories/signin/sign_in_factory'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupController()))
  router.post('/signin', adapterRoute(makeSignInController()))
}
