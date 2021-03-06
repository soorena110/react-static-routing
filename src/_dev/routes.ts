import HomePage from "./pages/HomePage";
import {createRoutes, createStaticRouter} from "../index";
import NextPage from "./pages/NextPage";
import NextNextPage from "./pages/NextNextPage";
import LoginPage from "./pages/LoginPage";

const loggedIn = () => true;
const notLoggedIn = () => !loggedIn()


const routes = createRoutes({
    home: {
        path: '/',
        component: HomePage,
        exact: true,
        condition: loggedIn,
        fallbackKey: 'login',
        state: {} as {
            s1: number;
            s2?: number;
        }
    },
    nextNext: {
        path: '/next-next',
        component: NextNextPage,
        exact: true,
    },
    next: {
        path: '/next',
        component: NextPage,
        exact: true,
        params: {} as {
            p1: number,
        },
        query: {} as {
            q1: number
        },
        state: {} as {
            s1: number
        }
    },
    login: {
        path: '/login',
        component: LoginPage,
        exact: true,
        condition: notLoggedIn,
        fallback: '/'
    },
    async: {
        path: '/async',
        asyncComponent: () => import('./pages/AsyncPage'),
        exact: true
    },
});

const {router, useRouteInfo, RouterView} = createStaticRouter(routes);

export {useRouteInfo, RouterView, router};

export default routes;
