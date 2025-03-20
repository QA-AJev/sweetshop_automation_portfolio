describe('Sweet Shop Login Test', () => {
  beforeEach(() => {
    cy.visit('https://sweetshop.netlify.app/login');
  });
  it('should log in and redirect to the correct page', () => {
    // Step 1: Log in
    cy.get('#exampleInputEmail').type('test@user.com');
    cy.get('#exampleInputPassword').type('qwerty');
    cy.get('button[type="submit"]').click();

    // Step 2: Verify the URL and the "Welcome back" message

    cy.url().should('eq', 'https://sweetshop.netlify.app/00efc23d-b605-4f31-b97b-6bb276de447e.html');
    cy.get('.lead')
      .should('contain.text', 'Welcome back')
      .find('a')
      .should('have.text', 'test@user.com');

    //Login test END//

    cy.get('.order-date').click();
    cy.wait(500);
    cy.get('#transactions tbody tr')
      .first()
      .find('td:nth-child(2)')
      .invoke('text')
      .then((dateText) => {
        cy.log('First row date after ascending sort:', dateText.trim());
        expect(dateText.trim()).to.equal('1st December 2019');
      });

    cy.get('.order-date').click();
    cy.wait(500);
    cy.get('#transactions tbody tr')
      .first()
      .find('td:nth-child(2)')
      .invoke('text')
      .then((dateText) => {
        cy.log('First row date after descending sort:', dateText.trim());
        expect(dateText.trim()).to.equal('11th Feb 2019');
      });
    cy.get('.order-total').click();
    cy.wait(500);
    cy.get('#transactions tbody tr')
      .first()
      .find('td:nth-child(4)')
      .invoke('text')
      .then((totalText) => {
        cy.log('First row total after ascending sort:', totalText.trim());
        expect(totalText.trim()).to.equal('8.00');
      });
    cy.get('.order-total').click();
    cy.wait(500);

    // Verify the first row shows the largest total after descending sort

    cy.get('#transactions tbody tr')
      .first()
      .find('td:nth-child(4)')
      .invoke('text')
      .then((totalText) => {
        cy.log('First row total after descending sort:', totalText.trim());
        expect(totalText.trim()).to.equal('0.75');
      });
  });
});