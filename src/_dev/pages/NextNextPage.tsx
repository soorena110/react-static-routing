import * as React from 'react';
import {router, useRouteInfo} from "../routes";


export default function NextNextPage() {
    console.log(useRouteInfo('nextNext'))

    return <div>
        Next Page
        <br/>
        <br/>
        <button onClick={() => {
            const options = {state: {s1: 1}};
            const exists = router.home.toBackFromHistory(options)
            if (!exists)
                router.home.toPush(options);
        }}>
            go to Home Page
        </button>
    </div>
}
