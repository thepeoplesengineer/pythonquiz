// cypress/e2e/quiz.cy.ts

describe('Quiz Form Flow', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should start the quiz and display the first question', () => {
      cy.intercept('GET', '/random', {
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
        ],
      }).as('getQuestions');
  
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@getQuestions'); // Wait for the intercepted API call
  
      // Confirm that the first question is displayed
      cy.get('.question').should('be.visible');
    });
  
    it('should complete the quiz and display the final score', () => {
      cy.intercept('GET', '/random', {
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
        ],
      }).as('getQuestions');
  
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@getQuestions'); // Wait for the intercepted API call
  
      // Loop through each question and select the correct answer
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
  
  