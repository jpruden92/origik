const config = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/dashboard/default',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    openseaUrl: 'https://testnets.opensea.io/es/assets/goerli',
    openseaApi: 'https://testnets-api.opensea.io/api/v1',
    collectionName: 'Pru Test Collection',
    etherscanUrl: 'https://goerli.etherscan.io',
//    apiUrl: 'http://localhost:3000',
//    frontUrl: 'http://localhost:3001',
    apiUrl: '.',
    frontUrl: 'https://id.origik.com',    
};

export default config;
