import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    ACTION_GET_PRODUCTS,
    action_get_remote_products,
    mapGetProductResponse,
    ACTION_RECEIVED_PRODUCTS,
    ACTION_SET_SCROLL_TARGET, action_set_scroll_load_target
} from "../../redux/actions";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {API, BEST_BUY_API_KEY} from "../../config";

const mock = new MockAdapter(axios);

const mockStore = configureMockStore([thunk]);

let fakeDataCorrect = [];
let fakeDataEmpty = [];
let fakeDataInvalidSku = [];
let fakeDataInvalidName = [];
let fakeDataInvalidPrice = [];
let fakeDataInvalidSalePrice = [];
let fakeDataInvalidOnSale = [];
let fakeDataInvalidDescription = [];
let fakeDataEmptyImages = [];
let fakeDataInvalidImageHref = [];
let fakeDataInvalidImagePrimary = [];
let fakeDataNoPrimaryImage = [];
for(let i = 0; i < 1; i++){
    const newItem = {
        sku:"abcdefg"+i,
        name: i.toString(),
        regularPrice: 0.99,
        salePrice: 1.00,
        onSale: false,
        shortDescription: "fake description",
        images: [{
            href:"test.image",
            primary: true
        }]};
    const newItemEmpty = {};
    const newItemInvalidSku = {...newItem, sku:123};
    const newItemInvalidName = {...newItem, name: 123};
    const newItemInvalidPrice = {...newItem, regularPrice: "test"};
    const newItemInvalidSalePrice = {...newItem, salePrice: "test"};
    const newItemInvalidOnSale = {...newItem, onSale: "test"};
    const newItemInvalidDescription = {...newItem, shortDescription:123};
    const newItemEmptyImages = {...newItem, images:[]};
    const newItemInvalidImageHref = {...newItem, images:[{href:123, primary: true}]};
    const newItemInvalidImagePrimary = {...newItem, images:[{href:"test.image", primary: 123}]};
    const newItemNoPrimaryImage = {...newItem, images:[{href:"test.image", primary: false}]};
    fakeDataCorrect.push(newItem);
    fakeDataEmpty.push(newItemEmpty);
    fakeDataInvalidSku.push(newItemInvalidSku);
    fakeDataInvalidName.push(newItemInvalidName);
    fakeDataInvalidPrice.push(newItemInvalidPrice);
    fakeDataInvalidSalePrice.push(newItemInvalidSalePrice);
    fakeDataInvalidOnSale.push(newItemInvalidOnSale);
    fakeDataInvalidDescription.push(newItemInvalidDescription);
    fakeDataEmptyImages.push(newItemEmptyImages);
    fakeDataInvalidImageHref.push(newItemInvalidImageHref);
    fakeDataInvalidImagePrimary.push(newItemInvalidImagePrimary);
    fakeDataNoPrimaryImage.push(newItemNoPrimaryImage);
}

describe('Fetch Remote Redux Action: mapProductResponse', () => {
   it('Should Map Correct Data', () => {
       const response = { products: fakeDataCorrect};
       const mapper = jest.fn(() => mapGetProductResponse(response));
       mapper();
       expect(mapper).toHaveReturned();
   });
    it('Should Handle Empty Data', () => {
        const response = { products: fakeDataEmpty};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle Invalid Sku', () => {
        const response = { products: fakeDataInvalidSku};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle Invalid Name', () => {
        const response = { products: fakeDataInvalidName};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle Invalid Price', () => {
        const response = { products: fakeDataInvalidPrice};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle Invalid Sale Price', () => {
        const response = { products: fakeDataInvalidSalePrice};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle Invalid On Sale', () => {
        const response = { products: fakeDataInvalidOnSale};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle Invalid Description', () => {
        const response = { products: fakeDataInvalidDescription};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle Empty Images', () => {
        const response = { products: fakeDataEmptyImages};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle Invalid Image Href', () => {
        const response = { products: fakeDataInvalidImageHref};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle Invalid Image Primary', () => {
        const response = { products: fakeDataInvalidImagePrimary};
        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturned();
    });
    it('Should Handle No Primary Image', () => {
        const response = { products: fakeDataNoPrimaryImage};
        const correctDataResponse = { products: fakeDataCorrect};
        const expectedMapped = mapGetProductResponse(correctDataResponse).map((product) => {
            return {
            ...product, image: {href:"test.image", primary: true}
            }
        });
        console.log("Expected Mapped:"+JSON.stringify(expectedMapped));

        const mapper = jest.fn(() => mapGetProductResponse(response));
        mapper();
        expect(mapper).toHaveReturnedWith(expectedMapped);
    });
});

describe('Redux Action: action_get_remote_products', () => {

    beforeEach(() => {
        mock.reset();
    });

    it('Should Fetch Remote Data', async (done) => {
        const store = mockStore({data:{loading: false, products:[]}, scrollTarget: 100});
       const response = { products: fakeDataCorrect};
       const page = 1;
       mock.onAny().reply(200, response);
        const expectedActions = [
            {type: ACTION_GET_PRODUCTS},
            {type: ACTION_RECEIVED_PRODUCTS, payload: mapGetProductResponse(response)}
        ];
        await store.dispatch(action_get_remote_products(page)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
});

describe('Redux Action: action_set_scroll_load_target', () => {
    it('Should Change Target Y', () => {
        const store = mockStore({data:{loading: false, products:[]}, scrollTarget: 100});
        const newTarget = 1234567;
        const expectedActions = [
            {type: ACTION_SET_SCROLL_TARGET, payload: newTarget}
        ];
        store.dispatch(action_set_scroll_load_target(newTarget));
        expect(store.getActions()).toEqual(expectedActions);
    });
});