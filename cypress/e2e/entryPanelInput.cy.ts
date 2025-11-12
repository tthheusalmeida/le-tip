describe('E2E: Desktop', () => {
  describe('Validation of the theme change', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')

      cy.visit('/')
    })

    it(`Should change the theme from Light to Dark.`, () => {
      cy.get('header').should('be.visible')

      cy.get('.header__theme').click()

      cy.get('.header__theme--moon').should('exist')
    })

    it(`Should change the theme from Light to Dark, from Dark to Light`, () => {
      cy.get('header').should('be.visible')

      cy.get('.header__theme').click()
      cy.get('.header__theme--moon').should('exist')

      cy.get('.header__theme').click()
      cy.get('.header__theme--sun').should('exist')
    })
  })

  describe('Full Interaction and Results Verification (EUR)', () => {
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
        amount: '73,23',
        tip: 13,
        people: 10,
        computedTip: '9,52',
        total: '82,75',
        perPerson: '8,28',
      },
      {
        amount: '60,00',
        tip: 10,
        people: 3,
        computedTip: '6,00',
        total: '66,00',
        perPerson: '22,00',
      },
      {
        amount: '13,00',
        tip: 15,
        people: 2,
        computedTip: '1,95',
        total: '14,95',
        perPerson: '7,48',
      },
      {
        amount: '2,58',
        tip: 17,
        people: 3,
        computedTip: '0,44',
        total: '3,02',
        perPerson: '1,01',
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

    testCases.forEach(({ amount, tip, people, computedTip, total, perPerson }) => {
      it(`Should calculate correctly to amount=${amount}, tip=${tip}% and people=${people}`, () => {
        cy.get('header').should('be.visible')

        const amountInputFieldSelector = '[data-testid="input-amount"] input.input-money__field'

        cy.get(amountInputFieldSelector).clear()
        cy.get(amountInputFieldSelector).type(amount)

        cy.get('[data-testid="tip-input-range"] input[type="range"]')
          .invoke('val', tip)
          .trigger('input')

        cy.get('[data-testid="people-input-range"] input[type="range"]')
          .invoke('val', people)
          .trigger('input')

        cy.wait('@getEurRate')

        cy.get('[data-testeid="floating-button"]').should('not.exist')

        const resultAmount = '.computability-result .computability-result__result'

        cy.get(resultAmount).eq(0).should('contain.text', amount.replace('.', ','))
        cy.get(resultAmount).eq(1).should('contain.text', computedTip)
        cy.get(resultAmount).eq(2).should('contain.text', total)
        cy.get(resultAmount).eq(3).should('contain.text', perPerson)
        cy.get('[data-testid="result-in-brl"] .computability-result__icon--loading').should(
          'not.exist',
        )
      })
    })
  })

  describe('Full Interaction and Results Verification (USD)', () => {
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
        amount: '73.23',
        tip: 13,
        people: 10,
        computedTip: '9.52',
        total: '82.75',
        perPerson: '8.28',
      },
      {
        amount: '60.00',
        tip: 10,
        people: 3,
        computedTip: '6.00',
        total: '66.00',
        perPerson: '22.00',
      },
      {
        amount: '13.00',
        tip: 15,
        people: 2,
        computedTip: '1.95',
        total: '14.95',
        perPerson: '7.48',
      },
      {
        amount: '2.58',
        tip: 17,
        people: 3,
        computedTip: '0.44',
        total: '3.02',
        perPerson: '1.01',
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

    testCases.forEach(({ amount, tip, people, computedTip, total, perPerson }) => {
      it(`Should calculate correctly to USD for amount=${amount}, tip=${tip}% and people=${people}`, () => {
        cy.get('header').should('be.visible')

        const amountInputFieldSelector = '[data-testid="input-amount"] input.input-money__field'
        const resultAmount = '.computability-result .computability-result__result'

        cy.get('[data-testid="switch-currency"]').click()

        cy.get(amountInputFieldSelector).clear()
        cy.get(amountInputFieldSelector).type(amount)

        cy.get('[data-testid="tip-input-range"] input[type="range"]')
          .invoke('val', tip)
          .trigger('input')

        cy.get('[data-testid="people-input-range"] input[type="range"]')
          .invoke('val', people)
          .trigger('input')

        cy.wait('@getUsdRate')

        cy.get('[data-testeid="floating-button"]').should('not.exist')

        cy.get(resultAmount).eq(0).should('contain.text', amount)
        cy.get(resultAmount).eq(1).should('contain.text', computedTip)
        cy.get(resultAmount).eq(2).should('contain.text', total)
        cy.get(resultAmount).eq(3).should('contain.text', perPerson)

        cy.get('[data-testid="result-in-brl"] .computability-result__icon--loading').should(
          'not.exist',
        )

        cy.get('body').should('contain.text', '$')
      })
    })
  })
})

describe('E2E: Mobile', () => {
  describe('Validation of the theme change', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')

      cy.visit('/')
    })

    it(`Should change the theme from Light to Dark.`, () => {
      cy.get('header').should('be.visible')

      cy.get('.header__theme').click()

      cy.get('.header__theme--moon').should('exist')
    })

    it(`Should change the theme from Light to Dark, from Dark to Light`, () => {
      cy.get('header').should('be.visible')

      cy.get('.header__theme').click()
      cy.get('.header__theme--moon').should('exist')

      cy.get('.header__theme').click()
      cy.get('.header__theme--sun').should('exist')
    })
  })

  describe('Switching between panels, [Entry Panel -> Result Panel -> Entry Panel]', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')

      cy.visit('/')
    })

    it(`Should change the theme from Light to Dark.`, () => {
      cy.get('[data-testid="input-amount"] input.input-money__field').should('be.visible')

      cy.get('[data-testeid="floating-button"]').trigger('click')
      cy.get('.computability-result .computability-result__result').eq(0).should('be.visible')

      cy.get('[data-testeid="floating-button"]').trigger('click')
      cy.get('[data-testid="input-amount"] input.input-money__field').should('be.visible')
    })
  })

  describe('Full Interaction and Results Verification (EUR)', () => {
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
        amount: '73,23',
        tip: 13,
        people: 10,
        computedTip: '9,52',
        total: '82,75',
        perPerson: '8,28',
      },
      {
        amount: '60,00',
        tip: 10,
        people: 3,
        computedTip: '6,00',
        total: '66,00',
        perPerson: '22,00',
      },
      {
        amount: '13,00',
        tip: 15,
        people: 2,
        computedTip: '1,95',
        total: '14,95',
        perPerson: '7,48',
      },
      {
        amount: '2,58',
        tip: 17,
        people: 3,
        computedTip: '0,44',
        total: '3,02',
        perPerson: '1,01',
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

    testCases.forEach(({ amount, tip, people, computedTip, total, perPerson }) => {
      it(`Should calculate correctly for amount=${amount}, tip=${tip}% e people=${people}`, () => {
        cy.get('header').should('be.visible')

        const amountInputFieldSelector = '[data-testid="input-amount"] input.input-money__field'

        cy.get(amountInputFieldSelector).clear()
        cy.get(amountInputFieldSelector).type(amount)

        cy.get('[data-testid="tip-input-range"] input[type="range"]')
          .invoke('val', tip)
          .trigger('input')

        cy.get('[data-testid="people-input-range"] input[type="range"]')
          .invoke('val', people)
          .trigger('input')

        cy.wait('@getEurRate')

        cy.get('[data-testeid="floating-button"]').trigger('click')

        const resultAmount = '.computability-result .computability-result__result'

        cy.get(resultAmount).eq(0).should('contain.text', amount.replace('.', ','))
        cy.get(resultAmount).eq(1).should('contain.text', computedTip)
        cy.get(resultAmount).eq(2).should('contain.text', total)
        cy.get(resultAmount).eq(3).should('contain.text', perPerson)
        cy.get('[data-testid="result-in-brl"] .computability-result__icon--loading').should(
          'not.exist',
        )
      })
    })
  })

  describe('Full Interaction and Results Verification (USD)', () => {
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
        amount: '73.23',
        tip: 13,
        people: 10,
        computedTip: '9.52',
        total: '82.75',
        perPerson: '8.28',
      },
      {
        amount: '60.00',
        tip: 10,
        people: 3,
        computedTip: '6.00',
        total: '66.00',
        perPerson: '22.00',
      },
      {
        amount: '13.00',
        tip: 15,
        people: 2,
        computedTip: '1.95',
        total: '14.95',
        perPerson: '7.48',
      },
      {
        amount: '2.58',
        tip: 17,
        people: 3,
        computedTip: '0.44',
        total: '3.02',
        perPerson: '1.01',
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

    testCases.forEach(({ amount, tip, people, computedTip, total, perPerson }) => {
      it(`Should calculate correctly in USD for account=${amount}, tip=${tip}% and people=${people}`, () => {
        cy.get('header').should('be.visible')

        const amountInputFieldSelector = '[data-testid="input-amount"] input.input-money__field'
        const resultAmount = '.computability-result .computability-result__result'

        cy.get('[data-testid="switch-currency"]').click()

        cy.get(amountInputFieldSelector).clear()
        cy.get(amountInputFieldSelector).type(amount)

        cy.get('[data-testid="tip-input-range"] input[type="range"]')
          .invoke('val', tip)
          .trigger('input')

        cy.get('[data-testid="people-input-range"] input[type="range"]')
          .invoke('val', people)
          .trigger('input')

        cy.wait('@getUsdRate')

        cy.get('[data-testeid="floating-button"]').trigger('click')

        cy.get(resultAmount).eq(0).should('contain.text', amount)
        cy.get(resultAmount).eq(1).should('contain.text', computedTip)
        cy.get(resultAmount).eq(2).should('contain.text', total)
        cy.get(resultAmount).eq(3).should('contain.text', perPerson)

        cy.get('[data-testid="result-in-brl"] .computability-result__icon--loading').should(
          'not.exist',
        )

        cy.get('body').should('contain.text', '$')
      })
    })
  })
})
