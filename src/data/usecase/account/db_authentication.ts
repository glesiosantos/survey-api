import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { HashComparer } from '../../protocols/criptography/hash_comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'

export class DBAthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }
    return null
  }
}
