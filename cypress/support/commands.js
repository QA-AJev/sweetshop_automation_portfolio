import { faker } from '@faker-js/faker';

Cypress.Commands.add('fillBillingForm', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const address = faker.address.streetAddress();
    const address2 = faker.address.secondaryAddress();

    const cities = ['Bristol', 'Cardiff', 'Swansea'];
    const city = faker.helpers.arrayElement(cities);

    const zip = faker.address.zipCode();

    cy.get('input#name').first().type(firstName);
    cy.get('input#name').last().type(lastName);
    cy.get('#email').type(email);
    cy.get('#address').type(address);
    cy.get('#address2').type(address2);

    cy.get('#country').select('United Kingdom');
    cy.get('#city').select(city);
    cy.get('#zip').type(zip);

    const cardName = faker.name.fullName();
    const cardNumber = faker.finance.creditCardNumber();

    const expirationDate = new Date(faker.date.future());
    const month = (`0${expirationDate.getMonth() + 1}`).slice(-2);
    const year = expirationDate.getFullYear().toString().slice(-2);
    const cardExpiration = `${month}/${year}`;

    const cardCVV = faker.finance.creditCardCVV();

    cy.get('#cc-name').type(cardName);
    cy.get('#cc-number').type(cardNumber);
    cy.get('#cc-expiration').type(cardExpiration);
    cy.get('#cc-cvv').type(cardCVV);


});