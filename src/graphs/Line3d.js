import * as THREE from 'three';
import React from 'react';

import { makeGraphics } from '../Model';
import { useSelector } from 'react-redux';
import { selectValues } from '../features/valuesSlice';
import { selectGraphSelected } from '../features/toogleMenuSlice';


export const Line3d = () => {

    const values = useSelector(selectValues);
    const nameGraphSelected = useSelector(selectGraphSelected);
    const [graph] = makeGraphics(values);
    const index =  graph.findIndex(item => item.name===nameGraphSelected);
    const pointsLine = [];

    try {
        graph[index].data.map(item=>pointsLine.push(new THREE.Vector3(item.x, item.y, item.z)));
    } catch (error) {
       
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(pointsLine);

    return (
        <mesh >
            <line geometry={lineGeometry}>
            <lineBasicMaterial attach="material" color={'white'} linewidth={2} linecap={'round'} linejoin={'round'} />
            </line>
        </mesh>
    )
}