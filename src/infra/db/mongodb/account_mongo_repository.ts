import { AddAccountRepository } from '../../../data/protocols/add_account_repository'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecase/add_account'
import { MongoHelper } from './mongo_helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountRepository = MongoHelper.getCollection('accounts')
    const result = await accountRepository.insertOne(accountData) // insert
    const accountById = await accountRepository.findOne({ _id: result.insertedId }) // find user by id of result
    const { _id, ...accountWithoutId } = accountById
    const account = Object.assign({}, accountWithoutId, { id: _id.toHexString() }) as AccountModel
    return account
  }
}
