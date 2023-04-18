// material-ui
import { useTheme } from '@mui/material/styles';
import { flexbox } from '@mui/system';

import { Typography } from '@mui/material';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            { /*
            <svg width="200" height="40" viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.10761 16.5C4.56207 16.5 3.27412 16.1551 2.22861 15.4803C1.16795 14.7905 0.425486 13.8758 0.0012207 12.6912L2.62257 11.1767C3.22867 12.7512 4.4257 13.5309 6.19852 13.5309C7.06221 13.5309 7.68345 13.381 8.09257 13.0661C8.48653 12.7512 8.69866 12.3763 8.69866 11.8964C8.69866 11.3566 8.45622 10.9367 7.97135 10.6368C7.48647 10.3369 6.60764 10.007 5.34999 9.66214C4.63783 9.4522 4.04689 9.25726 3.56202 9.04733C3.07714 8.83739 2.60742 8.56748 2.12255 8.22259C1.63767 7.87769 1.27402 7.44283 1.01643 6.91799C0.77399 6.39316 0.637619 5.77835 0.637619 5.07357C0.637619 3.67901 1.13765 2.56935 2.1377 1.74461C3.13775 0.919869 4.34994 0.5 5.75911 0.5C7.01675 0.5 8.12287 0.799906 9.07747 1.41471C10.0321 2.01453 10.7745 2.86926 11.3049 3.94892L8.72896 5.41846C8.10772 4.09888 7.10766 3.43908 5.75911 3.43908C5.12271 3.43908 4.62268 3.58903 4.25903 3.87395C3.89537 4.15886 3.71354 4.53374 3.71354 4.9836C3.71354 5.46345 3.91052 5.85333 4.31963 6.15323C4.72875 6.45314 5.50152 6.78304 6.66825 7.14292C7.13797 7.29288 7.50162 7.39784 7.74406 7.48782C7.9865 7.57779 8.31985 7.68276 8.74411 7.8477C9.16838 8.01265 9.48658 8.1776 9.72902 8.31256C9.9563 8.46251 10.2139 8.65745 10.5169 8.91237C10.82 9.16729 11.0321 9.42221 11.1988 9.67713C11.3655 9.93205 11.4867 10.2619 11.5928 10.6368C11.6988 11.0117 11.7594 11.4166 11.7594 11.8515C11.7594 13.276 11.2443 14.4007 10.1987 15.2404C9.13808 16.0801 7.77437 16.5 6.10761 16.5Z"></path>
                <path d="M22.6235 0.814819H25.6843V16.2H23.3508L16.6838 6.79795V16.2H13.6382V0.814819H15.9716L22.6387 10.1869V0.814819H22.6235Z"></path>
                <path d="M43.837 7.92268V9.10731C43.837 11.3116 43.1249 13.0811 41.7005 14.4456C40.2762 15.8102 38.4428 16.485 36.2002 16.485C33.8062 16.485 31.8212 15.7052 30.2302 14.1607C28.6544 12.6162 27.8665 10.7268 27.8665 8.5075C27.8665 6.2732 28.6544 4.36879 30.2151 2.80928C31.7758 1.27976 33.7153 0.5 36.0184 0.5C37.473 0.5 38.7913 0.829897 39.9883 1.4747C41.1854 2.13449 42.1248 2.98922 42.7915 4.08388L40.1701 5.58341C39.8065 4.95361 39.2459 4.44377 38.4882 4.03889C37.7458 3.64902 36.9124 3.43908 35.9881 3.43908C34.5032 3.43908 33.291 3.91893 32.3364 4.87863C31.3818 5.83833 30.8969 7.05295 30.8969 8.52249C30.8969 9.97704 31.3818 11.1767 32.3515 12.1214C33.3364 13.0661 34.6244 13.5309 36.2154 13.5309C37.3973 13.5309 38.3822 13.276 39.1549 12.7512C39.9277 12.2263 40.458 11.5216 40.7459 10.6068H36.0336V7.92268H43.837Z"></path>
                <path d="M51.7009 16.4999C49.9736 16.4999 48.5492 16.0201 47.4431 15.0454C46.337 14.0857 45.7764 12.7811 45.7764 11.1616V0.814819H48.822V10.9217C48.822 11.7314 49.0493 12.3612 49.519 12.8261C49.9887 13.2909 50.716 13.5308 51.7009 13.5308C52.6858 13.5308 53.4283 13.2909 53.8829 12.8261C54.3526 12.3612 54.5799 11.7164 54.5799 10.9217V0.814819H57.6406V11.1616C57.6406 12.7811 57.08 14.0857 55.9739 15.0454C54.8678 16.0201 53.4434 16.4999 51.7009 16.4999Z"></path>
                <path d="M63.4592 13.2909H69.3838V16.185H60.3833V0.814819H63.4441V13.2909H63.4592Z"></path>
                <path d="M81.7934 16.185L80.8085 13.4109H74.4294L73.49 16.185H70.1868L75.6113 0.814819H79.4145L84.8997 16.2H81.7934V16.185ZM75.4143 10.5918H79.7933L77.5508 4.30873L75.4143 10.5918Z"></path>
                <path d="M94.9307 16.185L91.7941 10.8467H89.4758V16.185H86.415V0.814819H92.6275C94.067 0.814819 95.2792 1.30966 96.2944 2.31435C97.3096 3.30404 97.8096 4.51866 97.8096 5.91323C97.8096 6.87293 97.5369 7.74265 96.9914 8.5674C96.4459 9.37714 95.7186 9.99195 94.8094 10.3968L98.249 16.2H94.9307V16.185ZM89.4607 3.64893V8.19251H92.6124C93.1881 8.19251 93.6882 7.96758 94.0973 7.51772C94.5064 7.06786 94.7185 6.52803 94.7185 5.89823C94.7185 5.26843 94.5064 4.7286 94.0973 4.29373C93.6882 3.85887 93.1881 3.63394 92.6124 3.63394H89.4607V3.64893Z"></path>
            </svg>
            */ }
            <Typography
                variant="h1"
                style={{
                    letterSpacing: '0rem',
                    fontSize: '3em',
                    lineHeight: 1.125,
                    fontFamily: `'Poppins', sans-serif`,
                    fontWeight: 400,
                }}
            >Origik</Typography>
        </div>
    );
};

export default Logo;
