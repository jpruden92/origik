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

const func = async (coincidence) => {
    const config = {
        openseaApi: 'https://testnets-api.opensea.io/api/v1',
        openseaUrl: 'https://testnets.opensea.io/es/assets/goerli',
        collectionName: 'Pru Test Collection'
    };

    // Inject toolbar
    const div = document.createElement('div');
    const body = document.querySelector('body');
    let toolbar_url = chrome.runtime.getURL('/toolbar.html');

    const response = await fetch(toolbar_url);
    const html = await response.text();

    div.innerHTML = html;
    body.insertBefore(div, body.firstChild);

    // Inject assets
    for (const owner of coincidence.owners) {
        const div = document.createElement('div');
        const body = document.querySelector('#origik_avatars');

        const response = await fetch(`${config.openseaApi}/assets?owner=${owner}`);
        const data = await response.json();

        const assets = data.assets.filter(asset => asset.collection.name === config.collectionName).map((asset) => {
            return {
                name: asset.name,
                image: asset.image_url,
                tokenId: asset.token_id,
                contractAddress: asset.asset_contract.address,
                properties: asset.traits.map((trait) => {
                    return {
                        type: trait.trait_type,
                        value: trait.value
                    }
                })
            };
        });

        console.info('Assets', assets);

        div.innerHTML = `<a href="${config.openseaUrl}/${assets[0].contractAddress}/${assets[0].tokenId}" class="avatars__item" target="_blank"><img class="avatar" src="${assets[0].image}" alt=""></a>`;
        body.append(div);
    };
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.info(changeInfo.status, tab.url);

    // Check if url is in urls and get array element
    const coincidence = urls.find(item => normalizeUrl(tab.url).includes(normalizeUrl(item.url)));

    if (changeInfo.status === 'complete' && coincidence) {
        console.info('Injecting content script');
        chrome.scripting.executeScript({
            target: {tabId},
            func,
            args: [coincidence]
        });
    }
});