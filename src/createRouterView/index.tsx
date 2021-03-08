import * as React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {AppRouteType} from '../createRouter/models';
import {History} from 'history';
import {RouteProps} from 'react-router';
import renderSingleRouteView from "./RenderSingleRouteView";

export interface RouterViewProps {
    children?: (page: React.ReactNode) => React.ReactNode;
    NotFoundPage?: RouteProps['component'];
    useHook?: () => void;
}

export default function createRouterView<TRoute extends { [key: string]: AppRouteType }>(
    routes: TRoute,
    history: History,
    options?: { loadingComponent?: React.ComponentType, useRouteViewHook?: () => void },
) {
    return function RouteView(props: RouterViewProps) {
        const hook = props.useHook || options?.useRouteViewHook || (() => void 1);
        hook();

        const {children = p => p, NotFoundPage} = props;

        const routesNodes = Object.entries(routes).map(([key, route]) =>
            renderSingleRouteView({
                route: route, routes: routes, wrapper: children,
                defaultLoadingComponent: options?.loadingComponent
            })
        )
        return (
            <Router history={history}>
                <Switch>
                    {routesNodes}
                    {NotFoundPage && <Route component={NotFoundPage}/>}
                </Switch>
            </Router>
        );
    };
}


