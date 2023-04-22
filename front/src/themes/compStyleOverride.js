export default function componentStyleOverrides(theme) {
    const bgColor = theme.colors?.grey50;
    return {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'linear-gradient(135deg, rgba(46,163,93,0.859) 0%, rgba(148,60,150,0.969) 100%)',
                    border: '0!important',
                    '& .MuiInputBase-root': {
                        backgroundColor: 'rgba(255,255,255,0.122)',
                        border: '0!important',
                        color: 'white!important',
                        '& fieldset': {
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        }
                    },
                    '& label.Mui-focused': {
                        color: 'white',
                    },
                    '& .MuiButton-root': {
                        color: 'black',
                        backgroundColor: 'white',
                    }
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '24px',
                    '& h3': {
                        textTransform: 'uppercase',
                        fontWeight: 400,
                        fontSize: '0.875em',
                        lineHeight: '5',
                        letterSpacing: '0.13125rem'
                    },
                    '& h6': {
                        fontWeight: 300,
                        fontSize: '1em',
                        letterSpacing: '0rem'
                    }
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    minWidth: '36px'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: theme.textDark
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': {
                        color: theme.darkTextSecondary,
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    opacity: 0
                }
            }
        }
    };
}
