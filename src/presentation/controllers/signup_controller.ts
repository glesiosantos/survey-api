import { badRequest, serverError } from '../helper/http_helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'

export class SignUpController implements Controller {
  constructor (readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
