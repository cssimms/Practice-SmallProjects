import { lengthOfLongestSubstring } from "./longest-substring.js"

describe("longest substring", () => {

    test("works on simple case", () => {
        const result = lengthOfLongestSubstring('abcabcbb')
        expect(result).toBe(3)
    })

    test("works with repeated characters", () => {
        const result = lengthOfLongestSubstring('bbbbbbbb')
        expect(result).toBe(1)
    })

    test("respects order of character (substring not subsequence)", () => {
        const result = lengthOfLongestSubstring('pwwkew')
        expect(result).toBe(3)
    })

    test("works with long repeated sequences", () => {
        const result = lengthOfLongestSubstring('abcbcbcbcbcalmnbcbcbcbc')
        expect(result).toBe(6)
    })

    test("works with longest substring at the end of the string", () => {
        const result = lengthOfLongestSubstring('abcbcbcbcbcalmn')
        expect(result).toBe(6)
    })

    test('works with a two character input', () => {
        const result = lengthOfLongestSubstring("au")
        expect(result).toBe(2)
    })

    test('works with an empty string', () => {
        const result = lengthOfLongestSubstring("")
        expect(result).toBe(0)
    })

    test('works with a blank character', () => {
        const result = lengthOfLongestSubstring(" ")
        expect(result).toBe(1) // TODO - should be 0 ? 
    })

    test('works with a single character', () => {
        const result = lengthOfLongestSubstring("a")
        expect(result).toBe(1)
    })
})





