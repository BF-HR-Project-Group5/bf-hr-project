import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from "../reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, 
};

const myPersistReducer = persistReducer(persistConfig, reducers);
const store = createStore(myPersistReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export default store;
