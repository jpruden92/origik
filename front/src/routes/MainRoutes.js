import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Sign = Loadable(lazy(() => import('views/sign')));
const Profile = Loadable(lazy(() => import('views/profile')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Sign />
        },
        {
            path: '/sign',
            element: <Sign />
        },
        {
            path: '/profile',
            element: <Profile />
        }
    ]
};

export default MainRoutes;
