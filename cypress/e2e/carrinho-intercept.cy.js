import { faker } from '@faker-js/faker'

describe('Testes de Carrinho com Intercept', () => {

  beforeEach(() => {

    cy.setCookie('ebacStoreVersion', 'v2')

    cy.on('uncaught:exception', () => false)

    cy.intercept('GET', '**/public/**', {
      statusCode: 200,
      body: {}
    })

    cy.visit('/')
  })

  it('Deve simular sucesso ao adicionar item no carrinho', () => {

    cy.intercept('POST', '**/public/**', {
      statusCode: 200,
      body: {
        message: 'Item adicionado com sucesso',
        produto: faker.commerce.productName(),
        valor: faker.commerce.price()
      }
    }).as('addItem')

    cy.window().then((win) => {
      win.fetch('/public/add', { method: 'POST' })
    })

    cy.wait('@addItem')
      .its('response.statusCode')
      .should('eq', 200)
  })


  it('Deve simular sucesso ao remover item do carrinho', () => {

    cy.intercept('DELETE', '**/public/**', {
      statusCode: 200,
      body: {
        message: 'Item removido com sucesso',
        produto: faker.commerce.productName()
      }
    }).as('removeItem')

    cy.window().then((win) => {
      win.fetch('/public/remove', { method: 'DELETE' })
    })

    cy.wait('@removeItem')
      .its('response.statusCode')
      .should('eq', 200)
  })


  it('Deve simular sucesso ao atualizar item do carrinho', () => {

    cy.intercept('PUT', '**/public/**', {
      statusCode: 200,
      body: {
        message: 'Item atualizado com sucesso',
        quantidade: faker.number.int({ min: 1, max: 5 })
      }
    }).as('updateItem')

    cy.window().then((win) => {
      win.fetch('/public/update', { method: 'PUT' })
    })

    cy.wait('@updateItem')
      .its('response.statusCode')
      .should('eq', 200)
  })

})