import { Router } from 'express'
import { makeSignupController } from '../factories/signup_factory'
import { adapterRoute } from '../adapters/express_routes_adapter'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupController()))
}
