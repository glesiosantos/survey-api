import { MissingParamError } from '../errors/missing_param_error'
import { badRequest } from '../helper/http_helper'
import { SignUpController } from './signup_controller'

const makeSut = () => new SignUpController()

describe('SignUp Controller', () => {
  it('should return 400 when no name is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  it('should return 400 when email is not provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should return 400 when password is not provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  it('should return 400 when password confirmation is not provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })
})
