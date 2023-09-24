import { ObjectId } from 'mongodb'
import { AddAccountRepository } from '../../../data/protocols/db/add_account_repository'
import { LoadAccountByEmailRepository } from '../../../data/protocols/db/load_account_by_email_repository'
import { UpdateAccessTokenRepository } from '../../../data/protocols/db/update_access_token_repository'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecase/add_account'
import { MongoHelper } from './mongo_helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountRepository = MongoHelper.getCollection('accounts')
    await accountRepository.updateOne({ _id: new ObjectId(id) }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountRepository = MongoHelper.getCollection('accounts')
    const result = await accountRepository.findOne({ email })
    // if (result) { return MongoHelper.map(result) as AccountModel }
    return result && MongoHelper.map(result) as AccountModel
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountRepository = MongoHelper.getCollection('accounts')
    const result = await accountRepository.insertOne(accountData) // insert
    const accountById = await accountRepository.findOne({ _id: result.insertedId }) // find user by id of result
    const account = MongoHelper.map(accountById) as AccountModel
    return account
  }
}
