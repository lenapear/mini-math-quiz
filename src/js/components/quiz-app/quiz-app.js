/**
 * The quiz-application web component module.
 *
 * @author Lena Le <ll224ve@student.lnu.se>
 * @version 1.0.0
 */

class QuizApp extends HTMLElement {
  /**
   * Creates an instance of QuizApp.
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.nickname = ''
  }

  /**
   * Called when the component is added to the DOM.
   * Initializes the quiz application by setting up the HTML structure and attaching event listeners for handling user interactions.
   */
  connectedCallback() {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        .hidden {
          display: none;
        }
      </style>
      
      <nickname-form></nickname-form> <!--add hidden when quiz starts-->
      <quiz-question class="hidden"></quiz-question> <!--remove hidden when quiz starts-->
      <countdown-timer class="hidden"></countdown-timer> <!--remove hidden when quiz starts-->
      <high-score class="hidden"></high-score> <!--remove hidden when quiz starts-->
    `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.attachEventListeners()
  }

  /**
   * Attaches event listeners for user interactions
   */
  attachEventListeners() {
    this.listenForNicknameSubmitted()

    // to-do: quiz-question
    // listen for answer-submitted
    // handleAnswerSubmission

  }

  listenForNicknameSubmitted() {
    const nicknameForm = this.shadowRoot.querySelector('nickname-form')
    nicknameForm.addEventListener('nickname-submitted', this.handleNicknameSubmission.bind(this))
  }

  handleNicknameSubmission(event) {
    this.nickname = event.detail.nickname
    this.transitionToQuiz()
  }

  transitionToQuiz() {
    const nicknameForm = this.shadowRoot.querySelector('nickname-form')
    const quizQuestion = this.shadowRoot.querySelector('quiz-question')
    const countdownTimer = this.shadowRoot.querySelector('countdown-timer')

    nicknameForm.classList.add('hidden')
    quizQuestion.classList.remove('hidden')
    countdownTimer.classList.remove('hidden')
  }

  // to-do: quiz-question
  // async getQuestion(): get question and display it inside quiz-question
  // async handleAnswerSubmission(): retrieve answer, evaluate answer, handleCorrectAnswer() & handleWrongAnswer()


  // stopTimer
  // endQuiz()
  // restartQuiz()
}

customElements.define('quiz-app', QuizApp)