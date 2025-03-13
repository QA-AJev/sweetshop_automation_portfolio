Cypress.Commands.add('addProductToBasket', (index = 0) => {
    cy.get('.product').eq(index).contains('Add to Basket').click();
});