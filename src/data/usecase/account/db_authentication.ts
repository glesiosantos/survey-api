import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { HashComparer } from '../../protocols/criptography/hash_comparer'
import { TokenGenerator } from '../../protocols/criptography/token_generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'
import { UpdateAccessTokenRepository } from '../../protocols/db/update_access_token_repository'

export class DBAthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
