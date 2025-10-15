// Define the template for high-score display.
const template = document.createElement('template')
template.innerHTML = `
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

class HighScore extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    // initialize the high score list from localStorage
    if (!localStorage.getItem('highScores')) {
      localStorage.setItem('highScores', JSON.stringify([]))
    }
    this.loadScore(difficulty)
  }

  loadScores() {
    const key = `highScores-${difficulty}`
    const scores = JSON.parse(localStorage.getItem(key)) || []
    this.#renderScores(scores)
  }

  #renderScores(scores) {
    this.#clearScoreList()
    // forEach score in the array, make a table row with rank, nickname and score
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

  updateScores (newScore) {
    const key = `highScores-${newScore.difficulty}`
    const scores = JSON.parse(localStorage.getItem(key)) || []

    scores.push(newScore)
    const highScores = scores.sort((a, b) => b.score - a.score).slice(0, 5)

    localStorage.setItem(key, JSON.stringify(highScores))
  }

  #clearScoreList() {
    this.#scoreList.innerHTML = ''
  }

  get #scoreList(){
    return this.shadowRoot.querySelector('#score-list')
  }
}

customElements.define('high-score', HighScore)