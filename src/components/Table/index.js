import { selectToggleRound } from "../../store/slices/toggleSlice";
import { useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
export const Table = ({ values }) => {
  const round = useSelector(selectToggleRound);
  const keys = [];
  for (const key in values[0]) {
    keys.push(key);
  }
  
  const getTableStyles = (index) => {
    if (index % 2 === 0) {
      return {
        backgroundColor: "#f2f2f2",
      };
    }
    return {
      backgroundColor: "#fff",
    };
  }

  return (
        <List height={700} itemSize={35} width='100%' itemCount={values.length}>
          {({ index, style }) => (
            <div style={style}>
                <div  key={index} style={getTableStyles(index)}>
                    {keys.map((axis, id) => (
                        <td key={id}>
                            {round? `${axis}= ${values[index][axis].toFixed(3)}`: `${values[index].x}`}
                        </td>
                    ))}
                </div>
            </div>
            
          )}
        </List>
  );
};
