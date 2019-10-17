import React from 'react'
import renderer from 'react-test-renderer'
import {Provider} from 'react-redux'
import Status from '../../components/Status'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([]);

describe('Status Tests', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            data: {loading: false, error:false, products:[]},
            scrollTarget: 500
        });
        component = renderer.create(
            <Provider store={store}>
                <Status/>
            </Provider>
        )
    });

    it('Renders Correctly', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

});