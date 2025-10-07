/**
 * Represents the Calculator class
 * Note: Orchestrates the flow
 */

import { Evaluator } from './Evaluator.js'
import { History } from './History.js'
import { Parser } from './Parser.js'
import { ShuntingYard } from './ShuntingYard.js'

/**
 *
 */
export class Calculator {
  /**
   * Creates a new Calculator instance with an empty history.
   */
  constructor () {
    this.history = new History()
  }

  /**
   * Executes the full calculation pipeline: parse, convert, evaluate, and update history.
   *
   * @param {string} expression - The infix expression to calculate (e.g. "3 + 5 * 2").
   * @returns {number} - The final evaluated result.
   */
  calculate (expression) {
    const validatedExpression = this.parseExpression(expression)
    const convertedExpression = this.convertExpression(validatedExpression)
    const result = this.evaluateExpression(convertedExpression)

    this.addToHistory(expression, result)
    return result
  }

  /**
   * Parses and validates an infix expression into tokens.
   *
   * @param {string} expression - The infix expression to parse.
   * @returns {Array<string|number>} - An array of validated tokens.
   */
  parseExpression (expression) {
    const parser = new Parser()
    const infixTokens = parser.validateAndParse(expression)
    return infixTokens
  }

  /**
   * Converts an infix token array into postfix (RPN).
   *
   * @param {Array<string|number>} infixExpression - Tokenized infix expression.
   * @returns {Array<string|number>} - Postfix tokens.
   */
  convertExpression (infixExpression) {
    const shuntingYard = new ShuntingYard()
    const postfixTokens = shuntingYard.toPostfix(infixExpression)
    return postfixTokens
  }

  /**
   * Evaluates a postfix (RPN) expression.
   *
   * @param {Array<string|number>} postfixExpression - Postfix tokens.
   * @returns {number} - The evaluated result.
   */
  evaluateExpression (postfixExpression) {
    const evaluator = new Evaluator()
    const result = evaluator.evaluate(postfixExpression)
    return result
  }

  /**
   * Adds a calculation result to the history.
   *
   * @param {string} expression - The original expression.
   * @param {number} result - The evaluated result.
   */
  addToHistory (expression, result) {
    this.history.add(expression, result)
  }

  /**
   * Removes a calculation from history.
   *
   * @param {string} expression - The expression key to remove.
   */
  removeFromHistory (expression) {
    this.history.remove(expression)
  }

  /**
   * Retrieves the full calculation history.
   *
   * @returns {object} - The history of calculations as key-value pairs.
   */
  getHistory () {
    return this.history.list()
  }
}
