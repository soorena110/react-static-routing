import * as React from "react";
import {useMemo} from "react";

type ComponentType<TProps> = ((props: TProps) => React.ReactNode) | any

type Props<TProps> = {
    loadingComponent: React.ComponentType;
    componentLoader: () => Promise<{ default: ComponentType<TProps> }>;
} & TProps;


export default function LoadComponent<TProps>(
    {componentLoader, loadingComponent: Loading}: Props<TProps>
) {
    const LoadedComponent = useMemo(() => React.lazy(componentLoader), []);

    return <React.Suspense fallback={<Loading/>}>
        {LoadedComponent && <LoadedComponent/>}
    </React.Suspense>
}
