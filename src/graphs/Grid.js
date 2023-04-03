import React from 'react'
import * as THREE from 'three'

export const Grid = () => {


    const pointsX = []
    pointsX.push(new THREE.Vector3(0, 0, 0))
    pointsX.push(new THREE.Vector3(5, 0, 0))
    const lineGeometryX = new THREE.BufferGeometry().setFromPoints(pointsX)


    const pointsY = []
    pointsY.push(new THREE.Vector3(0, 0, 0))
    pointsY.push(new THREE.Vector3(0, 0, 5))
    const lineGeometryY = new THREE.BufferGeometry().setFromPoints(pointsY)


    const pointsZ = []
    pointsZ.push(new THREE.Vector3(0, 0, 0))
    pointsZ.push(new THREE.Vector3(0, 5, 0))
    const lineGeometryZ = new THREE.BufferGeometry().setFromPoints(pointsZ)


    return (
        <>
            {/*-------------GRIDS-------------*/}
            <mesh
                position={[0,-15,0]}
            >
                <gridHelper args={[30, 30]}/>
            </mesh>
            <mesh
                position={[0,0,-15]}
                rotation={[Math.PI / 2,0,0]}
            >
                <gridHelper args={[30, 30]}/>
            </mesh>
            <mesh
                position={[-15,0,0]}
                rotation={[0,0,Math.PI / 2]}
            >
                <gridHelper args={[30, 30]}/>
            </mesh>




            {/*-------------Lines-------------*/}
            <mesh >
                <line geometry={lineGeometryX}>
                <lineBasicMaterial attach="material" color={'#7B0000'} linewidth={2} linecap={'round'} linejoin={'round'} />
                </line>
            </mesh>


            <mesh >
                <line geometry={lineGeometryY}>
                <lineBasicMaterial attach="material" color={'#007B00'} linewidth={2} linecap={'round'} linejoin={'round'} />
                </line>
            </mesh>


            <mesh >
                <line geometry={lineGeometryZ}>
                <lineBasicMaterial attach="material" color={'#00007B'} linewidth={2} linecap={'round'} linejoin={'round'} />
                </line>
            </mesh>




            {/*-------------Cones-------------*/}
            <mesh
                position={[5,0,0]}
                rotation={[0,0,-Math.PI / 2]}
            >
            <coneGeometry attach="geometry" args={[0.2,1,20]}/>
            <meshLambertMaterial attach="material" color="#7B0000" />
            </mesh>
            <mesh
                position={[0,0,5]}
                rotation={[Math.PI / 2,0,0]}
            >
            <coneGeometry attach="geometry" args={[0.2,1,20]}/>
            <meshLambertMaterial attach="material" color="#007B00" />
            </mesh>
            <mesh
                position={[0,5,0]}
                rotation={[0,Math.PI / 2,0]}
            >
            <coneGeometry attach="geometry" args={[0.2,1,20]}/>
            <meshLambertMaterial attach="material" color="#00007B" />
            </mesh>
        </>
    )
}