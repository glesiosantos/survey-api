import { Express } from 'express'
import { bodyParser, contentTypes, cors } from '../middlewares/'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentTypes)
}
