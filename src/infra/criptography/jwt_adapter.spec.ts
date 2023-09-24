import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt_adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => { resolve('any_token') })
  }
}))

describe('JWt Adapter', () => {
  it('should calls jwt sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id_value' }, 'secret')
  })

  it('should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt('any_id_value')
    expect(accessToken).toBe('any_token')
  })
})
