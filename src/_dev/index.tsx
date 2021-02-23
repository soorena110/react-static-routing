import * as React from 'react';
import {render} from "react-dom";
import {RouterView} from "./routes";
import NotFoundPage from "./pages/NotFoundPage";


function DemoApplication() {
    return <>
        <RouterView NotFoundPage={NotFoundPage}>
            {(page: React.ReactNode) => page}
        </RouterView>
    </>
}

render(
    <DemoApplication/>,
    document.getElementById("root")
);


// @ts-ignore
module.hot.accept();
