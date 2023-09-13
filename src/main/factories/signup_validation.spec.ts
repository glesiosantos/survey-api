import { RequiredFieldValidation } from '../../presentation/helpers/validators/required_field_validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeSignupValidation } from './signup_validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('Sign Up Validation', () => {
  it('should calls ValidationComposite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
