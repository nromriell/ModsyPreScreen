import React from 'react'
import renderer from 'react-test-renderer'
import ProductCard from '../../components/ProductCard'

describe('OnAppInit Tests', () => {
    test('Renders Correctly', () => {
       const component = renderer.create(<ProductCard/>);
       expect(component.toJSON()).toMatchSnapshot();
    });

});