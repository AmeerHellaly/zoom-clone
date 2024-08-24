import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/AuthSlice";
import { type } from "os";
import { meetingsSlice } from "./slices/MettingSlice";

export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        meeting:meetingsSlice.reducer,
    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch