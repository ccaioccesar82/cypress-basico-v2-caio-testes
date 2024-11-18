Cypress.Commands.add('writeFileAndSubmit', function(){ //Função para preencher formulário e enviá-lo
    cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('João')
        .should('have.value', 'João')
        
        cy.get('input[id="lastName"]')
        .should('be.visible')
        .type('Teste')
        .should('have.value', 'Teste')

        cy.get('input[id="email"]')
        .should('be.visible')
        .type('teste123@hotmail.com')
        .should('have.value', 'teste123@hotmail.com')

        cy.get('textarea[id="open-text-area"]')
        .should('be.visible')
        .type('Estamos com problema de serviço')
        .should('have.value', 'Estamos com problema de serviço')

        cy.get('button[class="button"]')
        .click()

})

Cypress.Commands.add('chooseSelect', function(targetElement,selectElement,){ //Função para selecionar os selects

    cy.get(targetElement)//Passa o id do select
    .select(selectElement) //Passa o id do select que deseja selecionar
    .should('have.value', selectElement) //Se certifica de que o valor selecionado foi o pedido
})