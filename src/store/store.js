import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from './slices/toggleSlice.js';
import variableReducer from './slices/variablesSlice.js';
import valuesReducer from './slices/valuesSlice.js';

const options = {
    reducer : {
        toggle : toggleReducer,
        variables : variableReducer,
        values : valuesReducer
    }
}

export const store = configureStore(options);