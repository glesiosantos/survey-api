import { badRequest, ok, serverError } from '../../helper/http_helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse, AddAccount } from './signup_protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'

export class SignUpController implements Controller {
  constructor (readonly emailValidator: EmailValidator, readonly addAccount: AddAccount) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))

      const account = this.addAccount.add({ name, email, password })
      return ok(account)
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
