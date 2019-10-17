import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import ProductsList from "./components/ProductsList";
import OnAppInit from "./components/OnAppInit";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {PagingTargetReducer, ProductInfoReducer} from "./redux/reducers";
import Status from "./components/Status";


/**
 * @author
 * Nathan Romriell - 10/16/2019
 *
 * @info
 * Functional Component - App
 *
 * @description
 * Central React App Component, provides Redux Provider for Application
 *
 */
const App = () => {
    const reducers = combineReducers({data:ProductInfoReducer, scrollTarget:PagingTargetReducer});
    const store = createStore(reducers, applyMiddleware(thunk));
    return (
        <Provider store={store}>
            <OnAppInit/>
            <div className="App">
                <ProductsList/>
                <Status/>
            </div>
        </Provider>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);