export const getRandomUID = () => {
  return crypto.randomUUID()
}

export const a = 34

export const lprUnificator = (lprNumber) => {
  if (lprNumber === null) {
    throw new Error('Input cannot be null')
  }

  const result = lprNumber
    .toUpperCase()
    .replace(/А/g, 'A')
    .replace(/В/g, 'B')
    .replace(/Е/g, 'E')
    .replace(/К/g, 'K')
    .replace(/М/g, 'M')
    .replace(/Н/g, 'H')
    .replace(/О/g, 'O')
    .replace(/Р/g, 'P')
    .replace(/С/g, 'C')
    .replace(/Т/g, 'T')
    .replace(/У/g, 'Y')
    .replace(/Х/g, 'X')
    .replace(/[^ABEKMHOPCTYX0-9]/g, '')

  return result
}