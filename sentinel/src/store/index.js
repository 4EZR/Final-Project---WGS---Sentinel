import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './counterSlice';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);
