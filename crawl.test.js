const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip https protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev/path'
    expect(actualOutput).toEqual(expectedOutput)
})

test('normalizeURL strip http protocol', () => {
    const input = 'http://blog.boot.dev/path/'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev/path'
    expect(actualOutput).toEqual(expectedOutput)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev/path'
    expect(actualOutput).toEqual(expectedOutput)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev/path'
    expect(actualOutput).toEqual(expectedOutput)
})
