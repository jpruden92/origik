import { useState, useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Typography,
    Button
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';

import { useAuth0 } from "@auth0/auth0-react";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const [open, setOpen] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const { logout, user } = useAuth0();

    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

    const connectMetamask = async () => {
        const newAccounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        console.log(newAccounts);

        setIsAuthenticated(true);
    }

    return (
        <>
            { !isAuthenticated && <Button onClick={() => connectMetamask()}>Conectar Metamask</Button> }
            { isAuthenticated && (
                <>
                    <Chip
                        sx={{
                            height: '48px',
                            alignItems: 'center',
                            borderRadius: '27px',
                            transition: 'all .2s ease-in-out',
                            borderColor: theme.palette.primary.light,
                            backgroundColor: theme.palette.primary.light,
                            '&[aria-controls="menu-list-grow"], &:hover': {
                                borderColor: theme.palette.primary.main,
                                background: `${theme.palette.primary.main}!important`,
                                color: theme.palette.primary.light,
                                '& svg': {
                                    stroke: theme.palette.primary.light
                                }
                            },
                            '& .MuiChip-label': {
                                lineHeight: 0
                            }
                        }}
                        icon={
                            <Avatar
                                src={'https://play-lh.googleusercontent.com/Q8klPWjtLQrBeeP2oDAtA0H0CrYZBpK8ckF3HnqDMT2L6GGdsUCjYc75mfRkoQyhrwfS'}
                                sx={{
                                    ...theme.typography.mediumAvatar,
                                    margin: '8px 0 8px 8px !important',
                                    cursor: 'pointer'
                                }}
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                color="inherit"
                            />
                        }
                        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                        variant="outlined"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="primary"
                    />
                    <Popper
                        placement="bottom-end"
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        popperOptions={{
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 14]
                                    }
                                }
                            ]
                        }}
                    >
                        {({ TransitionProps }) => (
                            <Transitions in={open} {...TransitionProps}>
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                            <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                                <Box sx={{ p: 2 }}>
                                                    <List
                                                        component="nav"
                                                        sx={{
                                                            width: '100%',
                                                            maxWidth: 350,
                                                            minWidth: 300,
                                                            backgroundColor: theme.palette.background.paper,
                                                            borderRadius: '10px',
                                                            [theme.breakpoints.down('md')]: {
                                                                minWidth: '100%'
                                                            },
                                                            '& .MuiListItemButton-root': {
                                                                mt: 0.5
                                                            }
                                                        }}
                                                    >
                                                        <ListItemButton
                                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                            onClick={ logout }
                                                        >
                                                            <ListItemIcon>
                                                                <IconLogout stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                        </ListItemButton>
                                                    </List>
                                                </Box>
                                            </PerfectScrollbar>
                                        </MainCard>
                                    </ClickAwayListener>
                                </Paper>
                            </Transitions>
                        )}
                    </Popper>
                </>
            )}
        </>
    );
};

export default ProfileSection;
