// cypress/component/Quiz.cy.jsx

import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.mount(<Quiz />);
  });

  it('should render the start button initially', () => {
    cy.get('button').contains('Start Quiz').should('be.visible'); // Select button by tag and text
  });

  it('should start the quiz and show the loading spinner', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.get('.spinner-border').should('be.visible');
  });

  it('should display a question after loading', () => {
    cy.intercept('GET', '/api/questions', {
      statusCode: 200,
      body: [
        {
          question: "Sample question 1?",
          answers: [
            { text: "Option 1", isCorrect: true },
            { text: "Option 2", isCorrect: false },
          ]
        },
        {
          question: "Sample question 2?",
          answers: [
            { text: "Option 1", isCorrect: false },
            { text: "Option 2", isCorrect: true },
          ]
        },
      ]
    }).as('getQuestions');

    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.get('.question').should('be.visible'); // Verifying that any question is displayed
    cy.get('button').contains('Option 1').should('be.visible');
    cy.get('button').contains('Option 2').should('be.visible');
  });

  it('should display the final score and "Take New Quiz" button after quiz completion', () => {
    cy.intercept('GET', '/api/questions', {
      statusCode: 200,
      body: [
        {
          question: "Sample question 1?",
          answers: [
            { text: "Option 1", isCorrect: true },
            { text: "Option 2", isCorrect: false },
          ]
        },
      ]
    }).as('getQuestions');

    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('button').contains('Option 1').click(); // Select the correct answer

    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score: 1/1').should('exist');
    cy.get('button').contains('Take New Quiz').should('be.visible');
  });
});



