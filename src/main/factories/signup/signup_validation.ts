import { EmailFieldValidation, ValidationComposite, RequiredFieldValidation, ComparedFieldValidation } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../presentation/util/email_validator_adapter'

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
