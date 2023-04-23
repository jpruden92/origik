let urls = [];

// Get http://localhost:3000/api/url_list and set urls
// Data format: [{url: "https://www.google.com", keys: ["key1", "key2"], owners: ["0x123", "0x456"]}, ...]
fetch('http://localhost:3000/api/url_list')
    .then(response => response.json())
    .then(data => {
        console.info('Got urls', data);
        urls = data;
    });

const normalizeUrl = url => {
    // remove "www." if at first part of hostname
    // remove trailing slash
    return url.replace(/\/\/www\./, "//").replace(/\/$/, "");
}

const func = (coincidence) => {
    coincidence.keys.forEach(key => {
        const div = document.createElement('div');
        const body = document.querySelector('body');
        div.textContent = key;
        body.insertBefore(div, body.firstChild);
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.info(changeInfo.status, tab.url);

    // Check if url is in urls and get array element
    const coincidence = urls.find(item => normalizeUrl(tab.url).includes(normalizeUrl(item.url)));

    if (changeInfo.status === 'complete' && coincidence) {
        console.info('Injecting content script');
        chrome.scripting.executeScript({
            target: {tabId, allFrames: true},
            func,
            args: [coincidence]
        });
    }
});