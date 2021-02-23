import * as React from 'react';
import {router} from "../routes";


export default function NotFoundPage() {
    return <div>
        Not Found Page
        <br/>
        <br/>
        <button onClick={() => router.home.toBackFromHistory()}>
            back to Home Page
        </button>
    </div>
}
