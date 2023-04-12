import { useSelector, useDispatch } from "react-redux";
import { selectToogleValues, selectToogleTable, selectToogleMenuGraph, selectGraphSelected, selectToogleLight } from "../features/toogleSlice";
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
    const light = useSelector(selectToogleLight);

    const type = graphs.find(item=>item.name===toogleGraphSelected)!==undefined ? 
                    graphs.find(item=>item.name===toogleGraphSelected).type : 
                    "";

    const handleToogleTable = () => {
        const action = {
            type : "toogle/table"
        }
        dispatcher(action);
    }

    const handleToogleMenuGraph = () => {
        const action = {
            type : "toogle/menuGraph"
        }
        dispatcher(action);
    }

    const handleSelectGraph = ({target}) => {
        const action = {
            type : "toogle/graphSelected",
            payload : target.value
        }
        dispatcher(action);
    }

    const handleToogleLines = (e) => {
        const action = {
            type : "toogle/lines"
        }
        dispatcher(action);
    }

    const handleTooglePoints = (e) => {
        const action = {
            type : "toogle/points"
        }
        dispatcher(action);
    }

    const handleToogleTooltip = (e) => {
        const action = {
            type : "toogle/tooltip"
        }
        dispatcher(action);
    }

    const handleToogleLight = (e) => {
        const action = {
            type : "toogle/light"
        }
        dispatcher(action);
    }

    useEffect(()=>{
        const action = {
            type : "toogle/graphSelected",
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
                    <label>Lines?</label>
                    <input type={"checkbox"} onChange={handleToogleLines} defaultChecked/>
                    <label>Points?</label>
                    <input type={"checkbox"} onChange={handleTooglePoints} />
                    <label>Tooltip?</label>
                    <input type={"checkbox"} onChange={handleToogleTooltip} defaultChecked/>
                    <label>Light mode?</label>
                    <input type={"checkbox"} onChange={handleToogleLight}/>
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
                <Canvas camera={ { fov: 75, near: 0.1, far: 1000, position: [10, 10, 10] } }>
                    <color attach="background" args={light?["white"]:["black"]} />
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