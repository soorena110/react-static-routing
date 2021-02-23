## Info

[![npm version](https://img.shields.io/npm/v/react-static-routing.svg?style=flat-square)](https://www.npmjs.org/package/react-static-routing)
[![install size](https://badgen.net/bundlephobia/min/react-static-routing)](https://bundlephobia.com/result?p=react-static-routing)
[![npm downloads](https://img.shields.io/npm/dm/react-static-routing.svg?style=flat-square)](http://npm-stat.com/charts.html?package=react-static-routing)
[![npm total downloads](https://badgen.net/npm/dt/react-static-routing)](http://npm-stat.com/charts.html?package=react-static-routing)

## Install and Initialize

To install, use below code

```
npm install react-static-routing
```

Or

```
yarn add react-static-routing
```

After installation, use the following code to create static router objects.
In this example, using `createRoutes` function is optional. It is used for type checking and code intellisense for each value in `routes`.

```ts
import {createRoutes, createStaticRouter} from "react-static-routing";

routes = createRoutes({          // `routes` is a key-value-pair object
    homePage: {
        path: '/',
        component: HomePage,
        exact: true
    },
    loggedInPage: {
        path: '/login',
        component: LogInPage,
        exact: true
    }
})

const {router, useRouteInfo, RouterView, history} = createStaticRouter(routes, options);
```

Then we should add `RouterView` in react root component :

```tsx
function App() {
    return <>
        <RouterView NotFoundPage={NotFoundPage}>
            {(page: React.ReactNode) => page}
        </RouterView>
    </>
}

render(<App/>, document.getElementById("root"));

```

Now we are able to use `router` for redirecting between pages with static error checking!

```ts
// in our react components :

router.homePage.toPush() // redirect to homePage route.

router.notExistingPage.toPush() // we get error, because we didn't add `notExistingPage` to `routes` object.
```

`history` is exactly history object for the npm package `history@4.10.1`.

* ***Please Note!!!*** For any redirection just use `router` and this `history` object and never create any other history
  object. Because we subscribed to events of the `history`
  object. Or if you have history object (just version 4), you should pass it to `createStaticRouter` second argument.

`useRouteInfo` is a hook to get route values in page component. For more information about `useRouteInfo`, please see
#Passing-Parameters paragraph.

## How it works

Static routing is created to prevent some bug in routes or route change, and alert them in compile time.

## Conditions

if we want some routes to have some conditions, we should add a `condition` property to remove the route if we pass
false. In the following example, if user is logged-in (has token!), user will see home page, otherwise, the user sees
login page. Because if `condition` function returns `false`, we do not add the route to `RouterView`.

```ts
const routes = {
    //...
    homePage: {
        path: '/',
        component: HomePage,
        exact: true,
        condition: () => Boolean(token) // for example here, we want to check if user is logged-in or not (via token)
    },
    loggedInPage: {
        path: '/',
        component: LogInPage,
        exact: true,
    }
    //...
};
```

#### Fallbacks for conditions

If we want to redirect page, when `condition` function returns `false`, we can use `fallback` or `fallbackKey`.
`fallback` is direct url, see the following example :

```ts
const routes = {
    //...
    homePage: {
        path: '/',
        component: HomePage,
        exact: true,
        condition: () => Boolean(token), // for example here, we want to check if user is logged-in or not (via token).
        fallback: '/login' // if condition is `false`, redirect to login url.
    },
    //...
};
```

If we want to redirect to an url existing to `route` object, we'd better use `fallbackKey`.

```ts
const routes = {
    //...
    homePage: {
        path: '/',
        component: HomePage,
        exact: true,
        condition: () => Boolean(token), // for example here, we want to check if user is logged-in or not (via token).
        fallbackKey: 'loggedInPage' // redirect to `loggedInPage` route, which exist in `routes` object.
    },

    // ...
    loggedInPage: {
        path: '/login',
        component: LogInPage,
        exact: true,
    }
    //...
};
```

## Passing Parameters

For every route, we can add `query` and `params` parameters as follows:

```ts

const routes = {
    //...
    fundBuyOrSell: {
        path: '/fund/:id',
        component: FundBuyOrSellPage,
        exact: true,
        params: {} as {
            id: number,
            name?: string  // this param is optional
        },
        query: {} as {
            hamburger: boolean,
            id?: number // this query param is optional
        },
        state: {} as {
            caller: string
        }
    },
    //...
};
```

In this example we have `id` parameter as `params` in url, `hamburger` query parameter, and `caller` for `state` in
history. Now we are able to redirect to them as follows:

* Use `toPush` to redirect the route without replacing.
* Use `toReplace` to redirect the route with replacing on the current history location.
* Use `toBackFromHistory` to go back until the route with the parameters you passed. If the route exist in the history,
  it will redirect and returns true, otherwise, just return false and does nothing else.

```ts

const parameters = {
    params: {id: 123},
    query: {hamburger: true},
    state: {caller: 'fundPage'},
};
router.fundBuyOrSell.toPush(parameters);
// OR
router.fundBuyOrSell.toReplace(parameters); //to replace instead of push.

router.fundBuyOrSell.toPush({params: {ids: '123'}}); // throws error! because `ids` is not defined!
router.fundBuyOrSell.toPush({params: {id: 123}}); // throws error! because `query` and `state` are defined in `routes` but we didn't add them in `toPush` arguments object.


router.fundBuyOrSell.toBackFromHistory(parameters); // goes back to the route `fundOrSell` in the browser history, with the passed parameres.
```

#### Use static values in our page components

In a page, if you want to reach this parameter, you can get them as follows:

```ts
const {params, query, state, hasReturned} = useRouteInfo('payment');
console.log(params.id); // logs: 123
console.log(query.hamburger); // logs: true
console.log(state.caller); // logs: fundPage
console.log(params.idd); // compile time error! because `idd` does not exist in params.

console.log(hasReturned); // Shows weather we have pushed back button or returning back to this route or not,
// `false` means we have used `toPush` or `toReplace` methods, `true` means we have used `history.back` or `toBackFromHistory` method.
```

## AppRouteType

`routes` object should be as a `AppRouteType` as we shown in the following code.

```ts
type AppRouteType = {
    path: string;                   // path of the route
    condition?: (() => boolean);    // condition. See ##Conditions paragraph.
    fallback?: string;              // if condition returns false, which route should we be redirected to? See ##Conditions paragraph
    fallbackKey?: string;           // to use route key instead of `fallback` value. See ##Conditions paragraph
    component: React.ComponentType; // the route/page component
    query?: { [key: string]: unknown }; // parsed query string passed to the page/route
    params?: { [key: string]: unknown };// params passed to the page/route, which will be replace in query
    state?: { [key: string]: unknown };
};
```
