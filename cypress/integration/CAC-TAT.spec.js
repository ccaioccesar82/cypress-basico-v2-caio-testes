/// <reference types="Cypress" />
beforeEach(()=> {
    cy.visit('./src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', function() {
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        
        cy.writeFileAndSubmit() //Chamando a função writeFileAndSubmit criada em command.js
        cy.contains('Mensagem enviada com sucesso.')
        .should('be.visible')
    })

    it('Preenche errado e envia o formulário', function() {
        cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('João')
        .should('have.value', 'João')
        
        cy.get('input[id="lastName"]')
        .should('be.visible')
        .type('Teste')
        .should('have.value', 'Teste')
        //Email num formato incorreto
        cy.get('input[id="email"]')
        .should('be.visible')
        .type('teste')

        cy.get('textarea[id="open-text-area"]')
        .should('be.visible')
        .type('Estamos com problema de serviço')
        .should('have.value', 'Estamos com problema de serviço')

        cy.get('button[class="button"]')
        .click()
        //Verificando se a mensagem de erro aparece
        cy.contains('Valide os campos obrigatórios!')
        .should('be.visible')
    })

    it('Verifica se preencher o telefone é obrigatório quando selecionado checkbox', function(){

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
        .type('teste12@gmail.com')
        cy.get('#phone-checkbox').check()  //Selecionei o checkbox de telefone, transformando ele em obrigatório

        cy.get('textarea[id="open-text-area"]')
        .should('be.visible')
        .type('Estamos com problema de serviço')
        .should('have.value', 'Estamos com problema de serviço')

        cy.get('button[class="button"]')
        .click()

        //Verificando se a mensagem de erro aparece
        cy.contains('Valide os campos obrigatórios!')
        .should('be.visible')
    })

    it('Seleciona as opções de select e verifica se estão ok', function(){
        //Chamando a função chooseSelect criada em command.js
        cy.chooseSelect('#product', 'blog')
        cy.chooseSelect('#product', 'cursos')
        cy.chooseSelect('#product', 'mentoria')
        cy.chooseSelect('#product', 'youtube')
        
    })

    it('Seleciona os radius bottons', function(){

        cy.get('input[type="radio"]')
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('Seleciona os checkboxes', function(){

        cy.get('input[type="checkbox"]')
        .each(function($checkbox){ //Cria um laço de repetição
            cy.wrap($checkbox).check() //Empacota todos as checkbox em uma única ação
            cy.wrap($checkbox).should('be.checked') //Confirma se todos foram marcados
        })

        cy.get('input[type="checkbox"]')
        .last()
        .should('be.checked')
        .uncheck()
    })

    it('Anexa um arquivo ao formulário', function(){

        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Anexa um arquivo ao formulário com drag and drop', function(){

        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

        it('Verifica se link de Política de Privacidade abre', function(){
            cy.get('a')
            .should(function($a){
                expect($a.attr('href'), 'href').to.equal('privacy.html')
                expect($a.attr('target'), 'target').to.equal('_blank')
            })

            cy.get('a')
            .invoke('removeAttr', 'target')
            .click()

            cy.contains('Não salvamos dados').should('be.visible')
        })
        
    })

  
