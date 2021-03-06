import * as React from 'react';
import {useCallback} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {AppRouteType} from '../createRouter/models';
import {History} from 'history';
import {RouteProps} from 'react-router';
import LoadComponent from "./LoadComponent";

export interface RouterViewProps {
    children?: (page: React.ReactNode) => React.ReactNode;
    NotFoundPage?: RouteProps['component'];
}

export default function createRouterView<TRoute extends { [key: string]: AppRouteType }>(
    routes: TRoute,
    history: History,
    options?: { loadingComponent?: React.ComponentType },
) {
    return function RouteView({children = p => p, NotFoundPage}: RouterViewProps) {

        const renderRouteComponent = useCallback(
            ({component: Component, ...route}: AppRouteType) => {

                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => {
                            let node;
                            if (Component)
                                node = <Component {...props} />;

                            if ('asyncComponent' in route) {
                                const loadingComponent = route.loadingComponent || options?.loadingComponent ||
                                    (() => <div>loading</div>);
                                node = <LoadComponent componentLoader={route.asyncComponent}
                                                      loadingComponent={loadingComponent}/>;
                            }

                            return children(node)
                        }}
                    />
                );
            },
            [children],
        );
        const routesNodes = Object.values(routes).map((route) =>
            isConditionOk(route.condition)
                ? renderRouteComponent(route)
                : renderRedirectComponent(route, routes),
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

function renderRedirectComponent<TRoute extends {
    [key: string]: AppRouteType
}>(route: AppRouteType, routes: TRoute) {
    const fallbackKey = route.fallbackKey as keyof TRoute;
    const fallback = fallbackKey ? routes[fallbackKey].path : route.fallback;
    if (!fallback) return null;

    return (
        <
            Redirect
            key={route.path}
            path={route.path}
            exact={route.exact}
            push={false}
            to={fallback}
        />
    )
        ;
}

function isConditionOk(condition: AppRouteType['condition']) {
    if (!condition) return true;
    return condition();
}
