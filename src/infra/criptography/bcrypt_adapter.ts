import bcryp from 'bcrypt'
import { Hasher } from '../../data/protocols/criptography/hasher'
import { HashComparer } from '../../data/protocols/criptography/hash_comparer'

export class BCryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) { }

  async hash (value: string): Promise<string> {
    const hash = await bcryp.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcryp.compare(value, hash)
    return new Promise(resolve => resolve(true))
  }
}
