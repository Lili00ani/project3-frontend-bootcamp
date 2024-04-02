import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlices";

import authReducer from "./slices/AuthSlices";
const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
