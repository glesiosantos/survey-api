import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load_account_by_email_repository'

export class DBAthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}
  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return null
  }
}
