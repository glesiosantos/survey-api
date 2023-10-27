import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols/validation'

export class ComparedFieldValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly fieldToComparedName: string) { }
  validate(input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToComparedName]) {
      return new InvalidParamError(this.fieldToComparedName)
    }
  }
}
