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
// project imports
import MainCard from 'ui-component/cards/MainCard';

import api from 'services/api';

import { useTranslation } from "react-i18next";

import { useLocation } from "react-router-dom";

import config from 'config';

import Verified from '@mui/icons-material/Verified';

const Check = () => {
    const { t } = useTranslation();

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [ validationInfo, setValidationInfo ] = useState({});
    const [ validationIdentity, setValidationIdentity ] = useState({});

    useEffect(async () => {
        const key = params.get("key");
        const data = await api.getVerification(key);
        setValidationInfo(data);
        const assets = await api.getIdentitiesList(data.owner_address);
        setValidationIdentity(assets[0]);
    }, []);

    return (
        <MainCard title={ validationIdentity.name ? t('check.title.validatorName', { name: validationIdentity.name }) : t('check.title.default') } avatar={ validationIdentity.image } subtitle={ t('check.subtitle') }>
            <>
                <Grid container direction="column" spacing={2}>
                    {
                        validationInfo && validationInfo.signature && validationIdentity && validationIdentity.name &&
                        <>
                            <Grid item container direction="column">
                                <TextField
                                    label={ t('check.label.signedText') }
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
                                    label={ t('check.label.sign') }
                                    defaultValue={validationInfo.signature}
                                    value={validationInfo.signature}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <Tooltip title={ t('check.tooltip.sign', { name: validationIdentity.name }) }>
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
                                    label={ t('check.label.authorAddr') }
                                    defaultValue={validationInfo.owner_address}
                                    value={validationInfo.owner_address}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <Tooltip title={ t('check.tooltip.authorAddr') }>
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
                                    label={ t('check.label.authorIdentity') }
                                    defaultValue={validationIdentity.name}
                                    value={validationIdentity.name}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <Tooltip title={ t('check.tooltip.authorIdentity', { name: validationIdentity.name }) }>
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
