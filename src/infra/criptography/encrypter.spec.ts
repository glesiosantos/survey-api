import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => { resolve('hashed_password') })
  }
}))

const salt = 12
const makeSut = (): BCryptAdapter => {
  return new BCryptAdapter(salt)
}

describe('BCrypt Adapter', () => {
  it('should call bcrypter with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_password')
  })

  it('should throw when bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const hash = sut.encrypt('any_value')
    await expect(hash).rejects.toThrow()
  })
})
