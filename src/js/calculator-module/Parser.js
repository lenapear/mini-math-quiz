import { isOperator, isNumber, isDigit, isDecimal } from './Helpers.js'

/**
 * Represents the Parser class.
 * Responsible for validating and tokenizing mathematical expressions.
 */
export class Parser {
  /**
   * Validates and parses an expression into tokens.
   *
   * @param {string} expression - The user's expression input to be tokenized.
   * @returns {Array<string|number>} The array of validated tokens.
   */
  validateAndParse (expression) {
    const tokenizedExpression = this.splitTokens(expression)
    const validTokens = this.validateTokens(tokenizedExpression)
    this.validateFormat(validTokens)

    return validTokens
  }

  /**
   * Splits the expression into an array of tokens.
   *
   * @param {string} expression - The user's expression input to be split.
   * @returns {Array<string|number>} The array of raw tokens.
   */
  splitTokens (expression) {
    const expressionArray = expression.split('')
    const tokenizedExpression = []
    const buffer = []

    for (const char of expressionArray) {
      if (char === ' ') continue
      if (isDigit(char) || isDecimal(char)) {
        this.handleNumberChar(char, buffer)
      } else if (isOperator(char)) {
        this.handleOperator(char, buffer, tokenizedExpression)
      }
    }

    if (buffer.length > 0) {
      this.flushBuffer(buffer, tokenizedExpression)
    }

    return tokenizedExpression
  }

  /**
   * Handles a digit or decimal character in the expression.
   *
   * @param {string|number} char - The current character being processed.
   * @param {Array<string|number>} buffer - The buffer storing number characters.
   */
  handleNumberChar (char, buffer) {
    buffer.push(char)
  }

  /**
   * Handles an operator character in the expression.
   *
   * @param {string} char - The operator character.
   * @param {Array<string|number>} buffer - The buffer storing number characters.
   * @param {Array<string|number>} tokenizedExpression - The array of collected tokens.
   */
  handleOperator (char, buffer, tokenizedExpression) {
    if (buffer.length > 0) {
      this.flushBuffer(buffer, tokenizedExpression)
    }
    tokenizedExpression.push(char)
  }

  /**
   * Flushes the buffer into the tokenized expression as a single string token.
   *
   * @param {Array<string|number>} buffer - The buffer storing number characters.
   * @param {Array<string|number>} tokenizedExpression - The array of collected tokens.
   */
  flushBuffer (buffer, tokenizedExpression) {
    tokenizedExpression.push(buffer.join(''))
    buffer.length = 0
  }

  /**
   * Checks if the first token is invalid (an operator).
   *
   * @param {Array<string|number>} tokens - The list of tokens to check.
   * @throws {Error} If the first token is an operator.
   */
  checkFirstToken (tokens) {
    if (isOperator(tokens[0])) {
      throw new Error('Expression cannot start with an operator')
    }
  }

  /**
   * Checks if the last token is invalid (an operator).
   *
   * @param {Array<string|number>} tokens - The list of tokens to check.
   * @throws {Error} If the last token is an operator.
   */
  checkLastToken (tokens) {
    if (isOperator(tokens[tokens.length - 1])) {
      throw new Error('Expression cannot end with an operator')
    }
  }

  /**
   * Checks the sequence of tokens for invalid patterns.
   *
   * @param {Array<string|number>} tokens - The list of tokens to check.
   * @throws {Error} If two numbers or two operators occur in a row.
   */
  checkSequence (tokens) {
    for (let i = 1; i < tokens.length; i++) {
      const previous = tokens[i - 1]
      const current = tokens[i]

      if (isNumber(current) && isNumber(previous)) {
        throw new Error('Two numbers in a row is not allowed.')
      }

      if (isOperator(current) && isOperator(previous)) {
        throw new Error('Two operators in a row is not allowed.')
      }
    }
  }

  /**
   * Validates that tokens are either numbers or valid operators.
   *
   * @param {Array<string|number>} tokens - The tokens to be validated.
   * @returns {Array<string|number>} The array of validated tokens.
   * @throws {Error} If an invalid token is found.
   */
  validateTokens (tokens) {
    const validTokens = []
    for (let i = 0; i < tokens.length; i++) {
      const currentToken = tokens[i]

      if (isNumber(currentToken)) {
        validTokens.push(Number(currentToken)) // convert it into a number first
      } else if (isOperator(currentToken)) {
        validTokens.push(currentToken)
      } else {
        throw new Error('Invalid token in expression.')
      }
    }
    return validTokens
  }

  /**
   * Validates the format of the tokens by checking the first, last, and sequence.
   *
   * @param {Array<string|number>} tokens - The tokens to be validated.
   */
  validateFormat (tokens) {
    this.checkFirstToken(tokens)
    this.checkLastToken(tokens)
    this.checkSequence(tokens)
  }
}
