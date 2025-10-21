## I used the model Haiku 4.5 (Claude) with the prompt: <br>
 **"can you help me proof-read my text. it does not to be written like an academic text, it's a reflection essay on my coding assignment. help me rephrase sentences if there is grammatical error or for better understanding. do not change the content, points or conclusions in the text, simply the language:"**

```
Key changes:
Clarified awkward phrasing (e.g., "something I don't often feel like I have to compromise with" → "something I don't often feel I have to compromise on")
Fixed grammatical issues (e.g., subject-verb agreement, tense consistency)
Improved sentence flow for better readability while keeping your original meaning
Removed redundant words where they weren't needed
Made passive constructions more active where appropriate
Clarified complex ideas without changing their meaning"
```
Note: This was my 2nd time ever using this tool and model (did this right after Workshop 3 XD)

## Original text:
### Chapter 2
Key takeaways from this chapter:
* Names should reveal intent and be self-documenting.
* Avoid disinformation.
* Use pronounceable, searchable, and consistent terms.
* Choose names that fit the problem domain rather than the technical implementation.
* Variables, methods, and classes should follow clear naming conventions.

Unlike some of the later chapters, I believe Clean code’s principles for naming is the easiest to follow and actually something I believe I don’t often feel like I have to compromise with or have a dilemma over. All these points improve both the readability and understandability of my code and actually help me during the development and I agree with them. What I struggle with the most is finding the balance between readability and understandability. When I try to explain and reveal intent in my method names, and avoid disinformation and side effects, I find the names becoming too long which makes it hard to actually read my code. 

Class names such as QuizApp, QuizQuestion, and CountdownTimer are nouns that describe their roles clearly. Method names like #handleAnswerSubmission() and #displayQuestion() use verbs and explain their actions well. I avoided vague abbreviations and used explicit names like currentQuestionIndex instead of something cryptic like qIdx.


### Chapter 3
Key takeaways from this chapter:
* Keep functions small and focused—each should do one thing.
* Use descriptive names that express intent.
* Functions should operate at one level of abstraction.
* Minimize the number of parameters and avoid side effects.

My thoughts on chapter 2 and 3 are similar to my reflections in L2. I think following Clean Code’s principles is a good guideline and does not need to be strictly followed and can sometimes be broken if it feels right and needed. I strongly agree with trying to keep functions small and focused with single responsibility but I can also sometimes find it quite limiting and not always the most beneficial when trying to make a method as small as possible. When a method needs to do a lot of things, or one single thing that requires many smaller steps. If you break everything into smaller methods, it can be easier to read and understand what the code does on an abstract level. However, when it comes to deeply having to understand the logic and how everything is implemented, it can be more challenging having to scroll back and forth to understand how every smaller method is actually implemented.

My Quiz App applies these principles mentioned quite well. Each private method serves one purpose: #evaluateAnswer() compares values, #prepareQuestions() shuffles questions, and #handleAnswerSubmission() manages the logic of a submitted answer. I also split event listeners and handlers into separate functions to keep them focused.

One area for improvement might be combining overly similar functions or extracting repeated logic. For example, both #showDifficultyForm() and #showHighScore() change visibility: a small helper like #toggleVisibility(element, show) could reduce duplication. I could perhaps even make a new class that handles that.

### Chapter 4
Before we even got to the lecture on commenting and I had read chapter 4, when I worked with L2, I already noticed that my need for commenting had reduced tremendeously. By improving my naming, revealing intent and explaining what they do I no longer felt the need to explain myself through inline comments. I mentioned this in my reflection for L2 but when I feel like I have to explain what my code does with comments, I understand there is a lack of good communication in my code and I can probably refactor my method into even more helper methods. Comments are often good method names, they try to explain what the code is doing, which is what we try to do when naming.

(Preview for ch 5)
I have no comments to explain codes but I used inline comments in my quiz-app to make navigation through my file slightly easier by giving headlines for the different parts (e.g. event-handlers or UI methods). This does bring up the need to separate the file and class further to not need comments to showcase the separation. I still believe comments can sometimes be beneficial to easier navigate and read through a file even if the code has high readability. I can imagine for high-level programming languages, the need for comments is not as prominent but for low-level languages I would appreciate more high-level lines of text explaining the code without having to deeply read into the implementation.
I used comments primarily for documentation and structure, not as a substitute for unclear code. Each class has a JSDoc header explaining its purpose, and methods include parameters and return information. Inside the functions, I rely on self-explanatory naming instead of inline comments.


### Chapter 5
Key takeaways from this chapter:
* Use consistent indentation, line length, and spacing.
* Organize code vertically by importance and execution order.
* Keep related functions close together.
* Use blank lines to separate logical sections.
* Apply consistent formatting throughout the project.

I find knowing what good formatting is quite difficult. I think it is quite subjective what is considered good formatting and people have different preferences but also have different ways they approach a code, how they read it and break it down to understand it. Knowing which way a reader would navigate through my files is difficult to foreshadow, hence why I thought deciding the order of my methods quite challenging. Especially when working with clean code, my classes’ number of methods kept growing. Which ones should be next to each other? Which information is more important to show first? At first I had the methods in my quiz-app web component in the order they were called but I also noticed it made the class quite messy to read. It was also difficult to find a method. I had an event-listener method of a web-component > method that handles it > ui method, and then it would show a new event-listener for the next web component. I eventually decided to organize it after: All event handlers > Game Flow Methods > UI Methods
I could improve the formatting by moving my template creation and rendering logic into a separate helper file to reduce file length and improve top-down readability.


### Chapter 6
Being completely honest, I struggled to really understand this chapter when I first read it so I was not intentionally thinking about if I were to use object or data structures more while writing my code. However due to the instructions of the assignment I did have a more OO approach when designing and writing my application. The main takeaways I got from the chapter was that procedural code (data structures) makes it easy to add new functions without changing existing data structures. Object-oriented code makes it easy to add new classes without changing existing functions.

In my application, I did make all internal methods private to encapsulate behavior inside each web component. Each component hide their data and interacts through custom events and each object-like class hide their internal data and expose methods where we can manipulate the data without directly touching them (through controlled methods). For example, quiz-app uses 

```
this.#countdownTimer.startTimer()
```
Telling the timer to start without having to directly manipulate this.timeLeft inside the actual CountdownTimer class.

I still had data structures where I thought it was well fitted. The questions were stored in arrays instead of objects. Every element (question) inside the question-array are of the same type. They also get treated and handled the same way and are to be looped over in the code.


### Chapter 7
Key takeaways from this chapter:
* Use exceptions, not error codes.
* Separate error handling from regular logic.
* Provide informative messages or context when errors occur.
* Don’t ignore exceptions—handle them gracefully.
* Keep the happy path clear and readable.

While I agree with everything I realized, compared to L2, I did not do as much error handling for L3. In L2, there was much more to validate and actually handle with the module having many possible errors or wrong formats for calculation. I definitely think my application needs more improvements when it comes to error handling, a lot of the current code is handled as if the module would always be correct and handles everything correctly which is not something I can be sure of.  I could introduce graceful error handling for invalid expressions or unexpected calculator results, perhaps displaying a small alert message instead of letting errors propagate. I currently rely on JavaScript’s built-in safety rather than manual try/catch blocks, which is sufficient for this project’s scale. A lot of exceptions are currently handled by the quiz just ending right now.

### Chapter 8
Key takeaways from this chapter:
* Isolate external dependencies behind your own interfaces.
* Keep your internal code independent of library implementations.
* Use clear abstraction and adapters at boundaries.
* Write tests for boundary interactions separately.

My Calculator module is imported as a dependency but treated as a black box. The QuizApp calls it through a single calculate() method without knowing its inner workings. Similarly, my shuffle() utility and questions.js are independent modules that could be swapped or replaced easily. This separation between modules means my main web component isn’t tightly coupled to its dependencies


### Chapter 9
Key takeaways from this chapter:
* Write small, fast, independent unit tests.
* Follow FIRST principles (Fast, Independent, Repeatable, Self-validating, Timely).
* Tests should assert one thing clearly.
* Tests serve as living documentation for expected behavior.
* Keep tests as clean as production code.

For my Quiz App, I haven’t implemented automated unit tests yet, but I used manual testing to verify each feature. If I added tests, I’d likely use Jest to create separate suites for the Calculator, the shuffle() function, and event handling in web components. These would ensure each part behaves independently and reliably.

### Chapter 10
Key takeaways from this chapter:
* Classes should be small and focused on a single responsibility.
* Follow SRP: each class should have one reason to change.
* Organize members consistently and group related behavior together.
* Encapsulate internal details and expose minimal public APIs.
* Keep high cohesion (methods relate strongly to the class’s purpose).
* Prefer composition over inheritance for flexibility.

I agree with the principles mentioned and tried to follow them as much as I could. However I did have a dilemma over one way I broke one of the principles and it was how my main class quiz-app handles many things, such as calculation, data management and UI logic (as well as having HTML inside my classes). This is something I have noticed is common in main files and classes. I believe there is room for improvement when it comes to following the clean code principles in my code and I could have broken down even the quiz-app into more classes that handled some parts separately. I could even have extracted the HTML template creation to separate HTML from JS but also make all my classes smaller. These were things I was aware of but believed it was not necessary to prioritise changing considering the small scale of my project and the close deadline.


### Chapter 11
My Quiz App demonstrates a simple but effective system design. Each component (quiz logic, timer, form inputs, score handling) acts as a self-contained module communicating through events rather than direct coupling. This achieves separation of concerns: for instance, the timer is responsible only for counting down, while the app handles state and game progression.
By using web components and custom events, I naturally implemented a form of dependency injection—each component interacts through defined interfaces (events and public methods) instead of relying on global variables. The system is easy to extend: for example, I could add a new “Hard” difficulty o