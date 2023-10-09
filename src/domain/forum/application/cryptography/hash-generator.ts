export abstract class hasher {
  abstract hash(plain: string): Promise<string>
}
