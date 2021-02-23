import * as React from 'react';
import {router} from "../routes";


export default function HomePage() {
    return <div>
        Home Page
        <br/>
        <br/>
        <button onClick={() => router.next.toPush({params: {p1: 1}, query: {q1: 2}, state: {s1: 2}})}>
            go to Next Page

        </button>
    </div>
}
