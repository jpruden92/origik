// ¡TODO!

// material-ui
import {
    Grid,
    TextField,
    Button,
    Card,
    CardActionArea,
    Typography,
    CardMedia,
    CardContent,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

import { useEffect } from 'react';
import useState from 'react-usestateref';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import moment from 'moment';

import { useTranslation } from "react-i18next";

import openseaManager from 'services/openseaManager';

import config from 'config';

const Profile = () => {
    const theme = useTheme();

    const [ textFieldAddress, setTextFieldAddress ] = useState('');
    const [ assets, setAssets ] = useState([]);

    const { t } = useTranslation();

    const getProfile = async () => {
        const data = await openseaManager.getAssets(textFieldAddress);
        console.info(data);
        setAssets(data.assets.filter(asset => asset.collection.name === config.collectionName).map((asset) => {
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
        }));
    }

    return (
        <MainCard title={'Firmar'} subtitle={ t('tagconfig.description') }>
            <>
                <Grid container direction="column" spacing={1}>
                    <TextField
                        id="filled-multiline-static"
                        label="Address"
                        defaultValue={textFieldAddress}
                        variant="filled"
                        onChange={(e) => { setTextFieldAddress(e.target.value) }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => { getProfile() }}
                    >
                        Obtener perfil
                    </Button>
                </Grid>
                {
                    assets.map((asset, index) => {
                        return (
                            <Card sx={{ maxWidth: 345 }} key={index}>
                                <CardActionArea
                                    onClick={() => {
                                        window.open(`${config.etherscanUrl}/nft/${asset.contractAddress}/${asset.tokenId}`, '_blank');
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={asset.image}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {asset.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <List dense>
                                                {
                                                    asset.properties.map((value) => {
                                                        return (
                                                            <ListItem>
                                                                <ListItemText
                                                                    primary={value.value}
                                                                    secondary={value.type}
                                                                />
                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })
                }
            </>
        </MainCard>
    );
};

export default Profile;
