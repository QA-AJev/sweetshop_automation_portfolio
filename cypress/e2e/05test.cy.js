describe('Billing Information Form Test', () => {
  beforeEach(() => {
    cy.visit('https://sweetshop.netlify.app/');
    cy.pageTest();
  });

  it('should fill in the billing information and submit the form', () => {
    let productNames = [];
    cy.get('.row.text-center .col-lg-3').each(($product, index) => {
      if (index < 4) {

        cy.wrap($product)
          .find('.card-title')
          .invoke('text')
          .then((text) => {
            productNames.push(text.trim());
          });

        cy.wrap($product).find('.addItem').click();
      }
    });

    cy.wrap(productNames).should('have.length', 4);

    cy.get('a.nav-link[href="/basket"]').click();

    cy.fillBillingForm();

    cy.get('button[type="submit"]').contains('Continue to checkout').click();

    cy.url().should('not.eq', Cypress.config('baseUrl') + '/basket?');
  });

});