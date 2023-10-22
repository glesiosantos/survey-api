import { AddAccount, Authentication, Controller, EmailInUseError, HttpRequest, HttpResponse, Validation, badRequest, forbidden, ok, serverError } from './signup_protocols'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount, private readonly authentication: Authentication, private readonly validation: Validation) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) { return badRequest(error) }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({ name, email, password })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
