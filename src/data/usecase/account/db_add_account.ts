import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db_add_account_protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add(accountData: AddAccountModel): Promise<AccountModel | null> {
    const hashedPasswd = await this.hasher.hash(accountData.password)
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPasswd }))
    return account
  }
}
