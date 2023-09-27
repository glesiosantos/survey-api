import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/mongo_helper'

describe('Auth Router', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  beforeEach(async () => await MongoHelper.getCollection('accounts').deleteMany({}))

  describe('POST/ Sign Up', () => {
    it('should return 200 on success', async () => {
      await request(app).post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
        .expect(200)
    })
  })
})
