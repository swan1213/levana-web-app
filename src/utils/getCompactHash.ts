export default function getCompactHash(hash: string, showPartSize = 6) {
  if (hash.length < showPartSize * 2) {
    return hash
  }

  return (
    hash.slice(0, showPartSize) + "..." + hash.slice(-showPartSize, hash.length)
  )
}
