import HomePage from "./pages/HomePage";
import {createRoutes, createStaticRouter} from "../index";
import NextPage from "./pages/NextPage";
import NextNextPage from "./pages/NextNextPage";
import LoginPage from "./pages/LoginPage";
import {useEffect, useState} from "react";
import PageLoading from "./PageLoading";


let globalToken = true;

function useToken() {
    const [token, setToken] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            console.log(!token)
            setToken(!token);
            globalToken = !token;
        }, 10000)
    }, [token, setToken]);

    return token;
}

const loggedIn = () => globalToken;
const notLoggedIn = () => !globalToken;


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
        query: {burger: false} as { burger: boolean }
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

const {router, useRouteInfo, RouterView} = createStaticRouter(routes, {
    useRouteViewHook: useToken,
    loadingComponent: PageLoading
});

export {useRouteInfo, RouterView, router};

export default routes;
