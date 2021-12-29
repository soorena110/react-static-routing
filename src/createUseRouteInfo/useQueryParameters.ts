import {useLocation} from 'react-router-dom';

export function useQueryParameters() {
    const search = useLocation().search;
    if (!search) return {};

    const ret = {} as { [key: string]: string };
    search
        .substr(1)
        .split('&')
        .forEach((r) => {
            const [key, value] = r.split('=');
            ret[key] = value || '';
        });

    return ret;
}
