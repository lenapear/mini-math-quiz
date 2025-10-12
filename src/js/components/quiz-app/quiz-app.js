/**
 * The quiz-app web component module.
 *
 * @author Lena Le <ll224ve@student.lnu.se>
 * @version 1.0.0
 */

import { easyQuestions, mediumQuestions } from "../../questions.js"
import { shuffle } from "../../shuffle.js"
import { Calculator } from "../../calculator-module/Calculator.js"

class QuizApp extends HTMLElement {
  /**
   * Creates an instance of QuizApp.
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.score = 0
    this.nickname = ''
    this.difficulty = ''
    this.questions = []
    this.currentQuestionIndex = 0
    this.calculator = new Calculator()
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
    this.listenForAnswerSubmitted()
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
    this.prepareQuestions()
    this.startQuiz()
  }

  startQuiz() {
    this.quizQuestion.classList.remove('hidden')
    this.difficultyForm.classList.add('hidden')
    // this.countdownTimer.classList.remove('hidden')

    // start the timer (will implement the timer after quiz-question is done)
    // show the first question
    this.displayQuestion() // when currentQuestionIndex is 0
  }


  listenForAnswerSubmitted() {
    this.quizQuestion.addEventListener('answer-submitted', this.handleAnswerSubmission.bind(this))
  }

  async handleAnswerSubmission(event) {
    const userAnswer = event.detail.userAnswer
    const currentQuestion = this.questions[this.currentQuestionIndex]
    
    const isCorrect = this.evaluateAnswer(currentQuestion, userAnswer)

    if (isCorrect) {
      this.score++
      this.currentQuestionIndex++
      if (this.checkIfQuizEnded()) {
        this.endQuiz()
        return
      }
      this.displayQuestion()
    } else {
      this.endQuiz()
    }
  }

  evaluateAnswer(question, answer) {
    const correct = this.calculator.calculate(question)
    return correct === Number(answer)
  }

  displayQuestion() {
    this.quizQuestion.renderQuestion(this.questions[this.currentQuestionIndex])
    console.log('Rendering:', this.questions[this.currentQuestionIndex]) // ❗️ debugger
  }

  prepareQuestions() {
    if (this.difficulty === "easy") {
      this.questions = shuffle(easyQuestions)
    } else if (this.difficulty === "medium") {
      this.questions = shuffle(mediumQuestions)
      }
  }

  checkIfQuizEnded() {
    return this.currentQuestionIndex >= this.questions.length
  }

  // endQuiz()
  // hide quiz elements
  // show high-score
  // if success -> updateHighScore

  // add later:
  // stopTimer
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
}

customElements.define('quiz-app', QuizApp)