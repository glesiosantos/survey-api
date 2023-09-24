import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt_adapter'
import { Encrypter } from '../../data/protocols/criptography/encrypter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => { resolve('any_token') })
  }
}))

const secretToken = 'secret'

const makeSut = (): Encrypter => new JwtAdapter(secretToken)

describe('JWt Adapter', () => {
  it('should calls jwt sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id_value' }, 'secret')
  })

  it('should return a token on sign success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt('any_id_value')
    expect(accessToken).toBe('any_token')
  })

  it('should throw when sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt('any_id_value')
    await expect(promise).rejects.toThrow()
  })
})
