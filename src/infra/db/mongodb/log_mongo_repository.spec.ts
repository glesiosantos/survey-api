import { Collection } from 'mongodb'
import { MongoHelper } from './mongo_helper'
import { LogMongoRepository } from './log_mongo_repository'
import { LogErrorRepository } from '../../../data/protocols/db/log_error_repository'

const makeSut = (): LogErrorRepository => new LogMongoRepository()

describe('Log Mongo Repository', () => {
  let errorCollection: Collection
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  beforeEach(async () => {
    errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  it('should create an error on success', async () => {
    const sut = makeSut()
    await sut.logError('any_stack')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
