import bcrypt from 'bcrypt'
import { BCrypterAdapter } from './bcrypter_adapter'

describe('BCrypt Adapter', () => {
  it('should call bcrypter with correct value', async () => {
    const salt = 12
    const sut = new BCrypterAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
