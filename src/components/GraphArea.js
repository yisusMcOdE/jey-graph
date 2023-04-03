import { useSelector, useDispatch } from "react-redux";
import { selectToogleValues, selectToogleTable, selectToogleMenuGraph, selectGraphSelected } from "../features/toogleMenuSlice";
import { LineGraph } from "../graphs/LineGraph.js";
import { makeGraphics } from "../Model";
import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Grid } from '../graphs/Grid.js';
import { Line3d } from "../graphs/Line3d";

export const GraphArea = () => {

    const [graphs,names] = makeGraphics();

    const dispatcher = useDispatch();
    const toogleValue = useSelector(selectToogleValues);
    const toogleTable = useSelector(selectToogleTable);
    const toogleMenu = useSelector(selectToogleMenuGraph);
    const toogleGraphSelected = useSelector(selectGraphSelected);

    const type = graphs.find(item=>item.name===toogleGraphSelected)!==undefined ? 
                    graphs.find(item=>item.name===toogleGraphSelected).type : 
                    "";

    const handleToogleTable = () => {
        const action = {
            type : "toogleMenu/table"
        }
        dispatcher(action);
    }

    const handleToogleMenuGraph = () => {
        const action = {
            type : "toogleMenu/menuGraph"
        }
        dispatcher(action);
    }

    const handleSelectGraph = ({target}) => {
        const action = {
            type : "toogleMenu/graphSelected",
            payload : target.value
        }
        dispatcher(action);
    }

    useEffect(()=>{
        const action = {
            type : "toogleMenu/graphSelected",
            payload : names[0]
        }
        dispatcher(action);
    },[])

    const widthGraph = `${65 + (!toogleValue ? 15 : 0) + (!toogleTable? 20 : 0)}vw`;
    return (
        <div 
          className="graphArea"
          style={{width:widthGraph}}
        >

            {/*-----------Menu Graph-----------*/}
            <div className="containerMenuGraph">
                <div 
                    className={!toogleMenu?"buttonMenuGraph":"buttonMenuGraph open"}
                    onClick={handleToogleMenuGraph}
                >
                    Options
                </div>
                <div className={!toogleMenu?"optionsContainer":"optionsContainer open"}>
                    <label>Select your graph</label>
                    <select onChange={handleSelectGraph}>
                        {names.map( item => <option key={item} value={item}> {item} </option>)}
                    </select>
                    <label>Points?</label>
                    <input type={"checkbox"}/>
                    <label>background black?</label>
                    <input type={"checkbox"}/>
                </div>
            </div>

            {/*-----------Button Data Table-----------*/}
            <div 
                className={!toogleTable?"buttonTable":"buttonTable open"} 
                onClick={handleToogleTable}
            >
                <i className="bi bi-table"></i>
            </div>

            { 
                type==='3D' ? 
                <Canvas camera={ { fov: 75, near: 0.1, far: 1000, position: [25, 10, 25] } }>
                    <color attach="background" args={["black"]} />
                    <ambientLight intensity={0.5} />
                    <OrbitControls/>
                    <directionalLight position={[-2, 5, 2]} intensity={1} />
                    <Grid/>
                    <Line3d/>
                </Canvas> 
                :
                <LineGraph/>

            }

        </div>
    )
}