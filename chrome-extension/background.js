const urls = [
    "https://marca.com",
    "https://elpais.com",
    "https://twitter.com/home"
];

function normalizeUrl(url) {
    // remove "www." if at first part of hostname
    // remove trailing slash
    return url.replace(/\/\/www\./, "//").replace(/\/$/, "");
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.info(changeInfo.status, tab.url);

    if (changeInfo.status === 'complete' && urls.includes(normalizeUrl(tab.url))) {
        console.info('Injecting content script');
        chrome.tabs.executeScript(tabId, { file: 'content.js' });
    }
});