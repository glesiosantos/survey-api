import bcryp from 'bcrypt'
import { Encrypter } from '../../data/protocols/criptography/encrypter'

export class BCryptAdapter implements Encrypter {
  constructor (private readonly salt: number) { }
  async encrypt (value: string): Promise<string> {
    const hash = await bcryp.hash(value, this.salt)
    return hash
  }
}
