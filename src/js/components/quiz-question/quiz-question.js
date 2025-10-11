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
    this.attachEventListeners
  }
  renderQuestion(question) {}
  // clear whatever was previously in question-text
  // set the question inside question-text
  attachEventListeners() {}
  // listen for submit > dispatch answer-submitted even with the user-answer
}

customElements.define('quiz-question', QuizQuestion)
