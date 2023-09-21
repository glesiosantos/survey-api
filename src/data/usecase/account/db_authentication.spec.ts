import { Authentication } from '../../../domain/usecase/authentication'
import { HashComparer } from '../../protocols/criptography/hash_comparer'
import { TokenGenerator } from '../../protocols/criptography/token_generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'
import { AccountModel } from './db_add_account_protocols'
import { DBAthentication } from './db_authentication'

type SutTypes = {
  sut: Authentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  tokenGenaratorStub: TokenGenerator
}

const makeTokenGenerate = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new TokenGeneratorStub()
}

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new HashComparerStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      const accountFake = {
        id: 'any_id_value',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'hashed_password'
      }
      return new Promise(resolve => resolve(accountFake))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGenaratorStub = makeTokenGenerate()
  const sut = new DBAthentication(loadAccountByEmailRepositoryStub, hashComparerStub, tokenGenaratorStub)
  return { sut, loadAccountByEmailRepositoryStub, hashComparerStub, tokenGenaratorStub }
}

describe('DBAthentication UseCase', () => {
  it('should calls LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should throws when LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    await expect(promise).rejects.toThrow()
  })

  it('should return null when LoadAccountByEmailRepository is null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const accessToken = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(accessToken).toBeNull()
  })

  it('should return calls HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const comparerSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(comparerSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  it('should throws when HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    await expect(promise).rejects.toThrow()
  })

  it('should return null when HashComparer is false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(accessToken).toBeNull()
  })

  it('should return calls TokenGenerator with correct id', async () => {
    const { sut, tokenGenaratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGenaratorStub, 'generate')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(generateSpy).toHaveBeenCalledWith('any_id_value')
  })

  it('should throws when TokenGenerator throws', async () => {
    const { sut, tokenGenaratorStub } = makeSut()
    jest.spyOn(tokenGenaratorStub, 'generate')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    await expect(promise).rejects.toThrow()
  })

  it('should return access token when TokenGenerator is succeed', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(accessToken).toBe('any_token')
  })
})
