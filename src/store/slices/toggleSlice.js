import { createSlice } from "@reduxjs/toolkit";

const options = {
    name : 'toggle',
    initialState : {
        values : true,
        table : false,
        menuGraph : false,
        points : false,
        tooltip : true,
        light : true,
        round : true,
        lines : true,
        changeByScroll : false,
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
        "changeByScroll" : (state, action) => {return {...state, changeByScroll:!state.changeByScroll}},
        "graphSelected" : (state, action) => {return {...state, graphSelected:action.payload}},
    }
}

const toggleSlice = createSlice(options);

export const selectToggleValues = (state) => state.toggle.values;
export const selectToggleTable = (state) => state.toggle.table;
export const selectToggleMenuGraph = (state) => state.toggle.menuGraph;
export const selectGraphSelected = (state) => state.toggle.graphSelected;
export const selectTogglePoints = (state) => state.toggle.points;
export const selectToggleLight = (state) => state.toggle.light;
export const selectToggleTooltip = (state) => state.toggle.tooltip;
export const selectToggleRound = (state) => state.toggle.round;
export const selectToggleLines = (state) => state.toggle.lines;
export const selectChangeByScroll = (state) => state.toggle.changeByScroll;

export default toggleSlice.reducer;