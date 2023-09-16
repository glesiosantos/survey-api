import { ComparedFieldValidation } from '../../presentation/helpers/validators/compared_field_validation'
import { EmailFieldValidation } from '../../presentation/helpers/validators/email_field_validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required_field_validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation_composite'
import { EmailValidatorAdapter } from '../../presentation/util/email_validator_adapter'

export const makeSignupValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
