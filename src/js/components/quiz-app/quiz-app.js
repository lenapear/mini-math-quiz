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
    this.difficulty = ''
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
      <difficulty-form class="hidden"></difficulty-form> <!--remove hidden when nickname is submitted-->
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

    this.listenForDifficultySubmitted()

    // to-do: quiz-question
    // listen for answer-submitted
    // handleAnswerSubmission

  }

  listenForNicknameSubmitted() {
    this.nicknameForm.addEventListener('nickname-submitted', this.handleNicknameSubmission.bind(this))
  }

  handleNicknameSubmission(event) {
    this.nickname = event.detail.nickname
    this.showDifficultyForm()
  }

  showDifficultyForm() {
    this.nicknameForm.classList.add('hidden')
    this.difficultyForm.classList.remove('hidden')
  }

  listenForDifficultySubmitted() {
    this.difficultyForm.addEventListener('difficulty-submitted', this.handleDifficultySubmission.bind(this))
  }

  handleDifficultySubmission(event) {
    this.difficulty = event.detail.difficulty
    this.showQuiz()
  }

  showQuiz() {
    this.quizQuestion.classList.remove('hidden')
    this.countdownTimer.classList.remove('hidden')
  }

  listenForAnswerSubmitted() {}

  async handleAnswerSubmission() {} // should this be an async??
  // retrieve answer
  // evaluateAnswer()
  // handleCorrectAnswer() 
  // handleWrongAnswer ()

  async getAndDisplayQuestion() {
  // retrieveEasyQuestion() and retrieveMediumQuestion()
  // display the question inside quiz-question h2 element id="question-text"
  }


  // add later:
  // stopTimer
  // endQuiz()
  // restartQuiz()

  get nicknameForm() {
    return this.shadowRoot.querySelector('nickname-form')
  }

  get difficultyForm() {
    return this.shadowRoot.querySelector('difficulty-form')
  }

  get quizQuestion() {
    return this.shadowRoot.querySelector('quiz-question')
  }

  /*get countdownTimer() {
    return this.shadowRoot.querySelector('countdown-timer')
  }*/

}

customElements.define('quiz-app', QuizApp)