import { Router } from 'express'
import { adapterRoute } from '../adapters/express/express_routes_adapter'
import { makeSignupController } from '../factories/controllers/signup/signup_factory'
import { makeSignInController } from '../factories/controllers/signin/sign_in_factory'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupController()))
  router.post('/signin', adapterRoute(makeSignInController()))
}
