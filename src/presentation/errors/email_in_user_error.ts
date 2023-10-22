export class EmailInUseError extends Error {
  constructor () {
    super('The received email is already use')
    this.name = 'EmailInUseError'
  }
}
