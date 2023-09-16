import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required_field_validation'

describe('Required Field Validation', () => {
  it('should return a Missing Param Error when validation is fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('should return null when validation succeeds', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
