import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./slice/sortSlice";

export const store = configureStore({
	reducer: {
		sortList: feedbackReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
