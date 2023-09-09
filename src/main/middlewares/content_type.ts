import { NextFunction, Request, Response } from 'express'

export const contentTypes = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}
