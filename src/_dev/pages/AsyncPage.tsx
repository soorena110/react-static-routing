import * as React from 'react';
import {useRouteInfo} from "../routes";


export default function AsyncPage() {
    const c = useRouteInfo("async");
    return <div>
        Async Page
        <div style={{color: "orange"}}>
            {JSON.stringify(c)}
        </div>
    </div>
}
