import { AccountMongoRepository } from './account_mongo_repository'
import { MongoHelper } from './mongo_helper'

describe('Account Mongo Repository', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  beforeEach(async () => await MongoHelper.getCollection('accounts').deleteMany({})) // para remover todos os registro

  const makeSut = (): AccountMongoRepository => new AccountMongoRepository()

  it('should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })
})
