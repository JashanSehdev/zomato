import { configureStore, combineReducers } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurants/restaurant.slice"
import cartReducer  from './cart/cart.slice'
import searchReducer from  './search/search.slice'

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Persistor,
} from "redux-persist";
import storage from "./storage";


const rootReducer = combineReducers({
    restaurant : restaurantReducer,
    cart: cartReducer,
    search : searchReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist : ["restaurant", "cart"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 1. Create a helper function to strictly infer the toolkit store instance type
const createBaseStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

// 2. Define your AppStore extending the actual inferred toolkit store type
export type AppStore = ReturnType<typeof createBaseStore> & {
  __persistor: Persistor;
};

// 3. Create the store initializer
export const makeStore = (): AppStore => {
  const store = createBaseStore();
  (store as any).__persistor = persistStore(store);
  return store as AppStore;
};

// 4. Safely extract RootState and AppDispatch directly from the fully-typed store instance
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createBaseStore>["dispatch"];
