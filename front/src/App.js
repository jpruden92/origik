import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider, Backdrop, CircularProgress } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <Backdrop
                    sx={{ background: '#112B3C', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    transitionDuration={{
                        appear: 0,
                        exit: 500
                    }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
