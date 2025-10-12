/**
 * @fileoverview Defines the <difficulty-form> web component,
 * which allows the user to select the quiz difficulty level
 * and emits a custom event with the chosen difficulty.
 *
 * @module components/difficulty-form
 * @author Lena Le
 * @version 1.0.0
 */

// Define the template for quiz difficulty form.
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
 * Custom Web Component responsible for handling quiz difficulty selection.
 * Dispatches a "difficulty-submitted" event containing the chosen difficulty level.
 * @extends HTMLElement
 */
class DifficultyForm extends HTMLElement {
  /**
   * Creates an instance of DifficultyForm and attaches a shadow DOM.
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
  }

  /**
   * Lifecycle method called when the component is added to the DOM.
   * Adds an event listener for form submission.
   */
  connectedCallback () {
    this.form = this.shadowRoot.querySelector('form')
    this.form.addEventListener('submit', this.#handleSubmit.bind(this))
  }

  /**
   * Handles the form submission and dispatches the selected difficulty.
   * @private
   * @param {SubmitEvent} event - The submit event triggered by the user.
   * @returns {void}
   */
  #handleSubmit(event) {
    event.preventDefault()
    const difficulty = this.#getDifficulty(event)
    this.#dispatchDifficultyEvent(difficulty)
  }


  /**
   * Extracts the selected difficulty level from the clicked button.
   * @private
   * @param {SubmitEvent} event - The form submission event.
   * @returns {string} The difficulty level selected by the user.
   */
  #getDifficulty(event) {
    return event.submitter.dataset.difficulty
  }

  /**
   * Dispatches a custom event with the selected difficulty level.
   * @private
   * @param {string} difficulty - The chosen difficulty level.
   * @returns {void}
   */

  #dispatchDifficultyEvent(difficulty) {
    this.dispatchEvent(new CustomEvent('difficulty-submitted', {
      detail: { difficulty },
      bubbles: true,
      composed: true    
    }))
  }
}

customElements.define('difficulty-form', DifficultyForm)
