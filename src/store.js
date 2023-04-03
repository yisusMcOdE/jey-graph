import { configureStore } from "@reduxjs/toolkit";
import toogleMenuReducer from './features/toogleMenuSlice.js';
import variableReducer from './features/variablesSclice.js';
import valuesReducer from './features/valuesSlice.js';

const options = {
    reducer : {
        toogleMenu : toogleMenuReducer,
        variables : variableReducer,
        values : valuesReducer
    }
}

export const store = configureStore(options);