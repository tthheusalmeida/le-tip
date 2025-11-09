import { describe, it, expect, vi } from 'vitest'
import { fetchExchangeRate } from '@/services/exchangeService'

global.fetch = vi.fn()

describe('fetchExchangeRate', () => {
  it('when a valid request is made, should build the correct request and return the parsed bid', async () => {
    const mockResponse = {
      USDBRL: { bid: '5.35' },
    }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const result = await fetchExchangeRate('USD', 'BRL')

    expect(fetch).toHaveBeenCalledWith(
      'https://economia.awesomeapi.com.br/json/last/USD-BRL',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer /),
        }),
      }),
    )
    expect(result).toBe(5.35)
  })

  it('when the response is not ok, should throw an error', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Bad Request',
    } as Response)

    await expect(fetchExchangeRate('USD', 'BRL')).rejects.toThrow('Erro ao buscar cotação')
  })
})
