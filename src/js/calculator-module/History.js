/**
 * Represents the History class.
 * Manages storage and retrieval of calculation history.
 */
export class History {
  /**
   * Creates a new History instance.
   */
  constructor () {
    /**
     * Stores expressions and their results.
     *
     * @type {{[expression: string]: number}}
     */
    this.calculationHistory = {}
  }

  /**
   * Adds a calculation result to the history.
   *
   * @param {string} expression - The mathematical expression.
   * @param {number} result - The result of evaluating the expression.
   */
  add (expression, result) {
    this.calculationHistory[expression] = result
  }

  /**
   * Retrieves the result for a given expression.
   *
   * @param {string} expression - The expression to look up.
   * @returns {number|undefined} The result of the expression, or undefined if not found.
   */
  get (expression) {
    return this.calculationHistory[expression]
  }

  /**
   * Removes an expression from the history.
   *
   * @param {string} expression - The expression to remove.
   */
  remove (expression) {
    delete this.calculationHistory[expression]
  }

  /**
   * Returns the entire calculation history.
   *
   * @returns {{[expression: string]: number}} An object mapping expressions to results.
   */
  list () {
    return this.calculationHistory
  }
}
