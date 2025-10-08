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
            <!-- Default to a text input -->
            <input type="text" id="answer" placeholder="Your answer">
        </div>
        <button type="submit">Submit</button>
    </form>
`

/**
 * Custom Web Component for displaying and handling a quiz question.
 */
class QuizQuestion extends HTMLElement {
  constructor() {}
  connectedCallback() {}
  renderQuestion() {}
  attachEventListeners() {}
  implementKeyboardNavigation() {} // keyboard navigation for multiple choice questions (vertical)
}

customElements.define('quiz-question', QuizQuestion)
