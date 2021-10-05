import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { shopListReducer, shopDetailsReducer, shopCreateReducer, shopUpdateReducer, shopDeleteReducer } from './reducers/shopReducers'

const reducer = combineReducers({
  shopList: shopListReducer,
  shopDetails: shopDetailsReducer,
  shopCreate: shopCreateReducer,
  shopUpdate: shopUpdateReducer,
  shopDelete: shopDeleteReducer
});


const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;