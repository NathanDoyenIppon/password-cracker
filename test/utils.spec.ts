import { describe, expect, it } from 'vitest'
import { generateNumberBetweenOneAndNine } from '../app/utils/utils'

describe('utils', () => {
    describe('generateNumberBetweenOneAndNine', () => {
        it('return a number between one and nine', async () => {
            const num = generateNumberBetweenOneAndNine()

            expect(num).toBeGreaterThan(0)
            expect(num).toBeLessThan(10)
        })
    })
})
