import axios from 'axios'
import {API, BEST_BUY_API_KEY} from "../config";

/**
 * @author
 * Nathan Romriell - 10/16/2019
 *
 * @info
 * Central Redux Actions File
 *
 * @Actions
 * action_get_remote_products($page:number)        - Redux/Thunk Dispatcher for loading remote data, dispatches GET_PRODUCTS setting data loading:true after load
 *                                                 ...dispatches RECEIVED_PRODUCTS to update data setting loading:false
 *          @type: ACTION_GET_PRODUCTS, ACTION_RECEIVED_PRODUCTS
 *          @payload: n/a, [ProductInfo {sku:string, name:string, price:number, description:string, url:string, image:object {href:string} }]
 *
 * action_set_scroll_load_target($target:number)   - Changes the page load scroll target, used by InfiniteScroll to determine when to load new page
 *          @type: ACTION_SET_SCROLL_TARGET
 *          @payload: targetY:number
 *
 */

export const ACTION_GET_PRODUCTS = "ACTION_GET_PRODUCTS";
export const ACTION_RECEIVED_PRODUCTS = "ACTION_RECEIVED_PRODUCTS";
export const ACTION_SET_SCROLL_TARGET = "ACTION_SET_SCROLL_TARGET";


/* data format - needed
*
*  _0: {
*       sku,
*       name
*       regularPrice,
*       salePrice,
*       onSale,
*       shortDescription,
*       images: [
*           href
*           primary: boolean
*       ]
*   }
* */

/**
 * Corrects type of remote data in the case of invalid data, invalid data could also be thrown out instead
 * @param obj - object to check the type of
 * @param expectedType - string|boolean|number
 * @param defaultValue - default value to revert to if conversion fails
 * @returns {string|boolean|number|*}
 */
const correctType = (obj, expectedType, defaultValue) => {
  if(!obj || typeof obj == 'undefined'){
      return defaultValue;
  }
  if(typeof obj !== expectedType){
      let val = obj;
      switch (expectedType) {
          case "number":
              val = Number(obj);
              if(val && !val.isNaN() && val.isFinite()){
                  return val;
              }else {
                  return defaultValue;
              }
          case "boolean":
              return Boolean(obj);
          case "string":
              return obj.toString();
          default:
              return defaultValue;
      }
  }
  return obj;
};

export const mapGetProductResponse = (response) =>
{
    return response.products.map((product, index) => {
        /* Object Data Checks */
        const sku = correctType(product.sku, "string", index.toString());
        const name = correctType(product.name, "string", "");
        const regularPrice = correctType(product.regularPrice, "number", -1);
        const salePrice = correctType(product.salePrice, "number", -1);
        const onSale = correctType(product.onSale, "boolean", false);
        const description = correctType(product.shortDescription, "string", "");
        const url = correctType(product.url, "string", "");
        let image = product.images;
        if(image != null && image.length > 0){
            image = product.images.filter((image) => image.primary);
            if(image.length < 1){
                image = {...product.images[0], primary:true};
            }else {
                image = image[0];
            }
        }else {
            image = {href:"", primary:true};
        }
        /* Build Result */
        return {
            sku:sku,
            name:name,
            price: "$" + (onSale ? salePrice : regularPrice).toFixed(2),
            description:description,
            url: url,
            image: image
        }
    });
};

export const action_get_remote_products = (page) => async dispatch =>
{
    dispatch({type:ACTION_GET_PRODUCTS});
    try {
        const res = await axios.get(`${API}/products(search=oven&search=stainless&search=steel)?apiKey=${BEST_BUY_API_KEY}&show=sku,name,salePrice,onSale,regularPrice,shortDescription,url,images&page=${page}&format=json`);
        const products = mapGetProductResponse(res.data);
        dispatch({type:ACTION_RECEIVED_PRODUCTS, payload:{error:false, data:products}});
    }catch(error){
        dispatch({type:ACTION_RECEIVED_PRODUCTS, payload:{error:true, data:[]}});
        console.log("Error Getting Remote Products:"+error);
    }
};

export const action_set_scroll_load_target = (target) => {
    return {type:ACTION_SET_SCROLL_TARGET, payload: target}
};