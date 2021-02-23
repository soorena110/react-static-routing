import {AppRouteType} from "./models";

export function replaceUrlParams(url: string, params?: AppRouteType["params"]) {
    if (!params) return url;
    Object.entries(params).forEach(([key, value]) => {
        url = url.replace(':' + key, '' + value);
    });
    return url;
}

export function addQuery(url: string, query?: AppRouteType["query"]) {
    if (!query) return url;
    return (
        url +
        '?' +
        Object.entries(query)
            .map(([key, value]) => key + '=' + value)
            .join('&')
    );
}
