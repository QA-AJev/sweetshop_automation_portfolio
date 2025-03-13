describe('SweetShop Basket Automation', () => {
    beforeEach(() => {
        cy.visit('https://sweetshop.netlify.app/');
    });

    it('Add 4 items to basket, check basket, and remove all items', () => {
        cy.request('https://sweetshop.netlify.app/').its('status').should('eq', 200);

        let productNames = []; 

        // Collect product names first, then add items
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

        cy.wrap(null).then(() => {
            expect(productNames).to.have.length(4);
        });

        // Check if basket shows 4 items
        cy.get('a.nav-link[href="/basket"] span.badge-success')
            .should('contain.text', '4');

        // Click on Basket
        cy.get('a.nav-link[href="/basket"]').click();

        // Wait for basket items to load
        cy.get('#basketItems li.list-group-item').should('have.length', 5); // Includes "Total (GBP)"

        // Extract the product names inside the basket
        cy.get('#basketItems li h6.my-0')
            .then(($items) => {
                let basketProductNames = $items.map((i, el) => Cypress.$(el).text().trim()).get();

                // Compare sorted arrays correctly (fixing Cypress assertion issue)
                expect([...basketProductNames].sort()).to.deep.equal([...productNames].sort());
            });

        // Remove all items from the basket
        cy.get('#basketItems li a.small').each(($deleteBtn) => {
            cy.wrap($deleteBtn).click();
        });

        // Verify basket is empty
        cy.get('#basketItems').should('not.exist');
        cy.get('a.nav-link[href="/basket"]').within(() => {
            cy.get('span.badge').should('have.text', '0');
        });
    });
});