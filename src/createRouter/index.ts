import {AppRouteType, Router, RouterItems} from './models';
import {addQuery, replaceUrlParams} from './utils';
import {History} from 'history';
import {FlowHistory} from "../correctHistory/createFlowHistory";

export default function createRouter<TRoute extends { [key: string]: AppRouteType }>(
    routes: TRoute,
    history: History,
    flowHistory: FlowHistory
) {
    type TRouter = Router<TRoute>;

    return new Proxy({} as TRouter, {
        get<TKey extends keyof TRoute>(_: TRouter, p: TKey): RouterItems<typeof routes[TKey]> {
            return {
                toPush(options) {
                    const route = routes[p];
                    const url = addQuery(replaceUrlParams(route.path, options?.params), options?.query);

                    history.push(url, options?.state);
                },

                toReplace(options) {
                    const route = routes[p];
                    const url = addQuery(replaceUrlParams(route.path, options?.params), options?.query);

                    history.replace(url, options?.state);
                },

                toBackFromHistory(options) {
                    const route = routes[p];
                    const url = addQuery(replaceUrlParams(route.path, options?.params), options?.query);

                    const las = flowHistory.lastLocations;
                    for (let i = las.length - 2; i >= 0; i--) {
                        if (las[i].pathname === url && JSON.stringify(las[i].state) === JSON.stringify(options?.state)) {
                            const goBackCount = las.length - i - 1;
                            history.go(-goBackCount);
                            flowHistory.pop(goBackCount - 1);
                            return true;
                        }
                    }

                    return false;
                },
            };
        },
    });
}
