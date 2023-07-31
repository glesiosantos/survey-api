import bcrypt from 'bcrypt'
import { BCrypterAdapter } from './bcrypter_adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => { resolve('hashed_password') })
  }
}))

describe('BCrypt Adapter', () => {
  it('should call bcrypter with correct values', async () => {
    const salt = 12
    const sut = new BCrypterAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const salt = 12
    const sut = new BCrypterAdapter(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_password')
  })
})
