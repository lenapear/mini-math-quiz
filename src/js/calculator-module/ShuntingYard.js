import { isOperator, isNumber } from './Helpers.js'

/**
 * Represents the ShuntingYard class.
 * Implements the Shunting Yard algorithm to convert infix expressions to postfix (RPN).
 */
export class ShuntingYard {
  /**
   * Converts an infix expression to postfix (RPN) format.
   *
   * @param {Array<string|number>} infixTokens - The tokens in infix notation.
   * @returns {Array<string|number>} The converted tokens in postfix notation.
   */
  toPostfix (infixTokens) {
    const operatorStack = []
    const outputQueue = []

    for (let i = 0; i < infixTokens.length; i++) {
      const current = infixTokens[i]

      if (isNumber(current)) {
        this.handleNumber(current, outputQueue)
      } else if (isOperator(current)) {
        while (operatorStack.length > 0 && this.hasPrecedence(operatorStack[operatorStack.length - 1], current)) {
          this.handleOperator(outputQueue, operatorStack)
        }
        operatorStack.push(current)
      }
    }

    this.flushStack(operatorStack, outputQueue)
    return outputQueue
  }

  /**
   * Handles a number token by adding it to the output queue.
   *
   * @param {number} number - The number token to add.
   * @param {Array<string|number>} outputQueue - The output queue being constructed.
   */
  handleNumber (number, outputQueue) {
    outputQueue.push(number)
  }

  /**
   * Handles the top operator from the operator stack and adds it to the output queue.
   *
   * @param {Array<string|number>} outputQueue - The output queue being constructed.
   * @param {Array<string>} operatorStack - The stack of operators.
   */
  handleOperator (outputQueue, operatorStack) {
    outputQueue.push(operatorStack.pop())
  }

  /**
   * Flushes all remaining operators from the stack into the output queue.
   *
   * @param {Array<string>} operatorStack - The stack of operators.
   * @param {Array<string|number>} outputQueue - The output queue being constructed.
   */
  flushStack (operatorStack, outputQueue) {
    while (operatorStack.length > 0) {
      const currentOp = operatorStack.pop()
      outputQueue.push(currentOp)
    }
  }

  /**
   * Determines if the first operator has greater or equal precedence than the second.
   *
   * @param {string} op1 - The operator at the top of the stack.
   * @param {string} op2 - The current operator being evaluated.
   * @returns {boolean} True if op1 has greater or equal precedence, false otherwise.
   */
  hasPrecedence (op1, op2) {
    return this.getPrecedence(op1) >= this.getPrecedence(op2)
  }

  /**
   * Gets the precedence level of an operator according to PEMDAS.
   *
   * @param {string} operator - The operator to check.
   * @returns {number} The precedence level (2 = high, 1 = low).
   * @throws {Error} If the operator is unknown.
   */
  getPrecedence (operator) {
    if (['*', '/'].includes(operator)) {
      return 2
    } else if (['+', '-'].includes(operator)) {
      return 1
    } else throw new Error(`Unknown operator: ${operator}`)
  }
}
