/**
 * @fileoverview Defines the <countdown-timer> web component.
 * Handles a countdown timer for the quiz application.
 *
 * @module components/countdown-timer
 * @author Lena Le
 * @version 1.0.0
 */

// Define the template for countdown-timer.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .countdown {
      font-size: 2em;
      color: black;
      padding: 1em;
      margin: 1em;
    }
  </style>

  <div class="countdown">
    <span id="countdown"></span>
  </div>
`
/**
 * Custom Web Component representing a countdown timer.
 * Handles starting, updating, and stopping a timer,
 * and dispatches a "time-up" event when the timer reaches zero.
 * @extends HTMLElement
 */
class CountdownTimer extends HTMLElement {
  /**
   * Creates an instance of CountdownTimer and attaches a shadow DOM.
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    /** @type {?number} Stores interval reference for clearing the timer. */
    this.timerId = null

    /** @type {number} Remaining time in seconds. */
    this.timeLeft = 60 // default duration of the timer
  }

  /**
   * Gets the remaining time.
   *
   * @returns {number} The number of seconds remaining.
   */
  get timeLeft() {
    return this._timeLeft
  }

  /**
   * Sets the remaining time.
   *
   * @param {number} time - The new time left in seconds.
   */
  set timeLeft(time) {
    this._timeLeft = time
  }

  /**
   * Starts the countdown timer.
   * Clears any existing interval and updates the display every second.
   */
  startTimer() {
    this.stopTimer() // clear any existing timer (side-effect)
    this.#updateCountdown()
    this.timerId = setInterval(() => this.#updateCountdown(), 1000)
  }

  /**
   * Updates the countdown display and handles timer logic.
   * @private
   */
  #updateCountdown() {
    this.#countdown.textContent = this.timeLeft
    console.log('Time left:', this.timeLeft)

    if (this.timeLeft <= 0) {
      this.#handleTimeUp()
    } else {
      this.timeLeft--
    }
  }

  /**
   * Handles the event when the timer reaches zero.
   * Dispatches a "time-up" event and stops the timer.
   * @private
   */
  #handleTimeUp() {
    this.stopTimer()
    this.dispatchEvent(new Event('time-up'))
  }


  /**
   * Stops the countdown timer and clears the active interval.
   */
  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }

  /**
   * Returns the countdown display element inside the shadow DOM.
   *
   * @private
   * @returns {HTMLElement} The countdown span element.
   */
  get #countdown() {
    return this.shadowRoot.querySelector('#countdown')
  }
}

customElements.define('countdown-timer', CountdownTimer)