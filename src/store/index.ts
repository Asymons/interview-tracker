import { createStore } from 'redux';
import rootReducer from '../reducers';

const initialState = {};
const devToolsExtensionKey = 'devToolsExtension';

const enhancer = window[devToolsExtensionKey] ? window[devToolsExtensionKey]()(createStore) : createStore;
const store = enhancer(rootReducer, initialState);

export default store;