import { createSlice } from "@reduxjs/toolkit";
import { valuesInit } from "../Model";

const options = {
    name : "values",
    initialState : valuesInit,
    reducers : {
        update : (state, action) => {return {...action.payload}}
    }
}

const valuesSlice = createSlice(options);

export const selectValues = (state) => state.values;

export default valuesSlice.reducer;