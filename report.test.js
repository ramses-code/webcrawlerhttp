const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actualOutput = sortPages(input)
    const expectedOutput = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actualOutput).toEqual(expectedOutput)
})

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev/path5': 5,
        'https://wagslane.dev/path3': 3,
        'https://wagslane.dev/path4': 4,
        'https://wagslane.dev/path2': 2
    }
    const actualOutput = sortPages(input)
    const expectedOutput = [
        ['https://wagslane.dev/path5', 5],
        ['https://wagslane.dev/path4', 4],
        ['https://wagslane.dev/path3', 3],
        ['https://wagslane.dev/path2', 2],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actualOutput).toEqual(expectedOutput)
})