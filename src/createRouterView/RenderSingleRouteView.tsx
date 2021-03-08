import {AppRouteType} from "../createRouter/models";
import * as React from "react";
import {Redirect, Route} from "react-router-dom";
import LoadComponent from "./LoadComponent";

const defaultLoading = () => <div>loading</div>;

interface Props {
    routes: { [key: string]: AppRouteType };
    route: AppRouteType;
    wrapper: (page: React.ReactNode) => React.ReactNode;
    defaultLoadingComponent?: React.ComponentType
}

export default function renderSingleRouteView({route, wrapper, routes, defaultLoadingComponent}: Props) {
    if (isConditionOk(route.condition))
        return renderRouteComponent(route, wrapper, defaultLoadingComponent || defaultLoading)

    return renderRedirectComponent(route, routes);
}


function renderRedirectComponent<TRoute extends {
    [key: string]: AppRouteType
}>(route: AppRouteType, routes: TRoute) {
    const fallbackKey = route.fallbackKey as keyof TRoute;
    const fallback = fallbackKey ? routes[fallbackKey].path : route.fallback;
    if (!fallback) return null;

    return (
        <Redirect
            key={route.path}
            path={route.path}
            exact={route.exact}
            push={false}
            to={fallback}
        />
    );
}

function renderRouteComponent(
    {component: Component, ...route}: AppRouteType,
    wrapper: (page: React.ReactNode) => React.ReactNode,
    defaultLoadingComponent: React.ComponentType) {

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
                    const loadingComponent = route.loadingComponent || defaultLoadingComponent;
                    node = <LoadComponent componentLoader={route.asyncComponent}
                                          loadingComponent={loadingComponent}/>;
                }

                return wrapper(node)
            }}
        />
    );
}


function isConditionOk(condition: AppRouteType['condition']) {
    if (!condition) return true;
    return condition();
}
