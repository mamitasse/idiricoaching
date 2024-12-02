//storeRedux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducerRedux/rootReducer'; // Assurez-vous que ce chemin est correct

const store = configureStore({
  reducer: rootReducer,
});

export default store;
