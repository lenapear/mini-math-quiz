// Shuffle an array after the Fisher-Yates algorithm
export function shuffle(array) {
  let temp;

  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}