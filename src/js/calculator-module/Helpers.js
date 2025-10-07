// Helper functions

/**
 * Checks if a token is an operator (+, -, *, /).
 *
 * @param {string} token - The token to check.
 * @returns {boolean} True if the token is an operator, false otherwise.
 */
export function isOperator (token) {
  return ['+', '-', '*', '/'].includes(token)
}

/**
 * Checks if a token represents a valid number.
 *
 * @param {string|number} token - The token to be checked.
 * @returns {boolean} True if the token is a number, false otherwise.
 */
export function isNumber (token) {
  const convert = Number(token)
  if (Number.isNaN(convert) === false) {
    return true
  } else return false
}

/**
 * Checks if a character is a digit (0–9).
 *
 * @param {string} char - The character to check.
 * @returns {boolean} True if the character is a digit, false otherwise.
 */
export function isDigit (char) {
  return /\d/.test(char)
}

/**
 * Checks if a character is a decimal separator.
 * Supports both period (.) and comma (,).
 *
 * @param {string} char - The character to check.
 * @returns {boolean} True if the character is a decimal separator, false otherwise.
 */
export function isDecimal (char) {
  return char === ',' || char === '.'
}
