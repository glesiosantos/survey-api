import { SignUpController } from './signup_controller'

describe('SignUp Controller', () => {
  it('should return 400 when no name is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  //   it('should return 400 when email is not provided', () => {
  //     const sut = new SignUpController()

  //     const httpRequest = {
  //       body: {
  //         name: 'any_name',
  //         password: 'any_password',
  //         passwordConfirmation: 'any_password'
  //       }
  //     }

//     const httpResponse = sut.handle(httpRequest)
//     expect(httpResponse.statusCode).toBe(400)
//   })
})
