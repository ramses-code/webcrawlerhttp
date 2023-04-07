function printReport(pages) {
    console.log('=========')
    console.log('REPORT')
    console.log('=========')

    const sortedPages = sortPages(pages)
    for (let sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page: ${url}`)
    }

    console.log('=========')
    console.log('END REPORT')
    console.log('=========')
}

function sortPages(pages) {
    // Gets an object of arrays with urls in index 0 and the count in index 2
    const pagesArr = Object.entries(pages)

    pagesArr.sort((a,b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })
    return pagesArr
}

module.exports = {
    sortPages,
    printReport
}