// ¡TODO!

// material-ui
import {
    Grid,
    TextField,
    Button
} from '@mui/material';

import { useEffect } from 'react';
import useState from 'react-usestateref';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import moment from 'moment';

import { useTranslation } from "react-i18next";

const Sign = () => {
    const theme = useTheme();

    const [ textFieldSign, setTextFieldSign ] = useState('');
    const [ textFieldVerify, setTextFieldVerify ] = useState('');

    const { t } = useTranslation();

    const signTextFieldSign = async () => {
        const from = '0x64501c820C88c3d2853C48Aa2Cf721B790727136';
        try {
          const msg = `0x${Buffer.from(textFieldSign, 'utf8').toString('hex')}`;
          const sign = await window.ethereum.request({
            method: 'personal_sign',
            params: [msg, from],
          });
          console.info(sign);
        } catch (err) {
          console.error(err);
        }
    }

    const signTextFieldVerify = async () => {
        try {
            const msg = `0x${Buffer.from(textFieldSign, 'utf8').toString('hex')}`;
            const sign = textFieldVerify;

            const ecRecoverAddr = await window.ethereum.request({
              method: 'personal_ecRecover',
              params: [msg, sign],
            });
            
            console.info(ecRecoverAddr);
          } catch (err) {
            console.error(err);
          }
    }

    return (
        <MainCard title={'Firmar'} subtitle={ t('tagconfig.description') }>
            <>
                <Grid container direction="column" spacing={1}>
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
                        onClick={() => { signTextFieldSign() }}
                    >
                        Firmar
                    </Button>
                </Grid>
                <Grid container direction="column" spacing={1}>
                    <TextField
                        id="filled-multiline-static"
                        label="Firma"
                        rows={1}
                        defaultValue={textFieldVerify}
                        variant="filled"
                        onChange={(e) => { setTextFieldVerify(e.target.value) }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => { signTextFieldVerify() }}
                    >
                        Verificar
                    </Button>
                </Grid>
            </>
        </MainCard>
    );
};

export default Sign;
