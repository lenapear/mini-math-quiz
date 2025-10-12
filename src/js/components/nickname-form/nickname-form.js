/**
 * @fileoverview Defines the <nickname-form> web component,
 * which handles nickname input and emits a custom event when submitted.
 *
 * @module components/nickname-form
 * @author Lena Le
 * @version 1.0.0
 */

// Define the template for nickname form.
const template = document.createElement('template')
template.innerHTML = `
  <style>
      form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
      }
  </style>

  <form>
      <h1>Welcome to Mini Math quiz!</h1>
      <label for="nickname">Enter your nickname:</label>
      <input type="text" id="nickname" required>
      <button type="submit">Start Game</button>
  </form>
`

/**
 * Custom Web Component responsible for collecting a nickname
 * and dispatching a "nickname-submitted" event.
 * @extends HTMLElement
 */
class NicknameForm extends HTMLElement {
  /**
   * Creates an instance of NicknameForm and attaches a shadow DOM.
   */
  constructor () {
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
   * Handles form submission and dispatches the nickname event.
   * @private
   * @param {SubmitEvent} event - The submit event object.
   * @returns {void}
   */
  #handleSubmit(event) {
    event.preventDefault()
    const nickname = this.#getNickname()
    this.#dispatchNicknameEvent(nickname)
  }

  /**
   * Retrieves the nickname from the input field.
   * @private
   * @returns {string} The trimmed nickname value.
   */
  #getNickname() {
    return this.shadowRoot.querySelector('#nickname').value.trim()
  }

  /**
   * Dispatches a custom event containing the nickname.
   * @private
   * @param {string} nickname - The nickname to include in the event detail.
   * @returns {void}
   */
  #dispatchNicknameEvent(nickname) {
    this.dispatchEvent(new CustomEvent('nickname-submitted', {
      detail: { nickname },
      bubbles: true,
      composed: true
    }))
  }
}

customElements.define('nickname-form', NicknameForm)