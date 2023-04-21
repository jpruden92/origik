// ¡TODO!

// material-ui
import {
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    InputAdornment
} from '@mui/material';

import { useEffect } from 'react';
import useState from 'react-usestateref';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import moment from 'moment';

import blockchain from 'utils/blockchain';
import apiManager from 'services/api';

import { useTranslation } from "react-i18next";

import { useLocation } from "react-router-dom"

import Verified from '@mui/icons-material/Verified';

const Check = () => {
    const theme = useTheme();

    const { t } = useTranslation();

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [ validationInfo, setValidationInfo ] = useState({});
    const [ validationIdentity, setValidationIdentity ] = useState({});

    useEffect(async () => {
        const key = params.get("key");
        const data = await apiManager.getVerification(key);
        setValidationInfo(data);
        const assets = await blockchain.getAssets(data.owner_address);
        setValidationIdentity(assets[0]);
    }, []);

    return (
        <MainCard title={ validationIdentity.name ? `${validationIdentity.name} ha firmado este texto` : 'Check' } subtitle={ 'A continuación puedes ver el contenido del texto firmado y la información detallada de la firma.' }>
            <>
                <Grid container direction="column" spacing={2}>
                    {
                        validationInfo && validationInfo.signature &&
                        <>
                            <Grid item container direction="column">
                                <TextField
                                    label="Texto firmado"
                                    defaultValue={validationInfo.text}
                                    value={validationInfo.text}
                                    multiline
                                    rows={20}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item container direction="column">
                                <TextField
                                    label="Firma"
                                    defaultValue={validationInfo.signature}
                                    value={validationInfo.signature}
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
                            <Grid item container direction="column">
                                <TextField
                                    label="Dirección del Autor"
                                    defaultValue={validationInfo.owner_address}
                                    value={validationInfo.owner_address}
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
                            <Grid item container direction="column">
                                <TextField
                                    label="Identidad del autor"
                                    defaultValue={validationIdentity.name}
                                    value={validationIdentity.name}
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
                        </>
                    }
                </Grid>
            </>
        </MainCard>
    );
};

export default Check;
