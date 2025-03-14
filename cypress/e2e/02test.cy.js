describe('SweetShop Basket Automation', () => {
    beforeEach(() => {
        cy.visit('https://sweetshop.netlify.app/');
    });

    it('Verify selected items match items in the cart', () => {

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

        cy.get('#basketItems li h6.my-0')
            .then(($items) => {

                let basketProductNames = $items.map((i, el) => Cypress.$(el).text().trim()).get();
                expect([...basketProductNames].sort()).to.deep.equal([...productNames].sort());
            });
    });
});