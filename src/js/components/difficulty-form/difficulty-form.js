/**
 * The difficulty-form web component module.
 *
 * @author Lena Le <ll224ve@student.lnu.se>
 * @version 1.0.0
 */

// Define the template for quiz difficulty form
const template = document.createElement('template')
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
class DifficultyForm extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
  }

  /**
   * Lifecycle method called when the component is added to the DOM.
   * Adds an event listener to handle form submission.
   */
  connectedCallback () {
    this.form = this.shadowRoot.querySelector('form')
    this.form.addEventListener('submit', this.handleSubmit.bind(this))
  }

  handleSubmit(event) {
    event.preventDefault()
    const difficulty = this.getDifficulty(event)
    this.dispatchDifficultyEvent(difficulty)
  }
  getDifficulty(event) {
    return event.submitter.dataset.difficulty
  }

  dispatchDifficultyEvent(difficulty) {
    this.dispatchEvent(new CustomEvent('difficulty-submitted', {
      detail: { difficulty },
      bubbles: true,
      composed: true    
    }))
  }
}

customElements.define('difficulty-form', DifficultyForm)
