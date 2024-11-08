// cypress/e2e/quiz.cy.js

describe('Quiz Form Flow', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should start the quiz and display the first question', () => {
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: [
          {
            question: "What is the output of print(2 ** 3)?",
            answers: [
              { text: "6", isCorrect: false },
              { text: "8", isCorrect: true },
              { text: "9", isCorrect: false },
              { text: "12", isCorrect: false }
            ]
          },
          {
            question: "Which of the following is a mutable data type in Python?",
            answers: [
              { text: "str", isCorrect: false },
              { text: "tuple", isCorrect: false },
              { text: "list", isCorrect: true },
              { text: "int", isCorrect: false }
            ]
          },
          {
            question: "What is the keyword used to define a function in Python?",
            answers: [
              { text: "function", isCorrect: false },
              { text: "func", isCorrect: false },
              { text: "def", isCorrect: true },
              { text: "define", isCorrect: false }
            ]
          },
          {
            question: "Which of the following is used to create an empty set?",
            answers: [
              { text: "{}", isCorrect: false },
              { text: "[]", isCorrect: false },
              { text: "set()", isCorrect: true },
              { text: "()", isCorrect: false }
            ]
          },
          {
            question: "What is the output of len('hello world')?",
            answers: [
              { text: "10", isCorrect: false },
              { text: "11", isCorrect: true },
              { text: "12", isCorrect: false },
              { text: "13", isCorrect: false }
            ]
          },
          {
            question: "Which method is used to remove whitespace from the beginning and end of a string?",
            answers: [
              { text: "strip()", isCorrect: true },
              { text: "trim()", isCorrect: false },
              { text: "clean()", isCorrect: false },
              { text: "remove()", isCorrect: false }
            ]
          },
          {
            question: "What does the // operator do in Python?",
            answers: [
              { text: "Performs integer division", isCorrect: true },
              { text: "Performs floating-point division", isCorrect: false },
              { text: "Calculates the power of a number", isCorrect: false },
              { text: "Performs a logical AND operation", isCorrect: false }
            ]
          },
          {
            question: "Which of the following is a valid variable name in Python?",
            answers: [
              { text: "1_variable", isCorrect: false },
              { text: "variable_1", isCorrect: true },
              { text: "variable-1", isCorrect: false },
              { text: "variable 1", isCorrect: false }
            ]
          },
          {
            question: "What is the output of type(3.14)?",
            answers: [
              { text: "<class 'int'>", isCorrect: false },
              { text: "<class 'float'>", isCorrect: true },
              { text: "<class 'complex'>", isCorrect: false },
              { text: "<class 'decimal'>", isCorrect: false }
            ]
          },
          {
            question: "Which of the following statements is used to handle exceptions in Python?",
            answers: [
              { text: "catch", isCorrect: false },
              { text: "except", isCorrect: true },
              { text: "handle", isCorrect: false },
              { text: "try", isCorrect: false }
            ]
          },
        ]
      }).as('getQuestions');
  
      // Start the quiz and wait for questions to load
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@getQuestions'); // Wait for the mock data to be loaded
  
      // Verify the first question is displayed
      cy.get('.question').should('be.visible');
    });
  
    it('should complete the quiz and display the final score', () => {
      // Mocking API response for consistent testing
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: [
          {
            question: "What is the output of print(2 ** 3)?",
            answers: [
              { text: "6", isCorrect: false },
              { text: "8", isCorrect: true },
              { text: "9", isCorrect: false },
              { text: "12", isCorrect: false }
            ]
          },
          {
            question: "Which of the following is a mutable data type in Python?",
            answers: [
              { text: "str", isCorrect: false },
              { text: "tuple", isCorrect: false },
              { text: "list", isCorrect: true },
              { text: "int", isCorrect: false }
            ]
          },
          // Add more questions if needed for longer tests
        ]
      }).as('getQuestions');
  
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@getQuestions');
  
      // Define answers to select in order
      const correctAnswers = ["8", "list"];
  
      correctAnswers.forEach((answer) => {
        cy.get('.question').should('be.visible');
        cy.get('button').contains(answer).click();
      });
  
      // Verify final score display
      cy.contains('Quiz Completed').should('exist');
      cy.get('.alert-success').should('contain.text', 'Your score: 2/2');
      cy.get('button').contains('Take New Quiz').should('be.visible');
    });
  });
  
  