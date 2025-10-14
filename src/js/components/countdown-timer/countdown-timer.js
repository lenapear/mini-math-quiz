/**
 * @fileoverview Defines the <countdown-timer> web component....
 * 
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
class CountdownTimer extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    this.timerId = null //stores interval reference for clearing the timer
    this.timeLeft = 60 // default duration of the timer
  }

  get timeLeft() {
    return this.timeLeft
  }
  set timeLeft(time) {
    this.timeLeft = time
  }

  startTimer() {
    this.stopTimer() // clear any existing timer (side-effect)
    this.updateCountdown()
    this.timerId = setInterval(() => this.updateCountdown(), 1000)
  }

  updateCountdown() {
    this.countdown.textContent = this.timeLeft
    console.log('Time left:', this.timeLeft) // ❗️ debugger

    if (this.timeLeft <= 0) {
      this.handleTimeUp()
    } else {
      this.timeLeft--
    }
  }

  handleTimeUp() {
    this.stopTimer()
    this.dispatchEvent(new Event('time-up'))
  }

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }

  get countdown() {
    return this.shadowRoot.querySelector('#countdown')
  }
}

customElements.define('countdown-timer', CountdownTimer)