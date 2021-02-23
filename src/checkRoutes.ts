import {AppRouteType} from "./createRouter/models";

export default function checkRoutes<TRoute extends { [key: string]: AppRouteType }>(routes: TRoute) {
    Object.entries(routes).forEach(([routeKey, route]) => {
        const {fallbackKey} = route;

        if (fallbackKey && !routes[fallbackKey]) {
            console.error(`FallbackKey for the route with key of '${routeKey}' does not exist.`, {
                routeKey, fallbackKey, route
            });
        }
    })
}
