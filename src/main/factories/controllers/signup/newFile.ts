import { Validation } from '../../../../presentation/protocols/validation'
import { makeSignUpValidation } from './signup_validation'
import { ComparedFieldValidation, EmailFieldValidation, RequiredFieldValidation } from '../../../../validations/validators'
import { makeEmailValidator } from './signup_validation.spec'

describe('Sign Up Validation', () => {
  it('should calls ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailFieldValidation('email', makeEmailValidator()))
    expect(ValidationComposie).toHaveBeenCalledWith(validations)
  })
})
