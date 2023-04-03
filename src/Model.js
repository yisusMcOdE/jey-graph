{/*---------------EQUATION VARIABLES---------------*/}
export const variablesInit = [
    {   
        name: "step",
        value: 0.125,
        locked:true 
    },
    {   
        name: "tiempo",
        value: 100,
        locked:false 
    },
    {   
        name: "x0",
        value: 2,
        locked:false 
    },
    {   
        name: "y0",
        value: 1,
        locked:false 
    },
    {   
        name: "alpha",
        value: 0.2,
        locked:false 
    },
    {   
        name: "betha",
        value: 0.27,
        locked:false 
    },
    {   
        name: "delta",
        value: 0.2,
        locked:false 
    },
    {   
        name: "gama",
        value: 0.33,
        locked:false }
]


{/*---------------VALUES SYSTEM---------------*/}
export const valuesInit = {
    xValues : [] ,
    yValues : [] ,
    combinacion : []
}


{/*---------------SIMULATOR FUNCTION---------------*/}
{/*------------WRITE YOUR EQUATION HERE--------------*/}
export const simulator = (variables) => {
    let combinacionValues = []
    let xValues = [];
    let x = variables.x0;
    xValues.push( { x : 0, y : x } );

    let yValues = [];
    let y = variables.y0;
    yValues.push( { x : 0, y : y } );

    combinacionValues.push({x : x, y : y});

    for (let t = variables.step; t <= variables.tiempo; t += variables.step) {

        let xAnt = x;
        let yAnt = y;

        x = xAnt+(((variables.alpha*xAnt)-(variables.betha*xAnt*yAnt))*variables.step);
        xValues.push({x : t, y:x});

        y = yAnt+(((variables.gama*xAnt*yAnt)-(variables.delta*yAnt))*variables.step);
        yValues.push({x : t, y:y});


        combinacionValues.push({x : x, y : y});

    }


    return {xValues : xValues, yValues : yValues, combinacion : combinacionValues};
}


{/*---------------YOUR GRAPHICS---------------*/}

export const makeGraphics = (values=valuesInit) => {

    const graphs=[
        {
            type : "2D",
            name : "Lotka",
            datasets : [
                {
                    type:"scatter", /*<---REQUIRED--*/
                    label: "presa",
                    data: [...values.xValues]
                },
                {
                    type:"scatter", /*<---REQUIRED--*/
                    label: "predator",
                    data: [...values.yValues]
                }
            ]
        },{
            type : "2D",
            name : "Lotka relacion",
            datasets : [
                {
                    type:"scatter", /*<---REQUIRED--*/
                    label: "ambos",
                    data: [...values.combinacion]
                }
            ]
        }
    ]

    const names = graphs.map(item=>{return item.name});
    return [graphs, names];
}
