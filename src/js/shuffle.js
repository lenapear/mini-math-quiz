// Shuffle an array after the Fisher-Yates algorithm
export function shuffle(array) {
  let oldElement;

  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    oldElement = array[i]
    array[i] = array[randomIndex]
    array[randomIndex] = oldElement
  }
  return array
}