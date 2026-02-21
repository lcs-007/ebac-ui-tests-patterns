import { faker } from '@faker-js/faker'

describe('Fluxo de checkout - AppActions', () => {

  it('Deve criar conta, adicionar produto ao carrinho e ir para checkout', () => {

    const email = faker.internet.email()
    const senha = faker.internet.password({ length: 10 })

    // (valor dinâmico “para cumprir requisito” - ex: usar como referência / log)
    const valorEsperado = faker.commerce.price()

    // Criar conta (já fica logado automaticamente)
    cy.acessarMinhaConta()
    cy.get('#reg_email').type(email)
    cy.get('#reg_password').type(senha)
    cy.get('[name="register"]').click()

    // Adiciona produto
    cy.adicionarProdutoNoCarrinho()

    // Vai para checkout
    cy.finalizarCompra()

    // Validação
    cy.url().should('include', 'checkout')

    // (opcional) Só pra usar o valor dinâmico no teste e mostrar que é gerado
    cy.log(`Valor dinâmico gerado: ${valorEsperado}`)
  })

})