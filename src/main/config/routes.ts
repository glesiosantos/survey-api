import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(`${__dirname}/../routers`).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routers/${file}`)).default(router)
    }
  })
}
