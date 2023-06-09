import { ItemSystemValue } from "./ItemSystemValue";
import { selectToggleValues } from "../store/slices/toggleSlice";
import { selectVariables, selectVariablesNumber } from "../store/slices/variablesSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { simulator } from "../Model";
import { useDispatch } from "react-redux";

export const SideBar = () => {

    const toggle = useSelector(selectToggleValues);
    const variables = useSelector(selectVariables);
    const variablesNumber = useSelector (selectVariablesNumber);
    const dispatcher = useDispatch();


    useEffect(()=>{
      const action = {
        type : 'values/update',
        payload : simulator(variablesNumber)
      };
      dispatcher(action);
    },[variables]);

    return (
        <div 
            className={toggle ? 'sideBar' : 'sideBar close'}
        >
          <div className="sideBarTittle">
            <h2>System Values</h2>
            <hr/>
          </div>
          <div className="itemsContainer">
            {
              variables.map( (item,index) => { 
                return  <ItemSystemValue 
                          key = {`${item.name}${index}`} 
                          name = {item.name} 
                          value = {item.value} 
                          step = {item.step} 
                          locked = {item.locked ? true : false}
                          min = {item.min}
                          max = {item.max}
                        /> 
              }) 
            }            
          </div>
        </div>
    )
}