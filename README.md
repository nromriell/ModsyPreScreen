# Nathan Romriell - Modsy Pre-screen

## Table of Contents
* [Info](#info)
* [Technologies](#technologies)
* [Components](#components)
* [Redux](#redux)
    * [Actions](#actions)
    * [Reducers](#reducers)
* [Setup](#setup)
* [Testing](#testing)

### Info

Client Side Rendering React App for Modsy Pre-Screen

### Technologies

* npm
* python
* flask
* babel
* webpack
* react
* redux
* redux-thunk

### Components
##### App
Central React App Component, provides Redux Provider for Application

 ----
##### OnAppInit
Empty class using useEffect hook to dispatch actions on application load

 ----
##### ProductCard
Render only component for displaying a product row

 ----
##### ProductsList
ProductCard Parent utilizing generic InfiniteScroll

##### Status
Fragment wrapped component that displays server error or loading messages based on the state of the remote load

### Redux

#### Actions
title | input | action | async
------|-------|--------|-------
action_get_remote_products : initial | page:number | `{type:ACTION_GET_PRODUCTS}` | yes
action_get_remote_products : remote return| page:number | `{type:ACTION_RECEIVED_PRODUCTS, payload: [{sku:string, name:string, price:number, description:string, url:string, image:object {href:string}}]}` | yes
action_set_scroll_load_target | target:number | `{type:ACTION_SET_SCROLL_TARGET, payload: target}` | no

#### Reducers
title | Base State | Handled Actions
------|-------|--------
ProductInfoReducer | `{loading: false, products:[]}` | `ACTION_GET_PRODUCTS`
                   |                                 | |`ACTION_RECEIVED_PRODUCTS`
PagingTargetReducer | `window.innerHeight` | `ACTION_SET_SCROLL_TARGET`

### Setup
##### Windows
```$xslt
cd static
npm run start_windows
```
##### Unix
```$xslt
cd static
npm run start_unix
```

### Testing
##### Some basic testing completed with Jest
```$xslt
cd static
npm run test
```