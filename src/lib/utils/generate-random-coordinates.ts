export function generateRandomCoordinates(offset = 48) {
  const x = Math.floor(Math.random() * (window.innerWidth - 2 * offset)) + offset;
  const y = Math.floor(Math.random() * (window.innerHeight - 2 * offset)) + offset;

  return { x, y };
}
