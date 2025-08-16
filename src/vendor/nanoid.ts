export function nanoid(size = 12) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-'
  let id = ''
  const cryptoObj = (globalThis.crypto || (globalThis as any).msCrypto)
  const bytes = new Uint8Array(size)
  cryptoObj.getRandomValues(bytes)
  for (let i = 0; i < size; i++) id += alphabet[bytes[i] % alphabet.length]
  return id
}
