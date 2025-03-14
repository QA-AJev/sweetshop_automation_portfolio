describe('Billing Information Form Test', () => {
  beforeEach(() => {
    cy.visit('https://sweetshop.netlify.app/basket'); // Visit the checkout page
  });

  it('should fill in the billing information and submit the form', () => {
    // Use the custom command to fill in the form
    cy.fillBillingForm();
    cy.get('.needs-validation > .btn').click();

    cy.get('.needs-validation > .btn').first().click();
  });
});