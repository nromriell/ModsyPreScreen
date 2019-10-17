import {ProductInfoReducer, ProductInfoBaseState, PagingTargetReducer, BaseScrollTarget} from '../../redux/reducers'
import {ACTION_GET_PRODUCTS, ACTION_RECEIVED_PRODUCTS, ACTION_SET_SCROLL_TARGET, mapGetProductResponse} from "../../redux/actions";

let fakeData = [];
for(let i = 0; i < 1; i++){
    fakeData.push(
        {
            sku:"abcdefg"+i,
            name: i.toString(),
            regularPrice: 0.99,
            salePrice: 1.00,
            onSale: false,
            shortDescription: "fake description",
            images: [{
                href:"test.image",
                primary: true
            }]
        });
}

const reducerActions = {
    startDataLoad: {type:ACTION_GET_PRODUCTS},
    finishDataLoad: {type:ACTION_RECEIVED_PRODUCTS, payload: mapGetProductResponse({products:fakeData})},
    changeTarget: {type: ACTION_SET_SCROLL_TARGET, payload: 12345}
};

describe('Redux Reducer: ProductInfoReducer', () => {
    it('Should Start Loading', () => {
        const newState = ProductInfoReducer(ProductInfoBaseState, reducerActions.startDataLoad);
        expect(newState).toEqual({...ProductInfoBaseState, loading:true});
    });
    it('Should Modify Loaded Data', () => {
        const newState = ProductInfoReducer({...ProductInfoBaseState, loading:true}, reducerActions.finishDataLoad);
        expect(newState).toEqual({products:reducerActions.finishDataLoad.payload, loading:false});
    });
    it('Should Ignore Change Page Load Target', () => {
        const newState = ProductInfoReducer(ProductInfoBaseState, reducerActions.changeTarget);
        expect(newState).toEqual(ProductInfoBaseState);
    });
});

describe('Redux Reducer: PagingTargetReducer', () => {
    it('Should Modify Target', () => {
        const newState = PagingTargetReducer(BaseScrollTarget, reducerActions.changeTarget);
        expect(newState).toEqual(reducerActions.changeTarget.payload);
    });
    it('Should Ignore Start Data Load', () => {
        const newState = PagingTargetReducer(BaseScrollTarget, reducerActions.startDataLoad);
        expect(newState).toEqual(BaseScrollTarget);
    });
    it('Should Ignore Data Load Complete', () => {
        const newState = PagingTargetReducer(BaseScrollTarget, reducerActions.finishDataLoad);
        expect(newState).toEqual(BaseScrollTarget);
    });
});