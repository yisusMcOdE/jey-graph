

{/*---------------EQUATION VARIABLES---------------*/}
export const variablesInit = [
    /* 
    Array que almacena cada variable del modelo en objetos separados.

        {
            name    :   <STRING>,   REQUERIDO               "Nombre De Variable"
            value   :   <NUMBER>,   REQUERIDO               "Valor Numerico de la Variable"
            step    :   <NUMBER>,   ( 0.1 por defecto )     "Valor de incremento ó decremento"
            min     :   <NUMBER>,   ( 0 por defecto )       "Valor minimo que puede tomar"
            max     :   <NUMBER>,   ( 100 por defecto )     "Valor maximo que puede tomar"
            locked  :   <BOOLEAN>   ( false por defecto )   "Define si la variable puede o no cambiar"
        }
    */
    {   
        name: "step",
        value: 0.58
    },
    {   
        name: "tiempo",
        value: 100,
        min:0,
        max:250,
        step: 5
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


{/*---------------SYSTEM VALUES---------------*/}
export const valuesInit = {
    /*
        -   Objeto que almacena todos los puntos de un determinado grafico en un array.
        -   Los graficos que desea generar deben ser almacenadas como propiedades del objeto 
            valuesInit asignandole un array vacio como inicio.
                                "NombreDeGrafico" : []
        -   Los puntos almacenados deben tener la siguiente estructura
            { x : <NUMBER>, y : <NUMBER> }  --> Para graficos 2d
            { x : <NUMBER>, y : <NUMBER>, z : <NUMBER> }  --> Para graficos 3d
    */
    xy : [],
    yz : [],
    zx : [],
    xyz : []
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

    /*
        - Dentro del array graphs se almacena toda la configuracion para los graficos.
        - Todos los puntos ya calculados se encuentran almacenados en la variale values
        - Cada objeto representa un grafico distinto que podra ser seleccionado en la aplicacion mediante [Options > Select your graph]
            {
                type :      <"2D"/"3D">                                 "Define el tipo de grafico que utilizara 2d o 3d"
                name :      <STRING>                                    "Nombre del grafico"
                datasets :  <ARRAY>         "SOLO PARA GRAFICOS 2D"     "Almacena como objetos cada conjunto de valores que formaran parte de un solo grafico"
                data :      <ARRAY>         "SOLO PARA GRAFICOS 3D"     "Almacena todos los puntos3d de un solo valor que sera graficado
                                                                        (Se recomienda utilizar el operador spread con la variable values)"
            }
        - Cada element del array datasets debe ser un objeto con la siguiente estructura:
            {
                label :     <STRING>        "Nombre que representara al conjunto de puntos"
                data :      <ARRAY>         "Almacena todos los respectivos puntos calculados 
                                            (Se recomienda utilizar el operador spread con la variable values)" 
            }
    */

    const graphs=[
        {
            type : "2D",
            name : "XY",
            datasets : [
                {
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