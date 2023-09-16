import { EmailFieldValidation } from '../../../presentation/helpers/validators/email_field_validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required_field_validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation_composite'
import { EmailValidator } from '../../../presentation/protocols/email_validator'
import { makeSignInValidation } from './signin_validation'

jest.mock('../../../presentation/helpers/validators/validation_composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Sign In Validation', () => {
  it('should calls ValidationComposite with all validations', () => {
    makeSignInValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailFieldValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
