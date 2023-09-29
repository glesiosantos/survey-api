import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => { resolve('hashed_password') })
  },
  async compare (): Promise<boolean> {
    return new Promise(resolve => { resolve(true) })
  }

}))

const salt = 12
const makeSut = (): BCryptAdapter => {
  return new BCryptAdapter(salt)
}

describe('BCrypt Adapter', () => {
  it('should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_password')
  })

  it('should throw when bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const hash = sut.hash('any_value')
    await expect(hash).rejects.toThrow()
  })

  it('should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  it('should return true when compare success', async () => {
    const sut = makeSut()
    const compare = await sut.compare('any_value', 'any_hash')
    expect(compare).toBe(true)
  })

  it('should throw when bcrypt compare is throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { throw new Error() })
    const hash = sut.compare('any_value', 'any_hash')
    await expect(hash).rejects.toThrow()
  })

  it('should return false when bcrypt compare is false', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
    const compare = await sut.compare('any_value', 'any_hash')
    expect(compare).toBe(false)
  })
})
