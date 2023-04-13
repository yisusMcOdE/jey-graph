import { selectToggleTable } from "../store/slices/toggleSlice";
import { useDispatch } from "react-redux";
import { selectValues } from "../store/slices/valuesSlice";
import { useSelector } from "react-redux";
import { Table } from "./Table";
import { useState } from "react";


export const DataTable = () => {

    const toggleTable = useSelector(selectToggleTable);
    const values = useSelector(selectValues);
    const dispatcher = useDispatch();
    const names = [];
    
    for (const key in values) {
      names.push(key);
    }

    const [selected, setSelected] = useState(names[0]);

    const handleToggleRound = () => {
      const action = {
        type : "toggle/round"
    }
    dispatcher(action);
    }

    return (
        <div className={toggleTable?"dataTable":"dataTable close"}>
          <h2>Data Table</h2>
          <select onChange={({target})=>{setSelected(target.value)}}>
            {names.map((item, index)=>{
              return <option key={index} value={item}>{item}</option>
            })}
          </select>
          <div>
            <label>¿Round?</label>
            <input type="checkbox" defaultChecked onChange={handleToggleRound}/>
          </div>
          <div className="tableContainer">
            <Table values={values[selected]}/>
          </div>
        </div>
    )
}