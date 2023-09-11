import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { MissingParamError, badRequest } from '../signup/signup_protocols'

export class SignInController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }
  }
}
