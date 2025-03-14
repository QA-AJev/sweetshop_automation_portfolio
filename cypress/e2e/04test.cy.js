describe('Test 04 - Add all items to basket and proceed to checkout', () => {
    const productsInStore = [
        { name: 'Sherbert Straws', price: '£0.75' },
        { name: 'Sherbet Discs', price: '£0.95' },
        { name: 'Strawberry Bon Bons', price: '£1.00' },
        { name: 'Chocolate Cups', price: '£1.00' },
        { name: 'Raspberry Drumstick', price: '£0.20' },
        { name: 'Sweet Whistle', price: '£0.25' },
        { name: 'Chocolate Beans', price: '£0.80' },
        { name: 'Bubbly', price: '£0.10' },
        { name: 'Wham Bar', price: '£0.15' },
        { name: 'Bubble Gums', price: '£0.25' },
        { name: 'Nerds', price: '£0.60' },
        { name: 'Sherbet Discs', price: '£0.95' },
        { name: 'Dolly Mixture', price: '£0.90' },
        { name: 'Jellies', price: '£0.75' },
    ];

    beforeEach(() => {
        cy.visit('https://sweetshop.netlify.app/sweets');
    });

    it('should add all products to the basket and proceed to checkout', () => {
        cy.get('.card', { timeout: 6000 }).should('have.length.greaterThan', 0);

        cy.get('.card').each(($card) => {
            cy.wrap($card).find('.addItem').click();
        });

        cy.get(':nth-child(4) > .nav-link').click();

        // Wait for the basket items to appear and check if they are added
        cy.get('#basketItems .list-group-item', { timeout: 10000 }).should('have.length.greaterThan', 0);

        cy.get('#basketItems .list-group-item').each(($item, index) => {
            const basketName = $item.find('h6.my-0').text();
            const basketPrice = $item.find('span.text-muted').text();

            const matchingProduct = productsInStore.find(product => product.name === basketName);

            if (matchingProduct) {
                console.log(`Basket item: ${basketName} - Price: ${basketPrice}`);
                expect(basketName).to.equal(matchingProduct.name);
                expect(basketPrice).to.equal(matchingProduct.price);
            } else {
                console.log(`❌ Product not found in store: ${basketName}`);
            }
        });
    });
});