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

  it('should show validation errors when logging in with empty fields', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.invalid-feedback.invalid-email')
      .should('be.visible')
      .and('contain.text', 'Please enter a valid email address.');

    cy.get('.invalid-feedback.invalid-password')
      .should('be.visible')
      .and('contain.text', 'Please enter a valid password.');
  });

  it('should show validation errors when logging in with incorrect credentials', () => {
    cy.get('#exampleInputEmail').type('wrong@user.com');
    cy.get('#exampleInputPassword').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.invalid-feedback.invalid-email')
      .should('be.visible')
      .and('contain.text', 'Please enter a valid email address.');

    cy.get('.invalid-feedback.invalid-password')
      .should('be.visible')
      .and('contain.text', 'Please enter a valid password.');
  });
});