import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email_validator'
import { Validation } from './validation'

export class EmailFieldValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidatior: EmailValidator) {}
  validate (input: any): Error {
    const isValid = this.emailValidatior.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
