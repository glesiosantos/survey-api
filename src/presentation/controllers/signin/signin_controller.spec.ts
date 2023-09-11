import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http_helper'
import { SignInController } from './signin_controller'

describe('Sign In Controller', () => {
  it('should return 400 when no email is provided', async () => {
    const sut = new SignInController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
