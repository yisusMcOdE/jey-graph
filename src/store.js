import { configureStore } from "@reduxjs/toolkit";
import toogleReducer from './features/toogleSlice.js';
import variableReducer from './features/variablesSclice.js';
import valuesReducer from './features/valuesSlice.js';

const options = {
    reducer : {
        toogle : toogleReducer,
        variables : variableReducer,
        values : valuesReducer
    }
}

export const store = configureStore(options);