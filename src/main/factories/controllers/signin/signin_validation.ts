import { EmailFieldValidation, RequiredFieldValidation, ValidationComposite } from '../../../../presentation/helpers/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../adapters/validators/email_validator_adapter'

export const makeSignInValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailFieldValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}