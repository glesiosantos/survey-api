import { LogErrorRepository } from '../../../data/protocols/db/log_error_repository'
import { MongoHelper } from './mongo_helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack, date: new Date()
    })
  }
}
