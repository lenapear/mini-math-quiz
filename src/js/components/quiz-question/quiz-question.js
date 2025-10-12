/**
 * @fileoverview Defines the <quiz-question> web component,
 * responsible for rendering a question, handling user input,
 * and emitting an "answer-submitted" event when the user submits an answer.
 *
 * @module components/quiz-question
 * @author Lena Le
 * @version 1.0.0
 */

// Define the template for quiz-question.
const template = document.createElement('template')
template.innerHTML = `
  <style>
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        gap: 10px;
      }
      
      h2 {
      text-align: center;
      }
  </style>

  <form>
    <h2 id="question-text"></h2>
    <div id="answer-container">
      <label for="user-answer">Your answer:</label>
      <input type="text" id="user-answer" autocomplete="off" required>
    </div>
    <button type="submit">Submit</button>
  </form>
`

/**
 * Custom Web Component for displaying and handling a quiz question.
 * Dispatches an "answer-submitted" event with the user's answer.
 * @extends HTMLElement
 */
class QuizQuestion extends HTMLElement {
  /**
   * Creates an instance of QuizQuestion and attaches a shadow DOM.
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
  }

  /**
   * Lifecycle hook called when the component is connected to the DOM.
   * Sets up event listeners for form submission.
   * @returns {void}
   */
  connectedCallback() {
    this.form = this.shadowRoot.querySelector('form')
    this.form.addEventListener('submit', this.#handleSubmit.bind(this))
    this.clearInputfield
  }

  /**
   * Handles the submit event from the form.
   * Retrieves the user's answer, dispatches an event, and clears the input.
   * @private
   * @param {SubmitEvent} event - The submit event triggered by the form.
   * @returns {void}
   */
  #handleSubmit(event) {
    event.preventDefault()
    const userAnswer = this.#getUserAnswer()
    this.#dispatchAnswerEvent(userAnswer)
    this.#clearInputField()
  }

  /**
   * Retrieves the value entered by the user.
   * @private
   * @returns {string} The trimmed user answer.
   */
  #getUserAnswer() {
    return this.shadowRoot.querySelector('#user-answer').value.trim()
  }

  /**
   * Dispatches a custom event containing the user's answer.
   * @private
   * @param {string} userAnswer - The user's submitted answer.
   * @returns {void}
   */
  #dispatchAnswerEvent(userAnswer) {
    this.dispatchEvent(new CustomEvent('answer-submitted', {
      detail: { userAnswer },
      bubbles: true,
      composed: true
    }))
  }

  /**
   * Renders the provided question on screen.
   * @param {string} question - The question to display.
   * @returns {void}
   */
  renderQuestion(question) {
    this.#clearQuestion()
    this.#questionText.textContent = question
  }

  /**
   * Clears the current question text.
   * @private
   * @returns {void}
   */
  #clearQuestion() {
    this.#questionText.textContent = ''
  }

  /**
   * Clears the user's input field.
   * @private
   * @returns {void}
   */
  #clearInputField () {
    this.shadowRoot.querySelector('#user-answer').value = ''
  }

  /**
   * Retrieves the question text element.
   * @private
   * @returns {HTMLElement} The question text element.
   */
  get #questionText () {
    return this.shadowRoot.querySelector('#question-text')
  }
}

customElements.define('quiz-question', QuizQuestion)
