import { configureStore } from "@reduxjs/toolkit";
import turnoSlice from "./slice/turnoSlice";

export const store = configureStore({
    reducer: {
        turnoSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;