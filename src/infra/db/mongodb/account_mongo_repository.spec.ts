import { Collection } from 'mongodb'
import { AccountMongoRepository } from './account_mongo_repository'
import { MongoHelper } from './mongo_helper'

let accountColletion: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  beforeEach(async () => {
    accountColletion = await MongoHelper.getCollection('accounts')
    await accountColletion.deleteMany({})
  }) // para remover todos os registro

  const makeSut = (): AccountMongoRepository => new AccountMongoRepository()

  it('should return an account on mehtod add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })

  it('should return an account on loadByEmail method success', async () => {
    // simulando uma conta cadastrada
    await accountColletion.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })

    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })

  it('should return null when loadByEmail method return null', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeNull()
  })

  it('should update Account accessToken on updateAccessToken method success', async () => {
    // simulando uma conta cadastrada
    const insertAccount = await accountColletion.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })

    // Antes do update
    const account = await accountColletion.findOne({ _id: insertAccount.insertedId })
    expect(account.accessToken).toBeFalsy()

    // Depois do update
    const sut = makeSut()
    await sut.updateAccessToken(insertAccount.insertedId.toHexString(), 'any_token')
    const accountUpdate = await accountColletion.findOne({ _id: insertAccount.insertedId })
    expect(accountUpdate).toBeTruthy()
    expect(accountUpdate.accessToken).toBe('any_token')
  })
})
