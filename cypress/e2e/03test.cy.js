describe('Verify Product Images, Names, and Prices', () => {
    beforeEach(() => {
        cy.visit('https://sweetshop.netlify.app/sweets');
    });

    it('Checks that each product has a visible image, name, and price', () => {
        cy.get('.card').each(($card) => {
            cy.wrap($card)
                .find('.card-img-top')
                .should('be.visible')
                .then(($img) => {
                    const img = $img[0];
                    expect(img.naturalWidth).to.be.greaterThan(0); // Fail the test if image doesn't load
                });

            cy.wrap($card).find('.card-title').should('not.be.empty');

            cy.wrap($card)
                .find('.text-muted')
                .invoke('text')
                .should((priceText) => {
                    expect(priceText.trim()).to.match(/^£\d+(\.\d{2})?$/);
                });
        });
    });
});