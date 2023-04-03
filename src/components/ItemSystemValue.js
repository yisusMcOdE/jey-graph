import { useState } from "react"
import { useDispatch } from "react-redux";

export const ItemSystemValue = ({name, value, increment=Number(0.1) , locked=false}) => {

    const [incre, setIncre] = useState(increment);
    const dispatcher = useDispatch();

    const handlerIncrementWithScroll = ({deltaY}) => {

        let newValue=0;

        if(deltaY<0){
            newValue = Number((value + incre).toFixed(10));
        }else{
            newValue = Number((value - incre).toFixed(10));
        }

        let action = {
            type : "variables/change",
            payload : {
                name : name,
                value : newValue
            }
        }
        dispatcher(action);
    }
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
                {!locked&&<input 
                    type={"number"} 
                    className="inputIncrement" 
                    value={incre} 
                    onChange={({target})=>{setIncre(Number(target.value))}}
                    step={0.1}
                />}
            </div>
            {
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
                    onWheel={handlerIncrementWithScroll}
                    onChange={handleChange}
                    step={incre}
                    value={value}
                    />
            }
        </div>
    )
}