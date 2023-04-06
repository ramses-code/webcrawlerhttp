const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    // Verify that the current url is in the same domain as the base url
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    // Get normalize version of the current url
    const normalizeCurrentURL = normalizeURL(currentURL)
    // Check if the current page has been crawled, and increment count if so
    if (pages[normalizeCurrentURL] > 0) {
        pages[normalizeCurrentURL]++
        return pages
    }
    // Else start the count for current normalize url
    pages[normalizeCurrentURL] = 1
    console.log(`actively crawling ${currentURL}`)

    // Fetch the page to get html body 
    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399) {
            console.log(`error in fech with status code: ${resp.status}, on page ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`non html response, content type: ${contentType}, on page ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        // Recursivly crawl pages within the main page
        for (let nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
    // When done crawling all pages, return the pages object
    return pages
}

// Takes html body and retrieves urls from the href attribute from the a tags
function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    
    for (let elem of linkElements) {
        // If the url starts with '/' is a relative url
        if (elem.href.slice(0, 1) === '/') {
            // if the url is not valid, the url constructor will throw an error
            try {
                // Construct a url object with the url passed from the a's tag href attribute 
                const urlObj = new URL(`${baseURL}${elem.href}`)
                // Push the url from the url object which is the value of the key 'href'
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        // Else is absolute url
        } else {
            try {
                const urlObj = new URL(elem.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
    }

    return urls
}

// Take differents url's strings that points to the same webpage 
// and normalize the output:
// 'https://clinicavitalcare.com' -> clinicavitalcare.com
// 'http://clinicavitalcare.com' -> clinicavitalcare.com
// 'www.clinicavitalcare.com/' -> clinicavitalcare.com
function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const fullPath = `${urlObj.hostname}${urlObj.pathname}`

    // If the hostname ends with '/' removes it
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        return fullPath.slice(0, -1)
    }
    return fullPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}