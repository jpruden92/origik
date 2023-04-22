// ¡TODO!

// material-ui
import {
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip
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

import { useLocation } from "react-router-dom";

import config from 'config';

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
                        validationInfo && validationInfo.signature && validationIdentity && validationIdentity.name &&
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
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <Tooltip title={ `${validationIdentity.name} ha generado esta firma utilizando una clave privada de acceso exclusivo. Para verificar la autenticidad de esta firma, nuestro sistema utiliza la clave pública de  ${validationIdentity.name}, la cual es de acceso público. Haz click para saber más.` }>
                                                    <IconButton
                                                        onClick={() => window.open(`https://medium.com/mycrypto/the-magic-of-digital-signatures-on-ethereum-98fe184dc9c7`, '_blank')}
                                                    >
                                                        <Verified />
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item container direction="column">
                                <TextField
                                    label="Dirección del Autor (clave pública)"
                                    defaultValue={validationInfo.owner_address}
                                    value={validationInfo.owner_address}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <Tooltip title={ `Ver información de la dirección en Etherscan.` }>
                                                    <IconButton
                                                        onClick={() => window.open(`${config.etherscanUrl}/address/${validationInfo.owner_address}`, '_blank')}
                                                    >
                                                        <Verified />
                                                    </IconButton>
                                                </Tooltip>
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
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <Tooltip title={ `Ver los detalles del NFT (Non Fungible Token) que identifica a ${validationIdentity.name} en Opensea.` }>
                                                    <IconButton
                                                        onClick={() => window.open(`${config.openseaUrl}/${validationIdentity.contractAddress}/${validationIdentity.tokenId}`, '_blank')}
                                                    >
                                                        <Verified />
                                                    </IconButton>
                                                </Tooltip>
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
