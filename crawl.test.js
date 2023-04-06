const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip https protocol', () => {
    const input = 'https://blog.boot.dev'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev'
    expect(actualOutput).toEqual(expectedOutput)
})

test('normalizeURL strip http protocol', () => {
    const input = 'http://blog.boot.dev'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev'
    expect(actualOutput).toEqual(expectedOutput)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev'
    expect(actualOutput).toEqual(expectedOutput)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev'
    expect(actualOutput).toEqual(expectedOutput)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">Boot.dev Blog</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev/path/'
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expectedOutput = ['https://blog.boot.dev/path/']
    expect(actualOutput).toEqual(expectedOutput)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Boot.dev Blog</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expectedOutput = ['https://blog.boot.dev/path/']
    expect(actualOutput).toEqual(expectedOutput)
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">Boot.dev Blog Path 1</a>
            <a href="/path2/">Boot.dev Blog Path 2</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expectedOutput = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actualOutput).toEqual(expectedOutput)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Invalid URL</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expectedOutput = []
    expect(actualOutput).toEqual(expectedOutput)
})
