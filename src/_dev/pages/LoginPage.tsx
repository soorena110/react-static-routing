import * as React from 'react';
import {router} from "../routes";


export default function LoginPage() {
    return <div style={{color:"red"}}>
        Login Page
        <br/>
        <br/>
        <button onClick={() => router.next.toPush()}>
            go to Next Page
        </button>
    </div>
}
