import { Validation } from '../../../../presentation/protocols/validation'
import { ComparedFieldValidation, EmailFieldValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validations/validators'
import { EmailValidatorAdapter } from '../../../adapters/validators/email_validator_adapter'

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
