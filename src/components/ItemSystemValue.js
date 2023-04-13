import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectChangeByScroll } from "../store/slices/toggleSlice";

export const ItemSystemValue = ({name, value, step=Number(0.1) , locked=false, min, max}) => {

    const changeByScroll = useSelector(selectChangeByScroll);
    const [increase, setIncrease] = useState(step);
    const dispatcher = useDispatch();

    /*
        ScrollChange
    const handlerIncreaseWithScroll = ({deltaY}) => {

            let newValue=0;
            if(deltaY<0){
                newValue = Number((value + increase).toFixed(10));
            }else{
                newValue = Number((value - increase).toFixed(10));
            }
            let action = {
                type : "variables/change",
                payload : {
                    name : name,
                    value : newValue
                }
            }
            dispatcher(action);
    }*/
    const handleChange = ({target}) => {
        const action = {
            type : "variables/change",
            payload : {
                name : name,
                value : Number(target.value)
            }
        }
        dispatcher(action);
    }


    return (
        <div className="itemSystemValue" >
            <div className="titleItem">
                <label>{name+" :"}</label>
                {(!locked&&name!="step")&&<input 
                    type="number" 
                    className="inputIncrement" 
                    value={increase} 
                    onChange={({target})=>{setIncrease(Number(target.value))}}
                    step={0.1}
                />}
            </div>
            {
                name!=="step" ?
                    locked ? 
                        <input 
                        className="inputValue"
                        disabled
                        value={value}
                        />
                            :
                        <input 
                        className="inputValue" 
                        type={"number"} 
                        /*
                            ScrollChange
                            onWheel={handlerIncreaseWithScroll}
                        */
                        onChange={handleChange}
                        step={increase}
                        value={value}
                        />
                    :
                    <select className="selectValue" value={value} onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="0.5">0.5</option>
                        <option value="0.25">0.25</option>
                        <option value="0.125">0.125</option>
                        <option value="0.0625">0.0625</option>
                        <option value="0.03125">0.03125</option>
                        <option value="0.015625">0.015625</option>
                    </select>
            }
            {
                name!=='step'&&
                <input type="range" value={value} min={min} max={max} step={increase} onChange={handleChange}/>
            }
        </div>
    )
}