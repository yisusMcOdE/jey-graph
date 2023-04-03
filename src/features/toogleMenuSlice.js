import { createSlice } from "@reduxjs/toolkit";

const options = {
    name : 'toogleMenu',
    initialState : {
        values : true,
        table : false,
        menuGraph : false,
        graphSelected : "",
    },
    reducers : {
        "values" : (state, action)=>{return {...state, values:!state.values}},
        "table" : (state, action)=>{return {...state, table:!state.table}},
        "menuGraph" : (state, action)=>{return {...state, menuGraph:!state.menuGraph}},
        "graphSelected" : (state, action)=>{return {...state, graphSelected:action.payload}}
    }
}

const toogleMenuSlice = createSlice(options);

export const selectToogleValues = (state) => state.toogleMenu.values;
export const selectToogleTable = (state) => state.toogleMenu.table;
export const selectToogleMenuGraph = (state) => state.toogleMenu.menuGraph;
export const selectGraphSelected = (state) => state.toogleMenu.graphSelected;

export default toogleMenuSlice.reducer;