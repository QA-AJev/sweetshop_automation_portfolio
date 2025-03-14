describe('Verify Product Images, Names, and Prices', () => {
    beforeEach(() => {
        cy.visit('https://sweetshop.netlify.app/sweets');
    });

    it('Checks that each product has a visible image, name, and price', () => {
        cy.get('.card').each(($card) => {
            // Check image is visible and not broken
            cy.wrap($card)
            .find('.card-img-top')
            .should('be.visible')
            .then(($img) => {
              if ($img[0].naturalWidth === 0) {
                cy.task('log', `❌ Image is missing: ${$card.find('.card-title').text()}`);
                return Cypress.Promise.reject(`Image failed to load for ${$card.find('.card-title').text()}`);
              }
            });


            cy.wrap($card).find('.card-title').should('not.be.empty');

            cy.wrap($card)
                .find('.text-muted')
                .invoke('text')
                .should((priceText) => {
                    expect(priceText.trim()).to.match(/^£\d+\.\d{2}$/);
                });
        });
    });
});