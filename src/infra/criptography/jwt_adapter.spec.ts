import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt_adapter'

describe('JWt Adapter', () => {
  it('should calls jwt sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id_value' }, 'secret')
  })
})
