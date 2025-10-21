/**
 * @fileoverview Defines the <quiz-app> web component,
 * which manages the quiz flow — nickname input, difficulty selection,
 * question rendering, answer evaluation, and quiz completion.
 *
 * @module components/quiz-app
 * @author Lena Le
 * @version 1.0.0
 */

import { easyQuestions, mediumQuestions } from '../../questions.js'
import { shuffle } from '../../shuffle.js'
import { Calculator } from '../../calculator-module/Calculator.js'

/**
 * @fileoverview Defines the <quiz-app> web component,
 * which manages the quiz flow — nickname input, difficulty selection,
 * question rendering, answer evaluation, and quiz completion.
 *
 * @module components/quiz-app
 * @author Lena Le
 * @version 1.0.0
 */
class QuizApp extends HTMLElement {
  /**
   * Creates an instance of QuizApp and initializes component state.
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    /** @type {number} */
    this.score = 0

    /** @type {string} */
    this.nickname = ''
  
    /** @type {string} */
    this.difficulty = ''

    /** @type {string[]} */
    this.questions = []

    /** @type {number} */
    this.currentQuestionIndex = 0

    /** @type {Calculator} */
    this.calculator = new Calculator()
  }

  /**
   * Lifecycle hook called when the component is connected to the DOM.
   * Initializes the UI structure and attaches event listeners.
   * @returns {void}
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
    this.#attachEventListeners()
  }

  /**
   * Attaches all event listeners for subcomponent communication.
   * @private
   * @returns {void}
   */
  #attachEventListeners() {
    this.#listenForNicknameSubmitted()
    this.#listenForDifficultySubmitted()
    this.#listenForAnswerSubmitted()
    this.#listenForTimeUp()
  }

  /**
   * Adds listener for nickname submission.
   * @private
   * @returns {void}
   */
  #listenForNicknameSubmitted() {
    this.#nicknameForm.addEventListener('nickname-submitted', this.#handleNicknameSubmission.bind(this))
  }

  /**
   * Adds listener for difficulty submission.
   * @private
   * @returns {void}
   */
  #listenForDifficultySubmitted() {
    this.#difficultyForm.addEventListener('difficulty-submitted', this.#handleDifficultySubmission.bind(this))
  }

  /**
   * Adds listener for answer submission.
   * @private
   * @returns {void}
   */
  #listenForAnswerSubmitted() {
    this.#quizQuestion.addEventListener('answer-submitted', this.#handleAnswerSubmission.bind(this))
  }

  /**
   * Adds listener for time-up event.
   * @private
   * @returns {void}
   */
  #listenForTimeUp() {
    this.#countdownTimer.addEventListener('time-up', this.#handleTimeUp.bind(this))
  }

  // --- Event Handlers ---

  /**
   * Handles nickname submission and shows the difficulty form.
   * @private
   * @param {CustomEvent<{nickname: string}>} event - Custom event containing nickname detail.
   * @returns {void}
   */
  #handleNicknameSubmission(event) {
    this.nickname = event.detail.nickname
    this.#showDifficultyForm()
  }

  /**
   * Handles difficulty selection, prepares questions, and starts the quiz.
   * @private
   * @param {CustomEvent<{difficulty: string}>} event - Custom event containing difficulty detail.
   * @returns {void}
   */
  #handleDifficultySubmission(event) {
    this.difficulty = event.detail.difficulty
    this.#prepareQuestions()
    this.#startQuiz()
  }

  /**
   * Handles the submitted answer, evaluates correctness,
   * and proceeds to the next question or ends the quiz.
   * @private
   * @param {CustomEvent<{userAnswer: string}>} event - Custom event with user's answer.
   * @returns {Promise<void>}
   */
  async #handleAnswerSubmission(event) {
    const userAnswer = event.detail.userAnswer
    const currentQuestion = this.questions[this.currentQuestionIndex]
    
    const isCorrect = this.#evaluateAnswer(currentQuestion, userAnswer)

    if (isCorrect) {
      this.score++
      this.currentQuestionIndex++
      if (this.#hasQuizEnded()) {
        this.#endQuiz(true)
        return
      }
      this.#displayQuestion()
    } else {
      this.#endQuiz()
    }
  }

  /**
   * Handles the event "time-up" and ends the quiz.
   */
  #handleTimeUp() {
    this.#endQuiz(true)
  }

  // --- Game Flow methods ---

  /**
   * Starts the quiz: shows the first question and initializes the timer.
   * @private
   * @returns {void}
   */
  #startQuiz() {
    this.#quizQuestion.classList.remove('hidden')
    this.#difficultyForm.classList.add('hidden')
    this.#countdownTimer.classList.remove('hidden')

    this.#countdownTimer.startTimer()
    this.#displayQuestion() // when currentQuestionIndex is 0
  }

  /**
   * Prepares and shuffles questions based on selected difficulty.
   * @private
   * @returns {void}
   */
  #prepareQuestions() {
    if (this.difficulty === "easy") {
      this.questions = shuffle(easyQuestions)
    } else if (this.difficulty === "medium") {
      this.questions = shuffle(mediumQuestions)
      }
  }

  /**
   * Displays the current question in the quiz-question component.
   * @private
   * @returns {void}
   */
  #displayQuestion() {
    this.#quizQuestion.renderQuestion(this.questions[this.currentQuestionIndex])
    console.log('Rendering:', this.questions[this.currentQuestionIndex]) // ❗️ debugger
  }

  /**
   * Evaluates the user's answer by comparing it to the correct result from the Calculator.
   * @private
   * @param {string} question - The question expression.
   * @param {string} answer - The user's answer as a string.
   * @returns {boolean} True if the answer is correct, false otherwise.
   */
  #evaluateAnswer(question, answer) {
    const correct = this.calculator.calculate(question)
    return correct === Number(answer)
  }

  /**
   * Checks whether the quiz has reached its end.
   * @private
   * @returns {boolean} True if there are no remaining questions, false otherwise.
   */
  #hasQuizEnded() {
    return this.currentQuestionIndex >= this.questions.length
  }

  /**
   * Ends the quiz, stops the timer, hides quiz elements, and shows the result and high-score view.
   * Updates the high score if the player finished successfully.
   * @private
   * @param {boolean} [success=false] - Whether the player completed the quiz successfully.
   * @returns {void}
   */
  #endQuiz(success = false) {
  this.#countdownTimer.stopTimer()
  this.#hideQuizElements()
  this.#showHighScore()
  this.#showResultMessage(success)
  
  if (success) {
    this.#highScore.updateScores({
      nickname: this.nickname,
      score: this.score,
      difficulty: this.difficulty
    })
  }
  this.#highScore.loadScores(this.difficulty)
  this.#createRestartButton()
  }

  // --- Utility / UI methods ---

  /**
   * Displays the difficulty selection form and hides the nickname form.
   * @private
   * @returns {void}
   */
  #showDifficultyForm() {
    this.#nicknameForm.classList.add('hidden')
    this.#difficultyForm.classList.remove('hidden')
  }

  /**
   * Hides the quiz question and timer elements after the game ends.
   * @private
   * @returns {void}
   */
  #hideQuizElements() {
    this.#quizQuestion.classList.add('hidden')
    this.#countdownTimer.classList.add('hidden')
  }

  /**
   * Shows the high-score component after the quiz ends.
   * @private
   * @returns {void}
   */
  #showHighScore() {
    this.#highScore.classList.remove('hidden')
  }


  /**
   * Displays a short message indicating whether the player succeeded or failed,
   * including the final score. The message disappears automatically after 5 seconds.
   * @private
   * @param {boolean} success - Whether the player completed the quiz successfully.
   * @returns {void}
   */
  #showResultMessage(success) {
    const message = document.createElement('p')
    message.textContent = success
    ? `✅ Correct! Final score: ${this.score}`
    : `❌ Wrong answer! Final score: ${this.score}`

    this.shadowRoot.appendChild(message)
    setTimeout(() => message.remove(), 5000)
  }

  /**
   * Creates a restart button that allows the player to start a new quiz.
   * If the button already exists, no duplicate is created.
   * @private
   * @returns {void}
   */
  #createRestartButton() {
    if (this.shadowRoot.querySelector('#restart-button')) return

    const restartButton = document.createElement('button')
    restartButton.id = 'restart-button'
    restartButton.textContent = 'Restart Quiz!'

    restartButton.addEventListener('click', () => this.#restartQuiz())

    this.shadowRoot.appendChild(restartButton)
  }

  /**
   * Resets the quiz to its initial state and returns the player to the nickname form.
   * Clears score, hides the high-score view, and removes the restart button.
   * @private
   * @returns {void}
   */
  #restartQuiz() {
    this.score = 0
    this.currentQuestionIndex = 0
    this.#highScore.classList.add('hidden')
    this.shadowRoot.querySelector('#restart-button')?.remove()
    this.#nicknameForm.classList.remove('hidden')
  }

  // --- Element getters ---

  /**
   * Gets the nickname form element.
   * @private
   * @returns {HTMLElement}
   */
  get #nicknameForm() {
    return this.shadowRoot.querySelector('nickname-form')
  }

  /**
   * Gets the difficulty form element.
   * @private
   * @returns {HTMLElement}
   */
  get #difficultyForm() {
    return this.shadowRoot.querySelector('difficulty-form')
  }

  /**
   * Gets the quiz-question element.
   * @private
   * @returns {HTMLElement}
   */
  get #quizQuestion() {
    return this.shadowRoot.querySelector('quiz-question')
  }

  /**
   * Gets the countdown-timer element.
   * @private
   * @returns {HTMLElement}
   */
  get #countdownTimer() {
    return this.shadowRoot.querySelector('countdown-timer')
  }

  /**
   * Gets the high-score component element.
   * @private
   * @returns {HTMLElement}
   */
  get #highScore() {
    return this.shadowRoot.querySelector('high-score')
  }
}

customElements.define('quiz-app', QuizApp)