import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProductRequests } from "@/interface/interface";

interface IFeedback {
	filterResult: string;
	sortResult: string;
	requestList: IProductRequests[];
	empty: number;
}

const initialState: IFeedback = {
	filterResult: "All",
	sortResult: "Most Upvotes",
	requestList: [],
	empty: 0,
};

export const FeedbackSlice = createSlice({
	name: "feedback",
	initialState,
	reducers: {
		addList: (state, action) => {
			state.requestList = [];
			state.requestList.push(...action.payload);
		},
		filterEdit: (state, action) => {
			state.filterResult = action.payload;
		},
		sortEdit: (state, action) => {
			state.sortResult = action.payload;
		},
		addEmpty: (state, action) => {
			state.empty = action.payload;
		},
	},
});

export const { filterEdit, sortEdit, addList, addEmpty } =
	FeedbackSlice.actions;

export default FeedbackSlice.reducer;
