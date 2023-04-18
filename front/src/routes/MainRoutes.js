import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Sign = Loadable(lazy(() => import('views/sign')));
const Check = Loadable(lazy(() => import('views/check')));
const Verify = Loadable(lazy(() => import('views/verify')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Verify />
        },
        {
            path: '/sign',
            element: <Sign />
        },
        {
            path: '/check',
            element: <Check />
        },
        {
            path: '/verify',
            element: <Verify />
        }
    ]
};

export default MainRoutes;
