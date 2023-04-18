// ¡TODO!

// material-ui
import {
    Grid,
    TextField,
    Button,
    InputAdornment
} from '@mui/material';

import { useEffect } from 'react';
import useState from 'react-usestateref';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import config from 'config';

import blockchain from 'utils/blockchain';
import api from 'services/api';

import { useTranslation } from "react-i18next";

import Verified from '@mui/icons-material/Verified';

const Sign = () => {
    const { t } = useTranslation();

    const [ textFieldSign, setTextFieldSign ] = useState('');
    const [ textFieldUrl, setTextFieldUrl ] = useState('');
    const [ account, setAccount ] = useState({});
    const [ verificationKey, setVerificationKey ] = useState('');

    useEffect(async () => {
        let accounts = await blockchain.getAccounts();
        accounts = accounts.filter(account => account.assets.length > 0);
        setAccount(accounts[0]);
    }, []);

    const _onClickSign = async () => {
        const sign = await blockchain.signText(textFieldSign, account.addr);
        console.info(sign);
        const varificationInfo = await api.setVerification(textFieldSign, sign, textFieldUrl);
        setVerificationKey(varificationInfo.key);
    }

    return (
        <MainCard title={ t('sign.title') } subtitle={ t('sign.subtitle') }>
            <>
                <Grid container direction="column" spacing={2}>
                    { account.addr &&
                        <Grid item container direction="column">
                            <TextField
                                label={ t('sign.label.identity') }
                                defaultValue={`${account.assets[0].name} - ${account.addr}`}
                                value={`${account.assets[0].name} - ${account.addr}`}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Verified />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    }
                    <Grid item container direction="column">
                        <TextField
                            id="filled-multiline-static"
                            label={ t('sign.label.textToSign') }
                            multiline
                            rows={10}
                            defaultValue={textFieldSign}
                            onChange={(e) => { setTextFieldSign(e.target.value) }}
                        />
                    </Grid>
                    <Grid item container direction="column">
                        <TextField
                            id="filled-multiline-static"
                            label={ t('sign.label.originURL') }
                            defaultValue={textFieldUrl}
                            onChange={(e) => { setTextFieldUrl(e.target.value) }}
                        />
                    </Grid>
                    <Grid item container direction="column">
                        <Button
                            variant="contained"
                            onClick={() => { _onClickSign() }}
                            size='large'
                            disableElevation
                        >
                            { t('sign.button.sign') }
                        </Button>
                    </Grid>
                    <Grid item container direction="column">
                        { verificationKey &&
                            <TextField
                                label={ t('sign.label.verificationURL') }
                                defaultValue={`${window.location.origin}/check?key=${verificationKey}`}
                                value={`${window.location.origin}/check?key=${verificationKey}`}
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                        }
                    </Grid>
                </Grid>
            </>
        </MainCard>
    );
};

export default Sign;
