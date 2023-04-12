

{/*---------------EQUATION VARIABLES---------------*/}
export const variablesInit = [
    {   
        name: "step",
        value: 0.025,
        locked: true 
    },
    {   
        name: "tiempo",
        value: 100,
    },
    {
        name: "x0",
        value: 1
    },
    {
        name: "y0",
        value: 2
    },
    {
        name: "z0",
        value: 1
    },
    {
        name: "alfa",
        value: 0.398
    },
    {
        name: "beta",
        value: 2
    },
    {
        name: "gama",
        value: 4
    },
]


{/*---------------VALUES SYSTEM---------------*/}
export const valuesInit = {
    xy:[],
    yz:[],
    zx:[],
    xyz:[]
}


{/*---------------SIMULATOR FUNCTION---------------*/}
{/*------------WRITE YOUR EQUATION HERE--------------*/}
export const simulator = (variables) => {

    let xyValues = [];
    let yzValues = [];
    let zxValues = [];
    let xyzValues = [];

    let x  = variables.x0;
    let y  = variables.y0;
    let z  = variables.z0;

    xyValues.push( { x : x, y : y } );
    yzValues.push( { x : y, y : z } );
    zxValues.push( { x : z, y : x } );
    xyzValues.push( {x : x, y : y, z : z});

    for (let t = variables.step; t <= variables.tiempo; t += variables.step) {

        let xAnt=x;
        let yAnt=y;
        let zAnt=z;

        x += ((-yAnt-zAnt)*variables.step);
        y += ((xAnt+(variables.alfa*yAnt))*variables.step);
        z += ((variables.beta-(variables.gama*zAnt)+(xAnt*zAnt))*variables.step);
        
        xyValues.push( { x : x, y : y } );
        yzValues.push( { x : y, y : z } );
        zxValues.push( { x : z, y : x } );
        xyzValues.push( {x : x, y : y, z : z});

    }
    return {
        xy : xyValues,
        yz : yzValues,
        zx : zxValues,
        xyz : xyzValues
    };
}


{/*---------------YOUR GRAPHICS---------------*/}

export const makeGraphics = (values=valuesInit) => {

    const graphs=[
        {
            type : "2D",
            name : "XY",
            datasets : [
                {
                    type:"scatter", /*<---REQUIRED--*/
                    label: "X-Y",
                    data: [...values.xy]
                }
            ]
        },
        {
            type : "2D",
            name : "YZ",
            datasets : [
                {
                    type:"scatter", /*<---REQUIRED--*/
                    label: "Y-Z",
                    data: [...values.yz]
                }
            ]
        },
        {
            type : "2D",
            name : "ZX",
            datasets : [
                {
                    type:"scatter", /*<---REQUIRED--*/
                    label: "Z-X",
                    data: [...values.zx]
                }
            ]
        },
        {
            type : "3D",
            name : "XYZ",
            data: [...values.xyz]
        }
    ]

    const names = graphs.map(item=>{return item.name});
    return [graphs, names];
}