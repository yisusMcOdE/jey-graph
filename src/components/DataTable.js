import { selectToogleTable } from "../features/toogleMenuSlice";
import { useSelector } from "react-redux";
import { makeGraphics } from "../Model";


export const DataTable = () => {

    const toogleTable = useSelector(selectToogleTable);
    const [,names] = makeGraphics();
    console.log(names);
    return (
        <div className={toogleTable?"dataTable":"dataTable close"}>
          <h2>Data Table</h2>
          <select>
            {names.map((item, index)=>{
              return <option key={index}>{item}</option>
            })}
          </select>
        </div>
    )
}