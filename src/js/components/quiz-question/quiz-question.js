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
      <!-- Radio options will be injected here dynamically -->
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
  renderQuestion() {}
  // clear whatever was previously in answer-container
  // loop through each option for the question and dynamically add the radio buttons to the answer-container
  attachEventListeners() {}
  // listen for submit > dispatch answer-submitted even with the answer
  implementKeyboardNavigation() {} // keyboard navigation for multiple choice questions (vertical)
}

customElements.define('quiz-question', QuizQuestion)
