// ¡TODO!

// material-ui
import {
    Grid,
    TextField,
    Button
} from '@mui/material';

import useState from 'react-usestateref';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import { useTranslation } from "react-i18next";

const Verify = () => {
    const { t } = useTranslation();

    const [ textFieldKey, setTextFieldKey ] = useState('');

    const _goToCheck = async () => {
        // Router go to /check?key=textFieldKey
        window.location.href = '/check?key=' + textFieldKey;
    }

    return (
        <MainCard title={ t('verify.title') } subtitle={ t('verify.subtitle') }>
            <>
                <Grid container direction="column" spacing={2}>
                    <Grid item container direction="column">
                        <TextField
                            id="filled-multiline-static"
                            label={ t('verify.label.key') }
                            defaultValue={textFieldKey}
                            onChange={(e) => { setTextFieldKey(e.target.value) }}
                        />
                    </Grid>
                    <Grid item container direction="column">
                        <Button
                            variant="contained"
                            onClick={() => { _goToCheck() }}
                            size='large'
                            disableElevation
                        >
                            Verificar
                        </Button>
                    </Grid>
                </Grid>
            </>
        </MainCard>
    );
};

export default Verify;
