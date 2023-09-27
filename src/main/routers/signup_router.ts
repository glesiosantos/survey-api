import { Router } from 'express'
import { makeSignupController } from '../factories/signup/signup_factory'
import { adapterRoute } from '../adapters/express/express_routes_adapter'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupController()))
}
