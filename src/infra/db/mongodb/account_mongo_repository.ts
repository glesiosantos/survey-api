import { AddAccountRepository } from '../../../data/protocols/db/add_account_repository'
import { LoadAccountByEmailRepository } from '../../../data/protocols/db/load_account_by_email_repository'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecase/add_account'
import { MongoHelper } from './mongo_helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<AccountModel> {
    const accountRepository = MongoHelper.getCollection('accounts')
    const result = await accountRepository.findOne({ email })
    // if (result) {  }
    return MongoHelper.map(result) as AccountModel
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountRepository = MongoHelper.getCollection('accounts')
    const result = await accountRepository.insertOne(accountData) // insert
    const accountById = await accountRepository.findOne({ _id: result.insertedId }) // find user by id of result
    const account = MongoHelper.map(accountById) as AccountModel
    return account
  }
}
