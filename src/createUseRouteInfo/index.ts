/* eslint-disable @typescript-eslint/no-explicit-any */
import {useParams} from 'react-router-dom';
import {useQueryParameters} from './useQueryParameters';
import {AppRouteType} from '../createRouter/models';
import {History} from "history";

export default function createUseRouteInfo<TRoute extends { [key: string]: AppRouteType }>(
    routes: TRoute,
    history: History,
) {
    return function useRouteInfo<TRouteName extends keyof TRoute>(routeName: TRouteName) {
        const theRoute = routes[routeName];
        const params = useParams<{ [key in keyof typeof theRoute['params']]: string }>();
        const hasReturned = history.action === 'POP';
        const query = useQueryParameters() as { [key in keyof typeof theRoute['query']]: string };
        const state = history.location.state as  typeof theRoute['state'];

        const queryKeys = {} as { [key in keyof typeof theRoute['query']]: string };
        Object.keys(theRoute.query || {}).forEach((r) => ((queryKeys as any)[r] = r));

        return {params, query, queryKeys, hasReturned, state};
    };
}
