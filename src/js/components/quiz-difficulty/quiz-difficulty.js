/**
 * The difficulty-form web component module.
 *
 * @author Lena Le <ll224ve@student.lnu.se>
 * @version 1.0.0
 */

// Define the template for quiz difficulty form
template.innerHTML = `
  <style>
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .button-group {
      display: flex;
      gap: 10px;
    }

    button {
      padding: 10px 20px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background-color: green;
      color: white;
      font-weight: bold;
    }

    button:hover {
      background-color: blue;
    }
  </style>

  <form>
    <h2>Select difficulty</h2>
    <div class="button-group">
      <button type="submit" data-difficulty="easy">Easy</button>
      <button type="submit" data-difficulty="medium">Medium</button>
    </div>
  </form>
  `
/**
 * Custom Web Component for handling selection of quiz difficulty.
 */
class QuizDifficulty extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
  }

  handleSubmit(event) {}
  getDifficulty() {}
  dispatchDifficultyEvent(difficulty) {}
}

customElements.define('quiz-difficulty', QuizDifficulty)
