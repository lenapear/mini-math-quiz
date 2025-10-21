/**
 * @fileoverview Defines the <high-score> web component,
 * responsible for displaying and updating local high scores.
 *
 * @module components/high-score
 * @author Lena Le
 * @version 1.0.0
 */

// Define the template for high-score display.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .high-score {
      text-align: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 0.5em;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f4f4f4;
    }
  </style>

  <div class="high-score">
    <h2>High Score</h2>
    <table>
      <thead>
        <tr>
        <th>Rank</th>
        <th>Nickname</th>
        <th>Score</th>
        </tr>
      </thead>
      <tbody id="score-list">
        <!-- High-score rows will be dynamically inserted here -->
      </tbody>
    </table>
  </div>
`
/**
 * Custom Web Component for displaying and updating high scores.
 */
class HighScore extends HTMLElement {
  /**
   * Creates an instance of HighScore and attaches the shadow DOM.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
  }

  /**
   * Loads and renders high scores for the given difficulty.
   * @param {string} difficulty - The current game difficulty ('easy' or 'medium').
   * @returns {void}
   */
  loadScores(difficulty) {
    console.log('Loading scores for:', difficulty) // 🚩
    const key = `highScores-${difficulty}`
    const scores = JSON.parse(localStorage.getItem(key)) || []
    this.#renderScores(scores)
  }

  /**
   * Updates localStorage with a new score, keeping only the top 5.
   * @param {{ nickname: string, score: number, difficulty: string }} newScore - The new score entry.
   * @returns {void}
   */
  updateScores (newScore) {
    const key = `highScores-${newScore.difficulty}`
    const scores = JSON.parse(localStorage.getItem(key)) || []

    scores.push(newScore)
    const highScores = scores.sort((a, b) => b.score - a.score).slice(0, 5)

    localStorage.setItem(key, JSON.stringify(highScores))
  }

  /**
   * Renders the high score table.
   * @private
   * @param {{ nickname: string, score: number }[]} scores - The list of high scores to render.
   * @returns {void}
   */
  #renderScores(scores) {
    this.#clearScoreList()
    console.log('Rendering', scores)

    scores.forEach((entry, index) => {
      const row = document.createElement('tr')
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.nickname}</td>
        <td>${entry.score}</td>
      `
      this.#scoreList.appendChild(row)
    })
  }

  /**
   * Clears the existing high score table content.
   * @private
   * @returns {void}
   */
  #clearScoreList() {
    this.#scoreList.innerHTML = ''
  }

  /**
   * Gets the table body element where scores are displayed.
   * @private
   * @returns {HTMLElement}
   */
  get #scoreList(){
    return this.shadowRoot.querySelector('#score-list')
  }
}

customElements.define('high-score', HighScore)