import * as THREE from 'three';
import React from 'react';

import { makeGraphics } from '../Model';
import { useSelector } from 'react-redux';
import { selectValues } from '../store/slices/valuesSlice';
import { selectGraphSelected, selectToggleLight, selectTogglePoints, selectToggleLines } from '../store/slices/toggleSlice';


export const Line3d = () => {

    const values = useSelector(selectValues);
    const nameGraphSelected = useSelector(selectGraphSelected);
    const light = useSelector(selectToggleLight);
    const points = useSelector(selectTogglePoints);
    const line = useSelector(selectToggleLines);
    const [graph] = makeGraphics(values);
    const index =  graph.findIndex(item => item.name===nameGraphSelected);
    const pointsLine = [];

    try {
        graph[index].data.map(item=>pointsLine.push(new THREE.Vector3(item.x, item.z, item.y)));
    } catch (error) {
       
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(pointsLine);

    const sphereGeometry = new THREE.SphereGeometry(0.08, 6, 6);
    const colorSphere = light?{ color: 0x0058ff }:{ color: 0xffffff };
    const sphereMaterial = new THREE.MeshBasicMaterial(colorSphere);

    const pointsGraph = pointsLine.map((vertex) => {
        return (
          <mesh geometry={sphereGeometry} material={sphereMaterial} position={vertex} key={vertex.x + '-' + vertex.y + '-' + vertex.z} />
        );
      });

    return (
        <mesh >
            {line&&
                <line geometry={lineGeometry}>
                <lineBasicMaterial attach="material" color={light?"#0058FF":"white"} linewidth={1} linecap={'round'} linejoin={'round'} />
                </line>
            }
            {points?<group>
                {pointsGraph}
            </group>:<></>}
        </mesh>
    )
}