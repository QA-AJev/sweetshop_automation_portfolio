// describe('SweetShop Basket Automation', () => {
//     beforeEach(() => {
//         cy.visit('https://sweetshop.netlify.app/');
//         cy.pageTest();
//     });

//     it('Verify selected items match items in the cart and basket count updates correctly', () => {
//         const addProducts = () => {
//             const products = [];
//             return cy.get('.row.text-center .col-lg-3')
//                 .then($elements => {
//                     $elements = $elements.slice(0, 4);
//                     return Cypress.Promise.each($elements, $product => {
//                         return cy.wrap($product)
//                             .find('.card-title')
//                             .invoke('text')
//                             .then(text => {
//                                 const productName = text.trim();
//                                 products.push(productName);
//                                 cy.log(`Adding product: ${productName}`);
//                                 return cy.wrap($product).find('.addItem').click();
//                             });
//                     }).then(() => products);
//                 });
//         };

//         addProducts().then(productNames => {
//             cy.log('Added products:', productNames);

//             // Verify basket count
//             cy.get('a.nav-link[href="/basket"] span.badge-success')
//                 .should('have.text', productNames.length.toString());

//             // Navigate to basket
//             cy.get('a.nav-link[href="/basket"]').click();

//             cy.get('#basketItems li:not(:contains("Total"))')
//                 .should('have.length', productNames.length)
//                 .then($basketItems => {
//                     const basketNames = [];

//                     $basketItems.each((i, el) => {
//                         const name = Cypress.$(el).find('h6.my-0').text().trim();
//                         basketNames.push(name);
//                         cy.log(`Basket item ${i + 1}: "${name}"`);
//                     });

//                     const normalizedProductNames = productNames.map(name => name.toLowerCase()).sort();
//                     const normalizedBasketNames = basketNames.map(name => name.toLowerCase()).sort();

//                     cy.log('Normalized product names:', normalizedProductNames);
//                     cy.log('Normalized basket names:', normalizedBasketNames);

//                     let allMatch = true;
//                     let mismatchDetails = '';

//                     if (normalizedProductNames.length !== normalizedBasketNames.length) {
//                         allMatch = false;
//                         mismatchDetails += `Length mismatch: ${normalizedProductNames.length} vs ${normalizedBasketNames.length}. `;
//                     }

//                     for (let i = 0; i < normalizedProductNames.length; i++) {
//                         if (normalizedProductNames[i] !== normalizedBasketNames[i]) {
//                             allMatch = false;
//                             mismatchDetails += `Mismatch at position ${i}: "${normalizedProductNames[i]}" vs "${normalizedBasketNames[i]}". `;
//                         }
//                     }

//                     expect(allMatch, mismatchDetails).to.be.true;
//                 });
//         });
//     });
// });

describe('SweetShop Basket Automation', () => {
    beforeEach(() => {
        cy.visit('https://sweetshop.netlify.app/');
        cy.pageTest();
    });

    it('Verify selected items match items in the cart and basket count updates correctly', () => {
        const addProducts = () => {
            const products = [];
            return cy.get('.row.text-center .col-lg-3')
                .then($elements => {
                    $elements = $elements.slice(0, 4);
                    return Cypress.Promise.each($elements, $product => {
                        return cy.wrap($product)
                            .find('.card-title')
                            .invoke('text')
                            .then(text => {
                                const productName = text.trim();
                                products.push(productName);
                                cy.log(`Adding product: ${productName}`);
                                return cy.wrap($product).find('.addItem').click();
                            });
                    }).then(() => products);
                });
        };

        addProducts().then(productNames => {
            cy.log('Added products:', productNames);

            // Verify basket count
            cy.get('a.nav-link[href="/basket"] span.badge-success')
                .should('have.text', productNames.length.toString());

            // Navigate to basket
            cy.get('a.nav-link[href="/basket"]').click();

            cy.get('#basketItems li:not(:contains("Total"))')
                .should('have.length', productNames.length)
                .then($basketItems => {
                    const basketNames = [];

                    $basketItems.each((i, el) => {
                        const name = Cypress.$(el).find('h6.my-0').text().trim();
                        basketNames.push(name);
                        cy.log(`Basket item ${i + 1}: "${name}"`);
                    });

                    const normalizedProductNames = productNames.map(name => name.toLowerCase()).sort();
                    const normalizedBasketNames = basketNames.map(name => name.toLowerCase()).sort();

                    cy.log('Normalized product names:', normalizedProductNames);
                    cy.log('Normalized basket names:', normalizedBasketNames);

                    let allMatch = true;
                    let mismatchDetails = '';

                    if (normalizedProductNames.length !== normalizedBasketNames.length) {
                        allMatch = false;
                        mismatchDetails += `Length mismatch: ${normalizedProductNames.length} vs ${normalizedBasketNames.length}. `;
                    }

                    const unmatchedItems = [...normalizedProductNames];
                    normalizedBasketNames.forEach(name => {
                        const index = unmatchedItems.indexOf(name);
                        if (index !== -1) {
                            unmatchedItems.splice(index, 1);
                        }
                    });

                    if (unmatchedItems.length > 0) {
                        allMatch = false;
                        mismatchDetails += `Unmatched items: ${unmatchedItems.join(', ')}.`;
                    }

                    expect(allMatch, mismatchDetails).to.be.true;
                });
        });
    });
});