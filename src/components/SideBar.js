import { ItemSystemValue } from "./ItemSystemValue";
import { selectToogleValues } from "../features/toogleSlice";
import { selectVariables, selectVariablesNumber } from "../features/variablesSclice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { simulator } from "../Model";
import { useDispatch } from "react-redux";

export const SideBar = () => {

    const toogle = useSelector(selectToogleValues);
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
            className={toogle ? 'sideBar' : 'sideBar close'}
        >
          <div className="sideBarTittle">
            <h2>System Values</h2>
            <hr/>
          </div>
          <div className="itemsContainer">
            {
              variables.map( (item,index) => { 
                return  <ItemSystemValue 
                          key={`${item.name}${index}`} 
                          name={item.name} 
                          value={item.value} 
                          increment={item.increment} 
                          locked={item.locked ? true : false}
                        /> 
              }) 
            }            
          </div>
        </div>
    )
}