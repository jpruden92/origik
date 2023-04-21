// ¡TODO!

// material-ui
import {
    Grid,
    TextField,
    Button,
    Select,
    MenuItem
} from '@mui/material';

import { useEffect } from 'react';
import useState from 'react-usestateref';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import moment from 'moment';

import config from 'config';

import blockchain from 'utils/blockchain';
import apiManager from 'services/api';

import { useTranslation } from "react-i18next";

const Sign = () => {
    const theme = useTheme();

    const [ textFieldSign, setTextFieldSign ] = useState('');
    const [ selectedAccount, setSelectedAccount ] = useState('');
    const [ accounts, setAccounts ] = useState([]);
    const [ verificationKey, setVerificationKey ] = useState('');

    const { t } = useTranslation();

    useEffect(async () => {
        let accounts = await blockchain.getAccounts();
        accounts = accounts.filter(account => account.assets.length > 0);
        setAccounts(accounts);
    }, []);

    const _onClickSign = async () => {
        const sign = await blockchain.signText(textFieldSign, selectedAccount);
        console.info(sign);
        const varificationInfo = await apiManager.setVerification(textFieldSign, sign);
        setVerificationKey(varificationInfo.key);
    }

    return (
        <MainCard title={'Firmar'} subtitle={ t('tagconfig.description') }>
            <>
                <Grid container direction="column" spacing={1}>
                    <Select
                        label="Wallets"
                        value={selectedAccount}
                        onChange={(e) => { setSelectedAccount(e.target.value) }}
                    >
                        {
                            accounts.map((account, index) => {
                                return <MenuItem key={index} value={account.addr}>{account.assets[0].name} - {account.addr}</MenuItem>
                            })
                        }
                    </Select>
                    <TextField
                        id="filled-multiline-static"
                        label="Texto a firmar"
                        multiline
                        rows={4}
                        defaultValue={textFieldSign}
                        variant="filled"
                        onChange={(e) => { setTextFieldSign(e.target.value) }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => { _onClickSign() }}
                    >
                        Firmar
                    </Button>
                    { verificationKey &&
                        <TextField
                            label="URL de verificación"
                            defaultValue={`${config.frontUrl}/check?key=${verificationKey}`}
                            value={`${config.frontUrl}/check?key=${verificationKey}`}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                    }
                </Grid>
            </>
        </MainCard>
    );
};

export default Sign;
