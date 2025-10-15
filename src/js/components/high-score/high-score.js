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
    // this.loadScore()
  }

  // loadScores() - load the high scores from localStorage and render them

  // #renderScores(scores)
  // #score-list - clear the previous content inside
  // forEach score in the array, make a table row with rank, nickname and score

  // updateScores (newScore)
  // const scores = JSON.parse(localStorage.getItem('highScores')) || []
  // add newScore to scores and sort by amount of scores (descending)
  // save the updated high scores to localStorage
  // re-render the updated score table
}

customElements.define('high-score', HighScore)