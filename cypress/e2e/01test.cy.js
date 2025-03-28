describe('Basic Functionality Check - Navigation & Links', () => {

    beforeEach(() => {
        cy.visit('https://sweetshop.netlify.app/')
        cy.pageTest();
    });

    it('Checks all main page links and buttons', () => {

        cy.contains('Sweet Shop').should('be.visible');
        cy.get('a.nav-link[href="/basket"]').should('be.visible');
        cy.get('.card').should('have.length.greaterThan', 0);

        cy.get('a.nav-link[href="/basket"]').click();
        cy.url().should('include', '/basket');
        cy.contains('Basket').should('be.visible');
        cy.go('back');

        cy.get('.card').each(($card) => {
            cy.wrap($card).find('.addItem').should('be.visible').click();
        });
        cy.contains('Sweet Shop Project 2018').should('be.visible');


        cy.get('a.nav-link[href="/sweets"]').click();
        cy.url().should('include', '/sweets');
        cy.contains('Sweets').should('be.visible');


        cy.get('a.nav-link[href="/about"]').click();
        cy.url().should('include', '/about');
        cy.contains('About').should('be.visible');


        cy.get('a.nav-link[href="/login"]').click();
        cy.url().should('include', '/login');
        cy.contains('Login').should('be.visible');


    });

    it('Verifies nav bar links from the basket page remain functional', () => {

        cy.get('a.nav-link[href="/basket"]').click();
        cy.url().should('include', '/basket');
        cy.contains('Basket').should('be.visible');

        // Check the nav bar links
        cy.get('a.nav-link').each(($link) => {
            const linkHref = $link.attr('href');

            cy.wrap($link).should('have.attr', 'href').and('match', /^\/(sweets|about|login|basket)$/);
        });

        cy.get('a.nav-link[href="/sweets"]').should('have.attr', 'href', '/sweets');
        cy.get('a.nav-link[href="/about"]').should('have.attr', 'href', '/about');
        cy.get('a.nav-link[href="/login"]').should('have.attr', 'href', '/login');
        cy.get('a.nav-link[href="/basket"]').should('have.attr', 'href', '/basket');
    });
});