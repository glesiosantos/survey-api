import { ComparedFieldValidation } from '../../../presentation/helpers/validators/compared_field_validation'
import { EmailFieldValidation } from '../../../presentation/helpers/validators/email_field_validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required_field_validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation_composite'
import { EmailValidator } from '../../../presentation/protocols/email_validator'
import { makeSignUpValidation } from './signup_validation'

jest.mock('../../../presentation/helpers/validators/validation_composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Sign Up Validation', () => {
  it('should calls ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailFieldValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
