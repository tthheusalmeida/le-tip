describe('E2E: Desktop', () => {
  describe('Validação da troca de Tema', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')

      cy.visit('/')
    })

    it(`Deve mudar o tema de Light para Dark`, () => {
      cy.get('header').should('be.visible')

      cy.get('.header__theme').click()

      cy.get('.header__theme--moon').should('exist')
    })

    it(`Deve mudar o tema de Light para Dark, Dark para Light`, () => {
      cy.get('header').should('be.visible')

      cy.get('.header__theme').click()
      cy.get('.header__theme--moon').should('exist')

      cy.get('.header__theme').click()
      cy.get('.header__theme--sun').should('exist')
    })
  })

  describe('Interação Completa e Verificação de Resultados (EUR)', () => {
    const MOCK_EUR_RATE_RESPONSE = {
      EURBRL: {
        code: 'EUR',
        codein: 'BRL',
        name: 'Euro/Real Brasileiro',
        bid: '6.0000', // Mock: 1 EUR = 6.00 BRL
        ask: '6.0000',
        create_date: '2025-01-01 10:00:00',
      },
    }

    const testCases = [
      {
        conta: '73,23',
        gorjeta: 13,
        pessoas: 10,
        gorjetacalculada: '9,52',
        total: '82,75',
        porPessoa: '8,28',
      },
      {
        conta: '60,00',
        gorjeta: 10,
        pessoas: 3,
        gorjetacalculada: '6,00',
        total: '66,00',
        porPessoa: '22,00',
      },
      {
        conta: '13,00',
        gorjeta: 15,
        pessoas: 2,
        gorjetacalculada: '1,95',
        total: '14,95',
        porPessoa: '7,48',
      },
      {
        conta: '2,58',
        gorjeta: 17,
        pessoas: 3,
        gorjetacalculada: '0,44',
        total: '3,02',
        porPessoa: '1,01',
      },
    ]

    beforeEach(() => {
      cy.viewport('macbook-16')

      cy.visit('/')

      cy.intercept('GET', 'https://economia.awesomeapi.com.br/json/last/EUR-BRL', (req) => {
        req.reply({
          statusCode: 200,
          body: MOCK_EUR_RATE_RESPONSE,
        })
      }).as('getEurRate')
    })

    testCases.forEach(({ conta, gorjeta, pessoas, gorjetacalculada, total, porPessoa }) => {
      it(`deve calcular corretamente para conta=${conta}, gorjeta=${gorjeta}% e pessoas=${pessoas}`, () => {
        cy.get('header').should('be.visible')

        const amountInputFieldSelector = '[data-testid="input-amount"] input.input-money__field'

        cy.get(amountInputFieldSelector).clear()
        cy.get(amountInputFieldSelector).type(conta)

        cy.get('[data-testid="tip-input-range"] input[type="range"]')
          .invoke('val', gorjeta)
          .trigger('input')

        cy.get('[data-testid="people-input-range"] input[type="range"]')
          .invoke('val', pessoas)
          .trigger('input')

        cy.wait('@getEurRate')

        cy.get('[data-testeid="floating-button"]').should('not.exist')

        const resultAmount = '.computability-result .computability-result__result'

        cy.get(resultAmount).eq(0).should('contain.text', conta.replace('.', ','))
        cy.get(resultAmount).eq(1).should('contain.text', gorjetacalculada)
        cy.get(resultAmount).eq(2).should('contain.text', total)
        cy.get(resultAmount).eq(3).should('contain.text', porPessoa)
        cy.get('[data-testid="result-in-brl"] .computability-result__icon--loading').should(
          'not.exist',
        )
      })
    })
  })

  describe('Interação Completa e Verificação de Resultados (USD)', () => {
    const MOCK_USD_RATE_RESPONSE = {
      USDBRL: {
        code: 'USD',
        codein: 'BRL',
        name: 'Dólar/Real Brasileiro',
        bid: '5.2000', // Mock: 1 USD = 5.20 BRL
        ask: '5.2000',
        create_date: '2025-01-01 10:00:00',
      },
    }

    const testCases = [
      {
        conta: '73.23',
        gorjeta: 13,
        pessoas: 10,
        gorjetacalculada: '9.52',
        total: '82.75',
        porPessoa: '8.28',
      },
      {
        conta: '60.00',
        gorjeta: 10,
        pessoas: 3,
        gorjetacalculada: '6.00',
        total: '66.00',
        porPessoa: '22.00',
      },
      {
        conta: '13.00',
        gorjeta: 15,
        pessoas: 2,
        gorjetacalculada: '1.95',
        total: '14.95',
        porPessoa: '7.48',
      },
      {
        conta: '2.58',
        gorjeta: 17,
        pessoas: 3,
        gorjetacalculada: '0.44',
        total: '3.02',
        porPessoa: '1.01',
      },
    ]

    beforeEach(() => {
      cy.viewport('macbook-16')

      cy.visit('/')

      cy.intercept('GET', 'https://economia.awesomeapi.com.br/json/last/USD-BRL', (req) => {
        req.reply({
          statusCode: 200,
          body: MOCK_USD_RATE_RESPONSE,
        })
      }).as('getUsdRate')
    })

    testCases.forEach(({ conta, gorjeta, pessoas, gorjetacalculada, total, porPessoa }) => {
      it(`deve calcular corretamente em USD para conta=${conta}, gorjeta=${gorjeta}% e pessoas=${pessoas}`, () => {
        cy.get('header').should('be.visible')

        const amountInputFieldSelector = '[data-testid="input-amount"] input.input-money__field'
        const resultAmount = '.computability-result .computability-result__result'

        cy.get('[data-testid="switch-currency"]').click()

        cy.get(amountInputFieldSelector).clear()
        cy.get(amountInputFieldSelector).type(conta)

        cy.get('[data-testid="tip-input-range"] input[type="range"]')
          .invoke('val', gorjeta)
          .trigger('input')

        cy.get('[data-testid="people-input-range"] input[type="range"]')
          .invoke('val', pessoas)
          .trigger('input')

        cy.wait('@getUsdRate')

        cy.get('[data-testeid="floating-button"]').should('not.exist')

        cy.get(resultAmount).eq(0).should('contain.text', conta)
        cy.get(resultAmount).eq(1).should('contain.text', gorjetacalculada)
        cy.get(resultAmount).eq(2).should('contain.text', total)
        cy.get(resultAmount).eq(3).should('contain.text', porPessoa)

        cy.get('[data-testid="result-in-brl"] .computability-result__icon--loading').should(
          'not.exist',
        )

        cy.get('body').should('contain.text', '$')
      })
    })
  })
})

describe('E2E: Mobile', () => {
  describe('Validação da troca de Tema', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')

      cy.visit('/')
    })

    it(`Deve mudar o tema de Light para Dark`, () => {
      cy.get('header').should('be.visible')

      cy.get('.header__theme').click()

      cy.get('.header__theme--moon').should('exist')
    })

    it(`Deve mudar o tema de Light para Dark, Dark para Light`, () => {
      cy.get('header').should('be.visible')

      cy.get('.header__theme').click()
      cy.get('.header__theme--moon').should('exist')

      cy.get('.header__theme').click()
      cy.get('.header__theme--sun').should('exist')
    })
  })

  describe('Interação Completa e Verificação de Resultados (EUR)', () => {
    const MOCK_EUR_RATE_RESPONSE = {
      EURBRL: {
        code: 'EUR',
        codein: 'BRL',
        name: 'Euro/Real Brasileiro',
        bid: '6.0000', // Mock: 1 EUR = 6.00 BRL
        ask: '6.0000',
        create_date: '2025-01-01 10:00:00',
      },
    }

    const testCases = [
      {
        conta: '73,23',
        gorjeta: 13,
        pessoas: 10,
        gorjetacalculada: '9,52',
        total: '82,75',
        porPessoa: '8,28',
      },
      {
        conta: '60,00',
        gorjeta: 10,
        pessoas: 3,
        gorjetacalculada: '6,00',
        total: '66,00',
        porPessoa: '22,00',
      },
      {
        conta: '13,00',
        gorjeta: 15,
        pessoas: 2,
        gorjetacalculada: '1,95',
        total: '14,95',
        porPessoa: '7,48',
      },
      {
        conta: '2,58',
        gorjeta: 17,
        pessoas: 3,
        gorjetacalculada: '0,44',
        total: '3,02',
        porPessoa: '1,01',
      },
    ]

    beforeEach(() => {
      cy.viewport('iphone-x')

      cy.visit('/')

      cy.intercept('GET', 'https://economia.awesomeapi.com.br/json/last/EUR-BRL', (req) => {
        req.reply({
          statusCode: 200,
          body: MOCK_EUR_RATE_RESPONSE,
        })
      }).as('getEurRate')
    })

    testCases.forEach(({ conta, gorjeta, pessoas, gorjetacalculada, total, porPessoa }) => {
      it(`deve calcular corretamente para conta=${conta}, gorjeta=${gorjeta}% e pessoas=${pessoas}`, () => {
        cy.get('header').should('be.visible')

        const amountInputFieldSelector = '[data-testid="input-amount"] input.input-money__field'

        cy.get(amountInputFieldSelector).clear()
        cy.get(amountInputFieldSelector).type(conta)

        cy.get('[data-testid="tip-input-range"] input[type="range"]')
          .invoke('val', gorjeta)
          .trigger('input')

        cy.get('[data-testid="people-input-range"] input[type="range"]')
          .invoke('val', pessoas)
          .trigger('input')

        cy.wait('@getEurRate')

        cy.get('[data-testeid="floating-button"]').trigger('click')

        const resultAmount = '.computability-result .computability-result__result'

        cy.get(resultAmount).eq(0).should('contain.text', conta.replace('.', ','))
        cy.get(resultAmount).eq(1).should('contain.text', gorjetacalculada)
        cy.get(resultAmount).eq(2).should('contain.text', total)
        cy.get(resultAmount).eq(3).should('contain.text', porPessoa)
        cy.get('[data-testid="result-in-brl"] .computability-result__icon--loading').should(
          'not.exist',
        )
      })
    })
  })

  describe('Interação Completa e Verificação de Resultados (USD)', () => {
    const MOCK_USD_RATE_RESPONSE = {
      USDBRL: {
        code: 'USD',
        codein: 'BRL',
        name: 'Dólar/Real Brasileiro',
        bid: '5.2000', // Mock: 1 USD = 5.20 BRL
        ask: '5.2000',
        create_date: '2025-01-01 10:00:00',
      },
    }

    const testCases = [
      {
        conta: '73.23',
        gorjeta: 13,
        pessoas: 10,
        gorjetacalculada: '9.52',
        total: '82.75',
        porPessoa: '8.28',
      },
      {
        conta: '60.00',
        gorjeta: 10,
        pessoas: 3,
        gorjetacalculada: '6.00',
        total: '66.00',
        porPessoa: '22.00',
      },
      {
        conta: '13.00',
        gorjeta: 15,
        pessoas: 2,
        gorjetacalculada: '1.95',
        total: '14.95',
        porPessoa: '7.48',
      },
      {
        conta: '2.58',
        gorjeta: 17,
        pessoas: 3,
        gorjetacalculada: '0.44',
        total: '3.02',
        porPessoa: '1.01',
      },
    ]

    beforeEach(() => {
      cy.viewport('iphone-x')

      cy.visit('/')

      cy.intercept('GET', 'https://economia.awesomeapi.com.br/json/last/USD-BRL', (req) => {
        req.reply({
          statusCode: 200,
          body: MOCK_USD_RATE_RESPONSE,
        })
      }).as('getUsdRate')
    })

    testCases.forEach(({ conta, gorjeta, pessoas, gorjetacalculada, total, porPessoa }) => {
      it(`deve calcular corretamente em USD para conta=${conta}, gorjeta=${gorjeta}% e pessoas=${pessoas}`, () => {
        cy.get('header').should('be.visible')

        const amountInputFieldSelector = '[data-testid="input-amount"] input.input-money__field'
        const resultAmount = '.computability-result .computability-result__result'

        cy.get('[data-testid="switch-currency"]').click()

        cy.get(amountInputFieldSelector).clear()
        cy.get(amountInputFieldSelector).type(conta)

        cy.get('[data-testid="tip-input-range"] input[type="range"]')
          .invoke('val', gorjeta)
          .trigger('input')

        cy.get('[data-testid="people-input-range"] input[type="range"]')
          .invoke('val', pessoas)
          .trigger('input')

        cy.wait('@getUsdRate')

        cy.get('[data-testeid="floating-button"]').trigger('click')

        cy.get(resultAmount).eq(0).should('contain.text', conta)
        cy.get(resultAmount).eq(1).should('contain.text', gorjetacalculada)
        cy.get(resultAmount).eq(2).should('contain.text', total)
        cy.get(resultAmount).eq(3).should('contain.text', porPessoa)

        cy.get('[data-testid="result-in-brl"] .computability-result__icon--loading').should(
          'not.exist',
        )

        cy.get('body').should('contain.text', '$')
      })
    })
  })
})
