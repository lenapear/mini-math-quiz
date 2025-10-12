/**
 * The quiz-question web component module.
 *
 * @author Lena Le <ll224ve@student.lnu.se>
 * @version 1.0.0
 */

// Define the template for quiz-question
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
 */
class QuizQuestion extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    this.form = this.shadowRoot.querySelector('form')
    this.form.addEventListener('submit', this.handleSubmit.bind(this))
    this.clearInputfield
  }

  handleSubmit(event) {
    event.preventDefault()
    const userAnswer = this.getUserAnswer()
    this.dispatchAnswerEvent(userAnswer)
    this.clearInputField()
  }

  
  getUserAnswer() {
    return this.shadowRoot.querySelector('#user-answer').value.trim()
  }

  dispatchAnswerEvent(userAnswer) {
    this.dispatchEvent(new CustomEvent('answer-submitted', {
      detail: { userAnswer },
      bubbles: true,
      composed: true
    }))
  }


  renderQuestion(question) {
    this.clearQuestion()
    this.questionText.textContent = question
  }

  clearQuestion() {
    this.questionText.textContent = ''
  }

  clearInputField () {
    this.shadowRoot.querySelector('#user-answer').value = ''
  }

  get questionText () {
    return this.shadowRoot.querySelector('#question-text')
  }
}

customElements.define('quiz-question', QuizQuestion)
