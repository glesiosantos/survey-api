export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invali param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
