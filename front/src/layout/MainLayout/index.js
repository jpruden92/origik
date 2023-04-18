import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Toolbar } from '@mui/material';

// project imports
import Header from './Header';
import { SET_MENU } from 'store/actions';

// styles
const Main = styled('main')(({ theme }) => ({
    ...theme.typography.mainContent
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    return (

            <Main theme={theme}>
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
                <Outlet />
            </Main>

    );
};

export default MainLayout;
