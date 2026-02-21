import { faker } from '@faker-js/faker'
import cadastroPage from '../pages/cadastroPage'

describe('Fluxo de criação de conta - Page Objects', () => {

  it('Deve criar uma nova conta com sucesso', () => {

    const email = faker.internet.email()
    const senha = faker.internet.password({ length: 10 })

    // (nome dinâmico “para cumprir requisito” - ex: log)
    const nome = faker.person.fullName()

    cadastroPage.visitarMinhaConta()
    cadastroPage.registrarNovoUsuario(email, senha)

    cy.get('.woocommerce-MyAccount-content')
      .should('contain', 'Olá')

    // (opcional) Só pra usar o nome dinâmico no teste e mostrar que é gerado
    cy.log(`Nome dinâmico gerado: ${nome}`)
  })

})