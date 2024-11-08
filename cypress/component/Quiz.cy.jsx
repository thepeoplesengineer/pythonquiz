// cypress/component/Quiz.cy.jsx

import '@testing-library/cypress/add-commands'
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.mount(<Quiz />);
  });

  it('should render the start button', () => {
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and show the first question', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.get('.question').should('be.visible');
  });
});


