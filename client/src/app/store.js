import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/user.reducer';
import productReducer from './products/products.slice'
import {persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['product']
}

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store)
