/**
 * The nickname-form web component module.
 *
 * @author Lena Le <ll224ve@student.lnu.se>
 * @version 1.0.0
 */

// Define the template for nickname form
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
 * Custom Web Component for handling a nickname input.
 */
class NicknameForm extends HTMLElement {
  /**
   * Creates an instance of NicknameForm.
   */
  constructor () {
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
    const nickname = this.getNickname()
    this.dispatchNicknameEvent(nickname)
  }

  
  getNickname() {
    return this.shadowRoot.querySelector('#nickname').value.trim()
  }

  dispatchNicknameEvent(nickname) {
    this.dispatchEvent(new CustomEvent('nickname-submitted', {
      detail: { nickname }
    }))
  }
}

customElements.define('nickname-form', NicknameForm)