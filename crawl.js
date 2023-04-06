const { JSDOM } = require('jsdom')

// Takes html body and retrieves the href attribute from the a tags
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
// 'www.clinicavitalcare.com' -> clinicavitalcare.com
function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostName = `${urlObj.hostname}`

    if (hostName.length > 0 && hostName.slice(-1) === '/') {
        return hostName.slice(0, -1)
    }
    return hostName
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}