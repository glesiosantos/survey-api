import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required_field_validation'
import { Validation } from '../../protocols/validation'

const makeSut = (): Validation => new RequiredFieldValidation('field')

describe('Required Field Validation', () => {
  it('should return a Missing Param Error when validation is fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should return null when validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
