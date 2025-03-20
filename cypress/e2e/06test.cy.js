describe('Sweet Shop Login Test', () => {
  beforeEach(() => {
    cy.visit('https://sweetshop.netlify.app/login');
    cy.pageTest();
  });

  it('should log in and redirect to the correct page', () => {

    cy.get('#exampleInputEmail').type('test@user.com');
    cy.get('#exampleInputPassword').type('qwerty');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'https://sweetshop.netlify.app/00efc23d-b605-4f31-b97b-6bb276de447e.html');

    cy.get('.lead')
      .should('contain.text', 'Welcome back')
      .find('a')
      .should('have.text', 'test@user.com');
  });
});