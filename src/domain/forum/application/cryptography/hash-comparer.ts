export abstract class hasher {
  abstract compare(plain: string, hash: string): Promise<boolean>
}
