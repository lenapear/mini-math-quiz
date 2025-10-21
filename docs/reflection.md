# Reflection
**Note:** Check out [reflection_original.md]() for the original written text and prompt used to rewrite this text for better grammar and phrasing.

### Chapter 2
Key takeaways from this chapter:
- Names should reveal intent and be self-documenting
- Avoid disinformation
- Use pronounceable, searchable, and consistent terms
- Choose names that fit the problem domain rather than the technical implementation
- Variables, methods, and classes should follow clear naming conventions

Unlike some of the later chapters, I believe Clean Code's naming principles are the easiest to follow and actually something I don't often feel I have to compromise on or struggle with. All these points improve both the readability and understandability of my code and actually help me during development. What I struggle with most is finding the balance between readability and understandability. When I try to reveal intent in my method names and avoid disinformation, I find the names becoming too long, which makes it hard to actually read my code.

Class names such as `QuizApp`, `QuizQuestion`, and `CountdownTimer` are nouns that clearly describe their roles. Method names like `#handleAnswerSubmission()` and `#displayQuestion()` use verbs and explain their actions well. I avoided vague abbreviations and used explicit names like `currentQuestionIndex` instead of something cryptic like `qIdx`.

### Chapter 3
Key takeaways from this chapter:
- Keep functions small and focused—each should do one thing
- Use descriptive names that express intent
- Functions should operate at one level of abstraction
- Minimize the number of parameters and avoid side effects

My thoughts on chapters 2 and 3 are similar to my reflections in L2. I think following Clean Code's principles is a good guideline that doesn't need to be strictly adhered to and can sometimes be broken if it feels necessary. I strongly agree with keeping functions small and focused with single responsibility, but I also find it can sometimes be limiting and not always beneficial when trying to minimize a method's size. When a method needs to do many things or accomplish one complex task with many steps, breaking everything into smaller methods can make it easier to understand what the code does at a high level. However, when you need to deeply understand the logic and implementation, it can be more challenging to scroll back and forth between methods.

My Quiz App applies these principles well. Each private method serves one purpose: `#evaluateAnswer()` compares values, `#prepareQuestions()` shuffles questions, and `#handleAnswerSubmission()` manages submitted answers. I also split event listeners and handlers into separate functions to keep them focused.

One area for improvement might be combining overly similar functions or extracting repeated logic. For example, both `#showDifficultyForm()` and `#showHighScore()` change visibility. A small helper like `#toggleVisibility(element, show)` could reduce duplication, or I could even create a new class to handle that.

### Chapter 4
Before I even attended the lecture on commenting, I had already noticed while working on L2 that my need for comments had reduced tremendously. By improving my naming, revealing intent, and explaining what my code does, I no longer felt the need to explain myself with inline comments. I mentioned this in my L2 reflection, but when I feel I have to explain what my code does through comments, it signals that there's a lack of clear communication in my code, and I could probably refactor my method into even more helper methods. Comments are often what good method names try to do—explain what the code is doing.

(Preview for Chapter 5)
I haven't added comments to explain my code, but I used inline comments in my quiz-app to make navigation easier by creating section headers for different parts (e.g., event-handlers or UI methods). This reveals the need to further separate my file and class to avoid needing comments to show structural divisions. I still think comments can be beneficial for navigating and reading through a file, even when the code has high readability. For high-level programming languages, comments may be less essential, but for lower-level languages, I'd appreciate high-level explanatory text without having to dive deeply into the implementation details.

I used comments primarily for documentation and structure, not as a substitute for unclear code. Each class has a JSDoc header explaining its purpose, and methods include parameter and return information. Inside the functions, I rely on self-explanatory naming instead of inline comments.

### Chapter 5
Key takeaways from this chapter:
- Use consistent indentation, line length, and spacing
- Organize code vertically by importance and execution order
- Keep related functions close together
- Use blank lines to separate logical sections
- Apply consistent formatting throughout the project

I find it quite difficult to know what constitutes good formatting. I think it's quite subjective—different people have different preferences and different ways of approaching code and understanding it. Knowing how a reader would navigate my files is hard to predict, which is why I found deciding the order of my methods quite challenging. Especially when following clean code principles, my classes' methods kept growing. Which ones should be next to each other? Which information is more important to show first? At first, I ordered the methods in my quiz-app web component by execution order, but I noticed it made the class messy to read and difficult to find a method. The flow was: event-listener method of a web component → method that handles it → UI method, then → next event-listener for the next web component. Eventually, I decided to organize it as: All event handlers → Game Flow Methods → UI Methods.

I could improve the formatting by moving my template creation and rendering logic into a separate helper file to reduce file length and improve top-down readability.

### Chapter 6
To be honest, I struggled to really understand this chapter when I first read it, so I wasn't intentionally thinking about whether to use objects or data structures while writing my code. However, because of the assignment requirements, I did take a more object-oriented approach when designing and writing my application. The main takeaways I got were: procedural code (data structures) makes it easy to add new functions without changing existing data structures, while object-oriented code makes it easy to add new classes without changing existing functions.

In my application, I made all internal methods private to encapsulate behavior inside each web component. Each component hides its data and interacts through custom events, and each class hides its internal data, exposing only controlled methods to manipulate it without direct access. For example, quiz-app uses:
```
this.#countdownTimer.startTimer()
```
This tells the timer to start without having to directly manipulate `this.timeLeft` inside the `CountdownTimer` class.

I still used data structures where they fit well. Questions are stored in arrays rather than objects because every element (question) is of the same type, they're handled the same way, and they're looped over in the code.

### Chapter 7
Key takeaways from this chapter:
- Use exceptions, not error codes
- Separate error handling from regular logic
- Provide informative messages or context when errors occur
- Don't ignore exceptions—handle them gracefully
- Keep the happy path clear and readable

While I agree with these principles, I realized I didn't do as much error handling in L3 compared to L2. In L2, there was much more to validate, with the module having many possible errors or wrong formats for calculations. I definitely think my application needs improvement in error handling; much of the current code assumes the module always works correctly, which isn't something I can be certain of. I could introduce graceful error handling for invalid expressions or unexpected calculator results, perhaps displaying an alert message instead of letting errors propagate. Currently, I rely on JavaScript's built-in safety rather than manual try/catch blocks, which is sufficient for this project's scope. Many exceptions are currently handled by simply ending the quiz.

### Chapter 8
Key takeaways from this chapter:
- Isolate external dependencies behind your own interfaces
- Keep your internal code independent of library implementations
- Use clear abstraction and adapters at boundaries
- Write tests for boundary interactions separately

My Calculator module is imported as a dependency but treated as a black box. The QuizApp calls it through a single `calculate()` method without knowing its inner workings. Similarly, my `shuffle()` utility and `questions.js` are independent modules that could be swapped or replaced easily. This separation between modules means my main web component isn't tightly coupled to its dependencies.

### Chapter 9
Key takeaways from this chapter:
- Write small, fast, independent unit tests
- Follow FIRST principles (Fast, Independent, Repeatable, Self-validating, Timely)
- Tests should assert one thing clearly
- Tests serve as living documentation for expected behavior
- Keep tests as clean as production code

I haven't implemented automated unit tests for my Quiz App yet, but I used manual testing to verify each feature. If I were to add tests, I'd likely use Jest to create separate suites for the Calculator, the `shuffle()` function, and event handling in web components. These would ensure each part behaves independently and reliably.

### Chapter 10
Key takeaways from this chapter:
- Classes should be small and focused on a single responsibility
- Follow SRP: each class should have one reason to change
- Organize members consistently and group related behavior together
- Encapsulate internal details and expose minimal public APIs
- Keep high cohesion (methods strongly relate to the class's purpose)
- Prefer composition over inheritance for flexibility

I agree with the principles mentioned and tried to follow them as much as I could. However, I did face a dilemma: my main class, quiz-app, handles many things—calculation, data management, UI logic, and even contains HTML. This is something I've noticed is common in main files and classes. I believe there's room for improvement in following clean code principles, and I could have broken down quiz-app into more specialized classes to handle different parts separately. I could have even extracted the HTML template creation to separate HTML from JS, making all my classes smaller. I was aware of these improvements but didn't prioritize them given the small scale of my project and the tight deadline.

### Chapter 11
My Quiz App demonstrates a simple but effective system design. Each component (quiz logic, timer, form inputs, score handling) acts as a self-contained module communicating through events rather than direct coupling. This achieves separation of concerns: for instance, the timer is only responsible for counting down, while the app handles state and game progression.

By using web components and custom events, I naturally implemented a form of dependency injection—each component interacts through defined interfaces (events and public methods) instead of relying on global variables. The system is easy to extend: for example, I could add a new "Hard" difficulty level by simply creating a new event and handler without restructuring existing code.

