import React, {useEffect, useLayoutEffect} from 'react'
import {connect} from 'react-redux';
import ProductCard from './ProductCard';
import InfiniteScroll from './InfiniteScroll';
import {action_get_remote_products, action_set_scroll_load_target} from "../redux/actions";

import '../style/theme.css'

/**
 * @author
 * Nathan Romriell - 10/16/2019
 *
 * @info
 * Functional Component - ProductsList
 *
 * @description
 * ProductCard Parent utilizing generic InfiniteScroll
 *
 * @redux-props
 * data                   - Product data
 * setLoadTarget($target) - Set the target Y for the next page load based on the loaded elements
 *
 * @Hooks
 * useLayoutEffect        - Used to update the target Y for page load after component layout
 * useEffect              - Used to add/remove resize event listeners to modify the target Y for page load
 *
 */
const ProductsList = (props) => {
    const updateLastItemPosition = () => {
        const lastItem = document.querySelector("#ProductsList:last-child");
        if(lastItem) {
            const lastItemPosition = lastItem.offsetTop + lastItem.clientHeight;
            props.setLoadTarget(lastItemPosition);
        }
    };
    useLayoutEffect(() => {
       updateLastItemPosition();
    });
    useEffect(() => {
       window.addEventListener('resize', updateLastItemPosition);
       return () => {
         window.removeEventListener('resize', updateLastItemPosition);
       };
    });
    const list = props.data.products.map((product) =>
    <ProductCard key={product.sku} url={product.url} name={product.name} description={product.description} price={product.price} image={product.image}/>);
    return <InfiniteScroll
        id="ProductsList"
        className="ProductsList"
        pageLoadAction={action_get_remote_products}
        targetChangeAction={action_set_scroll_load_target}>
        {list}
    </InfiniteScroll>
};

const mapStateToProps = (state) =>
{
    return {data:state.data};
};

const mapDispatchToProps = (dispatch) =>
{
    return {
        setLoadTarget: (target) => dispatch(action_set_scroll_load_target(target))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)