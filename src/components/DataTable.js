import { selectToogleTable } from "../features/toogleSlice";
import { useDispatch } from "react-redux";
import { selectValues } from "../features/valuesSlice";
import { useSelector } from "react-redux";
import { Table } from "./Table";
import { useState } from "react";


export const DataTable = () => {

    const toogleTable = useSelector(selectToogleTable);
    const values = useSelector(selectValues);
    const dispatcher = useDispatch();
    const names = [];
    
    for (const key in values) {
      names.push(key);
    }

    const [selected, setSelected] = useState(names[0]);

    const handleToogleRound = () => {
      const action = {
        type : "toogle/round"
    }
    dispatcher(action);
    }

    return (
        <div className={toogleTable?"dataTable":"dataTable close"}>
          <h2>Data Table</h2>
          <select onChange={({target})=>{setSelected(target.value)}}>
            {names.map((item, index)=>{
              return <option key={index} value={item}>{item}</option>
            })}
          </select>
          <div>
            <label>¿Round?</label>
            <input type="checkbox" defaultChecked onChange={handleToogleRound}/>
          </div>
          <div className="tableContainer">
            <Table values={values[selected]}/>
          </div>
        </div>
    )
}