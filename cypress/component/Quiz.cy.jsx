// cypress/component/Quiz.cy.jsx

import Quiz from '../../client/src/components/Quiz';
import '@testing-library/cypress/add-commands';

describe('Quiz Component', () => {
  beforeEach(() => {
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

    cy.mount(<Quiz />);
  });

  it('should render the start button', () => {
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and show the first question', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions'); // Wait for the intercepted API call
    cy.get('.question').should('be.visible');
  });

  it('should display the final score after completing the quiz', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions'); // Wait for the intercepted API call

    const correctAnswers = ["8", "list"];
    correctAnswers.forEach((answer) => {
      cy.get('.question').should('be.visible');
      cy.get('button').contains(answer).click();
    });

    cy.contains('Quiz Completed').should('exist');
    cy.get('.alert-success').should('contain.text', 'Your score: 2/2');
    cy.get('button').contains('Take New Quiz').should('be.visible');
  });
});
