/**
 * @fileoverview Utility function to shuffle an array in place
 * using the Fisher–Yates algorithm.
 *
 * @module shuffle
 * @version 1.0.0
 */

/**
 * Randomly shuffles the elements of an array in place using
 * the Fisher–Yates (Knuth) algorithm.
 *
 * @template T
 * @param {T[]} array - The array to shuffle. It will be modified in place.
 * @returns {T[]} The same array instance with its elements shuffled.
 */
export function shuffle(array) {
  let temp

  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}