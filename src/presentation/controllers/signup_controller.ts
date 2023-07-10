import { MissingParamError } from '../errors/missing_param_error'
import { badRequest } from '../helpers/http_helper'
import { Controller } from '../protocols/controller'
import { HttpResponse, HttpRequest } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
