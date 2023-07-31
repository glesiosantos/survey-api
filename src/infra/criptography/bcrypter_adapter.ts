import bcryp from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BCrypterAdapter implements Encrypter {
  constructor (private readonly salt: number) { }
  async encrypt (value: string): Promise<string> {
    const hash = await bcryp.hash(value, this.salt)
    return hash
  }
}
