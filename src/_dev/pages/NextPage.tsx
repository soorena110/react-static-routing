import * as React from 'react';
import {router, useRouteInfo} from "../routes";


export default function NextPage() {
    const c = useRouteInfo("next");
    return <div>
        Next Page
        <br/>
        {JSON.stringify(c)}
        <br/>
        <button onClick={() => router.nextNext.toPush()}>
            again next
        </button>
    </div>
}
