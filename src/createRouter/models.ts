import {RouteProps} from 'react-router';
import React from 'react';


export type AppRouteType = RouteProps & {
    condition?: (() => boolean);
    render?: never;
    fallback?: string;
    fallbackKey?: string;
    path: string;
    component: React.ComponentType;
    query?: { [key: string]: unknown };
    params?: { [key: string]: unknown };
    state?: { [key: string]: unknown };
};

export type RouterArguments<TRoute> =
    (TRoute extends { params: object } ? { params: TRoute['params'] }:{ params?: undefined } ) &
    (TRoute extends { query: object } ? { query: TRoute['query'] }:{ query?: undefined } ) &
    (TRoute extends { state: object } ? { state: TRoute['state'] }:{ state?: undefined } )


export interface RouterItems<TRoute> {
    toPush: (options?: RouterArguments<TRoute>) => void;
    toReplace: (options?: RouterArguments<TRoute>) => void;
    toBackFromHistory: (options?: RouterArguments<TRoute>) => boolean;
}

export type Router<TRoute> = { [key in keyof TRoute]: RouterItems<TRoute[key]> };
