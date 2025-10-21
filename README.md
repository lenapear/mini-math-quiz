# Mini Math Quiz

**Mini Math Quiz** is a lightweight, event-driven web application that challenges players to solve as many math problems as possible within a limited time.  

🕹️ **Play the live version here:** [https://minimathquiz.netlify.app/](https://minimathquiz.netlify.app/)

## 🧩 Features

- 🎮 Interactive quiz with **dynamic question rendering**
- ⏱️ **Countdown timer** for the entire game session (default: 60 seconds)
- 🧠 Two difficulty levels: **Easy** and **Medium**
- 🏆 **High-score table** stored in `localStorage`, separated per difficulty
- 👤 Nickname input and difficulty selection before each game
- 🔁 **Restart button** after each round for immediate replay
- ✨ Modular structure using **encapsulated Web Components**
- 📐 Follows **Clean Code** practices — small classes, private methods, clear naming, and separation of concerns

## 🧠 How It Works

The app is built from multiple **custom Web Components**, each handling a specific responsibility:

| Component | Responsibility |
|------------|----------------|
| `<quiz-app>` | Main controller managing game flow, event handling, and score updates |
| `<nickname-form>` | Collects the player’s nickname |
| `<difficulty-form>` | Allows the player to select difficulty |
| `<quiz-question>` | Displays math questions and handles user input |
| `<countdown-timer>` | Controls the timer and dispatches the `time-up` event |
| `<high-score>` | Manages localStorage and displays high scores per difficulty |

Each component communicates via **Custom Events**, enabling an event-driven and decoupled design.

## ⚙️ Technologies Used

- **HTML5 / CSS3**
- **JavaScript (ES2022+)**
- **Web Components API**
- **Modules and Custom Events**
- **LocalStorage API**
- **Clean Code** principles (Robert C. Martin)

## 🚀 Getting Started (for development)

> The game is already deployed and playable online at [https://minimathquiz.netlify.app/](https://minimathquiz.netlify.app/).  
> The following steps are only necessary if you wish to run or develop it locally.

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/mini-math-quiz.git
```

### 2. Run locally

Open the project using **Live Server** (VS Code extension) or any local HTTP server:

```bash
cd mini-math-quiz/src
```

Then right-click `index.html` → **“Open with Live Server.”**

### 3. Play the quiz locally

1. Enter a nickname.  
2. Choose a difficulty level.  
3. Solve as many questions as you can before the timer expires.  
4. View your score and check the high-score table.

## 🧩 Module Dependencies

- `quiz-app.js` depends on:
  - `Calculator.js` for mathematical evaluation
  - `questions.js` for question data
  - `shuffle.js` for randomization
  - Other Web Components (nickname, difficulty, question, timer, high-score)
- Each component is **independent** and communicates through events.

## 🔮 Future Improvements

The current version focuses on functionality and code quality.  
Planned or suggested improvements include:

- 🎨 **Styling (CSS)** — add responsive and polished design (high priority)
- 💪 **Hard difficulty mode** — including parentheses and more complex expressions  
- 🔊 **Sound effects / animations** for correct and incorrect answers  
- 📊 **Game statistics view** — total questions answered, accuracy, etc.  
- 🌐 **Backend integration** — shared high-score leaderboard for multiple users

The project is open under the **MIT License**, encouraging other developers to contribute and extend its functionality.

## 🧑‍💻 Author

**Lena Le**  
*Student at Linnaeus University*  
📧 ll224ve@student.lnu.se

## ⚖️ License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.  

## 💡 Acknowledgments

- *Clean Code: A Handbook of Agile Software Craftsmanship* by **Robert C. Martin**  
- Course **1DV610 – Introduktion till mjukvarukvalitet**  
- The project is **heavily inspired by Assignment B2** from **1DV025**,  
  but re-imagined with a different game flow, new features, and rewritten following **Clean Code principles** for improved structure and maintainability.
