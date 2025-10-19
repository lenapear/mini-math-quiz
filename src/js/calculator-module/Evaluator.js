import { isOperator, isNumber } from './Helpers.js'

/**
 * Represents the Evaluator class.
 * Responsible for evaluating mathematical expressions in postfix (RPN) format.
 */
export class Evaluator {
  /**
   * Evaluates a postfix expression and returns the result.
   *
   * @param {Array<string|number>} postfixExpression - The expression in postfix (RPN) format.
   * @returns {number} The final evaluated result.
   */
  evaluate (postfixExpression) {
    const stack = []
    for (const token of postfixExpression) {
      this.#processToken(token, stack)
    }
    return this.#getFinalResult(stack)
  }

  /**
   * Processes a single token and updates the stack accordingly.
   *
   * @param {string|number} token - The current token being processed.
   * @param {Array<number>} stack - The stack used to evaluate the expression.
   */
  #processToken (token, stack) {
    if (isNumber(token)) {
      this.#processNumber(token, stack)
    } else if (isOperator(token)) {
      this.#processOperator(token, stack)
    }
  }

  /**
   * Pushes a number token onto the stack.
   *
   * @param {number} number - The number token to add.
   * @param {Array<number>} stack - The stack used to evaluate the expression.
   */
  #processNumber (number, stack) {
    stack.push(number)
  }

  /**
   * Processes an operator by applying it to the last two operands in the stack.
   *
   * @param {string} operator - The operator to apply.
   * @param {Array<number>} stack - The stack used to evaluate the expression.
   */
  #processOperator (operator, stack) {
    const rightOperand = stack.pop()
    const leftOperand = stack.pop()
    const calculationResult = this.#calculate(leftOperand, rightOperand, operator)
    stack.push(calculationResult)
  }

  /**
   * Retrieves the final result from the stack.
   *
   * @param {Array<number>} stack - The stack used to evaluate the expression.
   * @returns {number} The final evaluated result.
   * @throws {Error} If the stack does not contain exactly one result.
   */
  #getFinalResult (stack) {
    if (stack.length === 1) {
      const finalResult = stack[0]
      return finalResult
    }
    throw new Error('Invalid expression: stack did not resolve to a single result.')
  }

  /**
   * Calculates the result of applying an operator to two operands.
   *
   * @param {number} leftOperand - The left-hand operand.
   * @param {number} rightOperand - The right-hand operand.
   * @param {string} operator - The operator to apply (+, -, *, /).
   * @returns {number} The calculated result.
   */
  #calculate (leftOperand, rightOperand, operator) {
    switch (operator) {
      case '+':
        return this.#addition(leftOperand, rightOperand)
      case '-':
        return this.#subtraction(leftOperand, rightOperand)
      case '*':
        return this.#multiplication(leftOperand, rightOperand)
      case '/':
        return this.#division(leftOperand, rightOperand)
    }
  }

  /**
   * Adds two numbers.
   *
   * @param {number} a - The first operand.
   * @param {number} b - The second operand.
   * @returns {number} The sum of a and b.
   */
  #addition (a, b) {
    return a + b
  }

  /**
   * Subtracts the second number from the first.
   *
   * @param {number} a - The first operand.
   * @param {number} b - The second operand.
   * @returns {number} The difference between a and b.
   */
  #subtraction (a, b) {
    return a - b
  }

  /**
   * Multiplies two numbers.
   *
   * @param {number} a - The first operand.
   * @param {number} b - The second operand.
   * @returns {number} The product of a and b.
   */
  #multiplication (a, b) {
    return a * b
  }

  /**
   * Divides the first number by the second.
   *
   * @param {number} a - The numerator.
   * @param {number} b - The denominator.
   * @returns {number} The quotient of a divided by b.
   */
  #division (a, b) {
    return a / b
  }
}
