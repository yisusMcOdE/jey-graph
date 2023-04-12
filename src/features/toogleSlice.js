import { createSlice } from "@reduxjs/toolkit";

const options = {
    name : 'toogle',
    initialState : {
        values : true,
        table : false,
        menuGraph : false,
        points : false,
        tooltip : true,
        light : false,
        round : true,
        lines : true,
        graphSelected : "",
    },
    reducers : {
        "values" : (state, action) => {return {...state, values:!state.values}},
        "table" : (state, action) => {return {...state, table:!state.table}},
        "menuGraph" : (state, action) => {return {...state, menuGraph:!state.menuGraph}},
        "points" : (state, action) => {return {...state, points:!state.points}},
        "tooltip" : (state, action) => {return {...state, tooltip:!state.tooltip}},
        "light" : (state, action) => {return {...state, light:!state.light}},
        "round" : (state, action) => {return {...state, round:!state.round}},
        "lines" : (state, action) => {return {...state, lines:!state.lines}},
        "graphSelected" : (state, action) => {return {...state, graphSelected:action.payload}},
    }
}

const toogleSlice = createSlice(options);

export const selectToogleValues = (state) => state.toogle.values;
export const selectToogleTable = (state) => state.toogle.table;
export const selectToogleMenuGraph = (state) => state.toogle.menuGraph;
export const selectGraphSelected = (state) => state.toogle.graphSelected;
export const selectTooglePoints = (state) => state.toogle.points;
export const selectToogleLight = (state) => state.toogle.light;
export const selectToogleTooltip = (state) => state.toogle.tooltip;
export const selectToogleRound = (state) => state.toogle.round;
export const selectToogleLines = (state) => state.toogle.lines;

export default toogleSlice.reducer;