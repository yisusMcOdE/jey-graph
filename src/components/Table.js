import { selectToggleRound } from "../store/slices/toggleSlice";
import { useSelector } from "react-redux";

export const Table = ({values}) => {

    const round = useSelector(selectToggleRound);
    const keys = [];
    for (const key in values[0]) {
        keys.push(key);
    }

    return (
        <table style={round?{alignSelf:"center"}:{alignSelf:"flex-start"}}>
            <thead>
                <tr>
                    {
                        keys.map((item,index)=><th key={index}>{item.toUpperCase()}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    values.map((item,index)=>{
                        let style={}
                        if(index%2===0){
                            style={backgroundColor:"#B6B6B6"}
                        }
                        return <tr style={style} key={index}>
                            {
                                keys.map((axis,index)=>{
                                    return <td key={index}>
                                        {
                                            round ?
                                            Number((item[axis]).toFixed(5)) :
                                            item.x
                                        }
                                    </td>
                                })
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}