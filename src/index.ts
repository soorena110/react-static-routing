import createRouter from './createRouter';
import {AppRouteType} from './createRouter/models';
import createUseRouteInfo from './createUseRouteInfo';
import {History} from 'history';
import createRouterView from './createRouterView';
import createFlowHistory from './correctHistory/createFlowHistory';
import correctHistory from './correctHistory';
import checkRoutes from "./checkRoutes";
import * as React from "react";

// thanks for dear `jcalz` in stackOverFlow for helping me in below line ↓ (https://stackoverflow.com/users/2887218/jcalz)
export const createRoutes = <K extends string, TItem extends AppRouteType, TRet extends { [key in K]: TItem }>(dict: TRet) => dict;

export function createStaticRouter<TRoute extends { [key: string]: AppRouteType }>(
    routes: TRoute,
    options?: {
        history?: History;
        sessionStorageKey?: string;
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        loadingComponent?: React.ComponentType<any>,
        useRouteViewHook?: () => void;
    },
) {
    checkRoutes(routes)
    const flowHistory = createFlowHistory(options?.sessionStorageKey);
    const history = correctHistory(options?.history, flowHistory);
    const router = createRouter(routes, history, flowHistory);
    const useRouteInfo = createUseRouteInfo(routes, history);
    const RouterView = createRouterView(routes, history, {
        loadingComponent: options?.loadingComponent, useRouteViewHook: options?.useRouteViewHook
    });

    return {router, useRouteInfo, RouterView, history};
}
