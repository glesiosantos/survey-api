import { badRequest } from '../helper/http_helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing_param_error'
import { EmailValidator } from '../protocols/email_validator'
import { InvalidParamError } from '../errors/invalid_param_error'

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
    } catch (error) {
      return { statusCode: 500, body: new Error('Server Internal Error') }
    }
  }
}
