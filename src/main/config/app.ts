import express from 'express'
import setupMiddlewares from './middlewares'
const app = express()

// Middlewares
setupMiddlewares(app)

export default app
