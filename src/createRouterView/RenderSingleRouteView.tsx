import {AppRouteType} from '../createRouter/models';
import * as React from "react";
import {Redirect, Route} from "react-router-dom";
import LoadComponent from "./LoadComponent";

const defaultLoading = () => <div>loading</div>;

interface Props {
    routes: { [key: string]: AppRouteType };
    route: AppRouteType;
    wrapper: (page: React.ReactNode) => React.ReactNode;
    defaultLoadingComponent?: React.ComponentType;
    key: string;
}

export default function renderSingleRouteView({route, wrapper, routes, defaultLoadingComponent, key}: Props) {
    if (isConditionOk(route.condition)) {
        if ('component' in route || 'asyncComponent' in route)
            return renderRouteComponent(route, wrapper, defaultLoadingComponent || defaultLoading, key);
        if ('redirect' in route || 'redirectKey' in route) {
            return renderRedirectComponent(route, routes, key)
        }
    }

    return renderFallbackComponent(route, routes, key);
}


function renderFallbackComponent<TRoute extends {
    [key: string]: AppRouteType
}>(route: AppRouteType, routes: TRoute, key: string) {
    const fallbackKey = route.fallbackKey as keyof TRoute;
    const fallback = fallbackKey ? routes[fallbackKey].path : route.fallback;
    if (!fallback) return null;

    return (
        <Redirect key={key}
                  path={route.path}
                  exact={route.exact}
                  push={false}
                  to={fallback}
        />
    );
}

function renderRedirectComponent<TRoute extends {
    [key: string]: AppRouteType
}>(route: AppRouteType, routes: TRoute, key: string) {
    const redirect = 'redirectKey' in route ? routes[route.redirectKey].path : 'redirect' in route && route.redirect;
    if (!redirect) return null;

    return (
        <Redirect key={key}
                  path={route.path}
                  exact={route.exact}
                  push={false}
                  to={redirect}
        />
    );
}

function renderRouteComponent(
    route: AppRouteType,
    wrapper: (page: React.ReactNode) => React.ReactNode,
    defaultLoadingComponent: React.ComponentType, key: string) {

    if ('component' in route || 'asyncComponent' in route)
        return (
            <Route key={key}
                   path={route.path}
                   exact={route.exact}
                   render={(props) => {
                       let node;
                       if ('component' in route) {
                           const Component = route.component;
                           node = <Component {...props} />;
                       }

                       if ('asyncComponent' in route) {
                           const loadingComponent = route.loadingComponent || defaultLoadingComponent;
                           node = <LoadComponent componentLoader={route.asyncComponent}
                                                 loadingComponent={loadingComponent}/>;
                       }

                       return wrapper(node)
                   }}
            />
        );

    return null;
}


function isConditionOk(condition: AppRouteType['condition']) {
    if (!condition) return true;
    return condition();
}
