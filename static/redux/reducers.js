import {ACTION_GET_PRODUCTS, ACTION_RECEIVED_PRODUCTS, ACTION_SET_SCROLL_TARGET} from "./actions";

/**
 * @author
 * Nathan Romriell - 10/16/2019
 *
 * @info
 * Central Redux Reducers File
 *
 * @Reducers
 * ProductInfoReducer($state, $action)    - Redux Reducer handling product data loads
 *
 * PagingTargetReducer($state, $action)   - Redux Reducer handling target Y position for next page data loads
 *
 */

export const ProductInfoBaseState = {loading: false, products:[]};

export const ProductInfoReducer = (state = ProductInfoBaseState, action) => {
    console.log("Inside Reducer");
  if(action.type === ACTION_GET_PRODUCTS){
      console.log("Changing State GET");
      return {...state, loading:true};
  }else if(action.type === ACTION_RECEIVED_PRODUCTS){
      return {loading:false, products: [...state.products, ...action.payload]};
  }
  return state;
};

export const BaseScrollTarget = window.innerHeight;

export const PagingTargetReducer = (state = BaseScrollTarget, action) => {
  if(action.type === ACTION_SET_SCROLL_TARGET){
      return action.payload;
  }
  return state;
};