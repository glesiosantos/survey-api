import { ComparedFieldValidation } from '../../presentation/helpers/validators/compared_field_validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required_field_validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSignupValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ComparedFieldValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
