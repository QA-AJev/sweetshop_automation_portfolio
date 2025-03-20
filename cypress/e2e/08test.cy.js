describe('Check Nav Bar Links in Basket Page', () => {
    beforeEach(() => {
        cy.visit('https://sweetshop.netlify.app/')
        cy.pageTest();
    });

    it('Verifies nav bar links from the basket page remain functional', () => {
        
        cy.get('a.nav-link[href="/basket"]').click();
        cy.url().should('include', '/basket');
        cy.contains('Basket').should('be.visible');

        // Check the nav bar links
        cy.get('a.nav-link').each(($link) => {
            const linkHref = $link.attr('href');
            
            cy.wrap($link).should('have.attr', 'href').and('match', /^\/(sweets|about|login|basket)$/);  // Checks the possible links
        });

        cy.get('a.nav-link[href="/sweets"]').should('have.attr', 'href', '/sweets');
        cy.get('a.nav-link[href="/about"]').should('have.attr', 'href', '/about');
        cy.get('a.nav-link[href="/login"]').should('have.attr', 'href', '/login');
        cy.get('a.nav-link[href="/basket"]').should('have.attr', 'href', '/basket');
    });
});