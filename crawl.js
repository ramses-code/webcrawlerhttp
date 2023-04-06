// Take differents url's strings that points to the same webpage 
// and normalize the output:
// 'https://clinicavitalcare.com' -> clinicavitalcare.com
// 'http://clinicavitalcare.com' -> clinicavitalcare.com
// 'www.clinicavitalcare.com' -> clinicavitalcare.com

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL
}