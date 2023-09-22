import bcryp from 'bcrypt'
import { Hasher } from '../../data/protocols/criptography/hasher'

export class BCryptAdapter implements Hasher {
  constructor (private readonly salt: number) { }
  async hash (value: string): Promise<string> {
    const hash = await bcryp.hash(value, this.salt)
    return hash
  }
}
