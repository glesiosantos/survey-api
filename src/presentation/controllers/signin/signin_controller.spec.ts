import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http_helper'
import { Controller } from '../../protocols'
import { SignInController } from './signin_controller'

type SutTypes = {
  sut: Controller
}

const makeSut = (): SutTypes => {
  const sut = new SignInController()
  return { sut }
}

describe('Sign In Controller', () => {
  it('should return 400 when no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should return 400 when no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
