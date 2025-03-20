describe('Testing elements on site', () => {

    it('Check Hacker Escape Room Title', () => {
        cy.visit('http://127.0.0.1:5500/');
        cy.get('.header__title').should("have.text", "Hacker Escape Rooms");
    })
})