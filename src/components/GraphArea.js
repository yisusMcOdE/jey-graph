import { useSelector, useDispatch } from "react-redux";
import { selectToggleValues, selectToggleTable, selectToggleMenuGraph, selectGraphSelected, selectToggleLight } from "../store/slices/toggleSlice";
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
    const toggleValue = useSelector(selectToggleValues);
    const toggleTable = useSelector(selectToggleTable);
    const toggleMenu = useSelector(selectToggleMenuGraph);
    const toggleGraphSelected = useSelector(selectGraphSelected);
    const light = useSelector(selectToggleLight);

    const type = graphs.find(item=>item.name===toggleGraphSelected)!==undefined ? 
                    graphs.find(item=>item.name===toggleGraphSelected).type : 
                    "";

    const handleToggleTable = () => {
        const action = {
            type : "toggle/table"
        }
        dispatcher(action);
    }

    const handleToggleMenuGraph = () => {
        const action = {
            type : "toggle/menuGraph"
        }
        dispatcher(action);
    }

    const handleSelectGraph = ({target}) => {
        const action = {
            type : "toggle/graphSelected",
            payload : target.value
        }
        dispatcher(action);
    }

    const handleToggleLines = (e) => {
        const action = {
            type : "toggle/lines"
        }
        dispatcher(action);
    }

    const handleTogglePoints = (e) => {
        const action = {
            type : "toggle/points"
        }
        dispatcher(action);
    }

    const handleToggleTooltip = (e) => {
        const action = {
            type : "toggle/tooltip"
        }
        dispatcher(action);
    }

    const handleToggleLight = (e) => {
        const action = {
            type : "toggle/light"
        }
        dispatcher(action);
    }

    useEffect(()=>{
        const action = {
            type : "toggle/graphSelected",
            payload : names[0]
        }
        dispatcher(action);
    },[])

    const widthGraph = `${65 + (!toggleValue ? 15 : 0) + (!toggleTable? 20 : 0)}vw`;
    return (
        <div 
          className="graphArea"
          style={{width:widthGraph}}
        >

            {/*-----------Menu Graph-----------*/}
            <div className="containerMenuGraph">
                <div 
                    className={!toggleMenu?"buttonMenuGraph":"buttonMenuGraph open"}
                    onClick={handleToggleMenuGraph}
                >
                    Options
                </div>
                <div className={!toggleMenu?"optionsContainer":"optionsContainer open"}>
                    <label>Select your graph</label>
                    <select onChange={handleSelectGraph}>
                        {names.map( item => <option key={item} value={item}> {item} </option>)}
                    </select>
                    <label>Lines?</label>
                    <input type={"checkbox"} onChange={handleToggleLines} defaultChecked/>
                    <label>Points?</label>
                    <input type={"checkbox"} onChange={handleTogglePoints} />
                    <label>Tooltip?</label>
                    <input type={"checkbox"} onChange={handleToggleTooltip} defaultChecked/>
                    <label>Light mode?</label>
                    <input type={"checkbox"} onChange={handleToggleLight} defaultChecked/>
                </div>
            </div>

            {/*-----------Button Data Table-----------*/}
            <div 
                className={!toggleTable?"buttonTable":"buttonTable open"} 
                onClick={handleToggleTable}
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