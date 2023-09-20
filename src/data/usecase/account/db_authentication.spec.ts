import { LoadAccountByEmailRepository } from '../../protocols/load_account_by_email_repository'
import { AccountModel } from './db_add_account_protocols'
import { DBAthentication } from './db_authentication'

describe('DBAthentication UseCase', () => {
  it('should calls LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async loadByEmail (email: string): Promise<AccountModel> {
        const accountFake = {
          id: 'any_value',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'hashed_password'
        }
        return new Promise(resolve => resolve(accountFake))
      }
    }

    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DBAthentication(loadAccountByEmailRepositoryStub)
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
