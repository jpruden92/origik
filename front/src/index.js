import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

import { Auth0Provider } from "@auth0/auth0-react";

// style + assets
import 'assets/scss/style.scss';

import config from 'config';

import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// ==============================|| REACT DOM RENDER  ||============================== //

i18next
    .use(Backend)
    .use(LanguageDetector)
    .init({
        interpolation: { escapeValue: false },  // React already does escaping
    });

ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </I18nextProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
