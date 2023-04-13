import { createSlice } from "@reduxjs/toolkit";
import { variablesInit } from "../../Model";

const options = {
    name : 'variables',
    initialState : variablesInit,
    reducers : {
        "change" : (state, {payload})=>{
            return state.map(item=>{
                if(item.name!==payload.name){
                    return item
                }else{
                    return {...item, value:payload.value}
                }
            })
        }
    }
}

const variablesSlice = createSlice(options);

export const selectVariables = (state) => state.variables;
export const selectVariablesNumber = (state) => {
    const result = {};
    state.variables.map(item=>{result[item.name]=item.value})
    return result
    };

export default variablesSlice.reducer;