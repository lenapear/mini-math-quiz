/**
 * @fileoverview Defines the <quiz-app> web component,
 * which manages the quiz flow — nickname input, difficulty selection,
 * question rendering, answer evaluation, and quiz completion.
 *
 * @module components/quiz-app
 * @author Lena Le
 * @version 1.0.0
 */

import { easyQuestions, mediumQuestions } from "../../questions.js"
import { shuffle } from "../../shuffle.js"
import { Calculator } from "../../calculator-module/Calculator.js"

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
  }

  /**
   * Adds listener for nickname submission.
   * @private
   * @returns {void}
   */
  #listenForNicknameSubmitted() {
    this.nicknameForm.addEventListener('nickname-submitted', this.#handleNicknameSubmission.bind(this))
  }

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
   * Displays the difficulty selection form and hides the nickname form.
   * @private
   * @returns {void}
   */
  #showDifficultyForm() {
    this.nicknameForm.classList.add('hidden')
    this.difficultyForm.classList.remove('hidden')
  }

  /**
   * Adds listener for difficulty submission.
   * @private
   * @returns {void}
   */
  #listenForDifficultySubmitted() {
    this.difficultyForm.addEventListener('difficulty-submitted', this.#handleDifficultySubmission.bind(this))
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
   * Starts the quiz: shows the first question and initializes the timer.
   * @private
   * @returns {void}
   */
  #startQuiz() {
    this.quizQuestion.classList.remove('hidden')
    this.difficultyForm.classList.add('hidden')
    // this.countdownTimer.classList.remove('hidden')

    // Start the timer (to be implemented)
    // Display the first question
    this.#displayQuestion() // when currentQuestionIndex is 0
  }


    /**
   * Adds listener for answer submission.
   * @private
   * @returns {void}
   */
  #listenForAnswerSubmitted() {
    this.quizQuestion.addEventListener('answer-submitted', this.#handleAnswerSubmission.bind(this))
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
      if (this.#checkIfQuizEnded()) {
        this.#endQuiz()
        return
      }
      this.#displayQuestion()
    } else {
      this.#endQuiz()
    }
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
   * Displays the current question in the quiz-question component.
   * @private
   * @returns {void}
   */
  #displayQuestion() {
    this.quizQuestion.renderQuestion(this.questions[this.currentQuestionIndex])
    console.log('Rendering:', this.questions[this.currentQuestionIndex]) // ❗️ debugger
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
   * Checks whether the quiz has reached its end.
   * @private
   * @returns {boolean} True if there are no remaining questions, false otherwise.
   */
  #checkIfQuizEnded() {
    return this.currentQuestionIndex >= this.questions.length
  }

  // #endQuiz()
  // hide quiz elements
  // show high-score
  // if success -> updateHighScore

  // add later:
  // stopTimer
  // restartQuiz()

  // --- Element getters ---

  /**
   * Gets the nickname form element.
   * @private
   * @returns {HTMLElement}
   */
  get nicknameForm() {
    return this.shadowRoot.querySelector('nickname-form')
  }

  /**
   * Gets the difficulty form element.
   * @private
   * @returns {HTMLElement}
   */
  get difficultyForm() {
    return this.shadowRoot.querySelector('difficulty-form')
  }

  /**
   * Gets the quiz-question element.
   * @private
   * @returns {HTMLElement}
   */
  get quizQuestion() {
    return this.shadowRoot.querySelector('quiz-question')
  }
}

customElements.define('quiz-app', QuizApp)