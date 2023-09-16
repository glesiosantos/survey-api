import { InvalidParamError } from '../../errors'
import { ComparedFieldValidation } from './compared_field_validation'
import { Validation } from '../../protocols/validation'

const makeSut = (): Validation => new ComparedFieldValidation('field', 'fieldToCompared')

describe('Required Field Validation', () => {
  it('should return a Missing Param Error when validation is fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompared: 'other_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompared'))
  })

  it('should return null when validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompared: 'any_value' })
    expect(error).toBeFalsy()
  })
})
