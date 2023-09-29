import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/mongo_helper'
import { Collection } from 'mongodb'
import bcrypt from 'bcrypt'

let accountCollection: Collection

describe('Auth Router', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST/ Sign Up', () => {
    it('should return 200 on success', async () => {
      await request(app).post('/api/signup')
        .send({
          name: 'Glêsio Santos da Silva',
          email: 'glesioss@gmail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
        .expect(200)
    })
  })

  describe('POST/ Sign In', () => {
    it('should return 200 on success', async () => {
      const passwordHash = await bcrypt.hash('any_password', 12)
      // inserindo um conta para teste
      await accountCollection.insertOne({
        name: 'Glêsio Santos da Silva',
        email: 'glesioss@gmail.com',
        password: passwordHash
      })

      await request(app).post('/api/signin')
        .send({
          email: 'glesioss@gmail.com',
          password: 'any_password'
        })
        .expect(200)
    })
  })
})
