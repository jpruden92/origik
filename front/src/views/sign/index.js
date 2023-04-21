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
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import moment from 'moment';

import config from 'config';

import blockchain from 'utils/blockchain';
import apiManager from 'services/api';

import { useTranslation } from "react-i18next";

import Verified from '@mui/icons-material/Verified';

const Sign = () => {
    const theme = useTheme();

    const [ textFieldSign, setTextFieldSign ] = useState('');
    const [ account, setAccount ] = useState({});
    const [ verificationKey, setVerificationKey ] = useState('');

    const { t } = useTranslation();

    useEffect(async () => {
        let accounts = await blockchain.getAccounts();
        accounts = accounts.filter(account => account.assets.length > 0);
        setAccount(accounts[0]);
    }, []);

    const _onClickSign = async () => {
        const sign = await blockchain.signText(textFieldSign, account.addr);
        console.info(sign);
        const varificationInfo = await apiManager.setVerification(textFieldSign, sign);
        setVerificationKey(varificationInfo.key);
    }

    return (
        <MainCard title={ 'Firmar un texto' } subtitle={ 'Firma cualquier texto de manera fácil y segura con tu identidad digital. Al presionar el botón de firmar, confirmarás la operación a través de Metamask y generarás una firma única única. Luego, te proporcionaremos una URL personalizada para compartir tu firma con quien desees.' }>
            <>
                <Grid container direction="column" spacing={2}>
                    { account.addr &&
                        <Grid item container direction="column">
                            <TextField
                                label="Identidad que va a firmar"
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
                            label="Texto a firmar"
                            multiline
                            rows={4}
                            defaultValue={textFieldSign}
                            variant="filled"
                            onChange={(e) => { setTextFieldSign(e.target.value) }}
                        />
                    </Grid>
                    <Grid item container direction="column">
                        <Button
                            variant="outlined"
                            onClick={() => { _onClickSign() }}
                        >
                            Firmar
                        </Button>
                    </Grid>
                    <Grid item container direction="column">
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
                </Grid>
            </>
        </MainCard>
    );
};

export default Sign;
