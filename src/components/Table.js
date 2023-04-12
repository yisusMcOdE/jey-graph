import { selectToogleRound } from "../features/toogleSlice";
import { useSelector } from "react-redux";

export const Table = ({values}) => {

    const round = useSelector(selectToogleRound);
    const keys = [];
    for (const key in values[0]) {
        keys.push(key);
    }
    console.log(keys);

    return (
        <table style={round?{alignSelf:"center"}:{alignSelf:"flex-start"}}>
            <tr>
                {
                    keys.map(item=><th>{item.toUpperCase()}</th>)
                }
            </tr>
            {
                values.map((item,index)=>{
                    let style={}
                    if(index%2===0){
                        style={backgroundColor:"#B6B6B6"}
                    }
                    return <tr style={style}>
                        {
                            keys.map((axis,index)=>{
                                return <td>
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
        </table>
    )
}