import React from 'react'
import renderer from 'react-test-renderer'
import {Provider} from 'react-redux'
import InfiniteScroll from '../../components/InfiniteScroll'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([]);

describe('InfiniteScroll Tests', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            data: {loading: false, products:[]},
            scrollTarget: 500
        });
        component = renderer.create(
            <Provider store={store}>
                <InfiniteScroll/>
            </Provider>
        )
    });

    it('Renders Correctly', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

});