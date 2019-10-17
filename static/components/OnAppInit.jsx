import React, {useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import {action_get_remote_products} from "../redux/actions";

/**
 * @author
 * Nathan Romriell - 10/16/2019
 *
 * @info
 * Functional Component - OnAppInit
 *
 * @description
 * Empty class using useEffect hook to dispatch actions on application load
 *
 * @redux-props
 * loadProductData($page) - initial call to remote server to download product details
 *
 * @Hooks
 * useEffect              - Put redux application load calls in this function
 *
 */
const OnAppInit = (props) => {
    useEffect(() => {
       props.loadProductData(1);
    });
    return <Fragment/>
};

const mapDispatchToProps = (dispatch) =>
{
  return {
      loadProductData: (page) => dispatch(action_get_remote_products(page))
  }
};

export default connect(null, mapDispatchToProps)(OnAppInit)