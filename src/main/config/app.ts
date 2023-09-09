import express from 'express'
import setupMiddlewares from './middlewares'
import setupRouters from './routes'

const app = express()

// Middlewares
setupMiddlewares(app)
setupRouters(app)

export default app
