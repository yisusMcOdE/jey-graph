{/*---------------------------EQUATION VARIABLES---------------------------*/}
export const variablesInit = [
    {   
        name: "step",       /*Nombre de variable*/                          /*<---REQUIRED--*/
        value: 1,           /*Valor de variable*/                           /*<---REQUIRED--*/
        increment : 1,      /*Valor de incremento mediante scroll o keyUp/keyDown   */         /*<---OPTIONAL--*/
        locked: true        /*Inhabilitar/habilitar cambios*/               /*<---OPTIONAL--*/
    }
]





{/*---------------------------VALUES SYSTEM---------------------------*/}
export const valuesInit = { 
    temperatura : [],
    temperatura_B : []
}                           /*Valores Graficables*/                         /*<---REQUIRED--*/





{/*---------------------------SIMULATOR FUNCTION---------------------------*/}


export const simulator = (variables) => {

    let temperaturaValues = [];
    let temperatura_B_Values = [];
    let temp = variables.t0;
    temperaturaValues.push(

        /*  
            Todos los datos almacenados deben tener la misma estructura de objeto
             - Para graficos 2D con las llaves "x" - "y" 
             - Para graficos 3D con las llaves "x" - "y" - "z"  
        */  
        { 
            x : 0, 
            y : temp 
        }       
    );
    temperatura_B_Values.push( 
        { 
            x : temp, 
            y : 0
        } 
    );
    for (let t = variables.step; t <= variables.tiempo; t += variables.step) {

        {/*------------WRITE YOUR EQUATION HERE--------------*/}
        temp += (((variables.objetivo-temp)*variables.k)*variables.step);

        temperaturaValues.push(
            {
                x : t, 
                y:temp
            }
        );
        temperatura_B_Values.push( 
            { 
                x : temp, 
                y : t
            }
        );
    }


    /*Retornar siempre un objeto similar a valuesInit pero con los datos agregados respectivamente*/
    return {
        temperatura : temperaturaValues, 
        temperatura_B : temperatura_B_Values
    };
}





{/*---------------------------YOUR GRAPHICS---------------------------*/}

export const makeGraphics = (values=valuesInit) => {

    const graphs=[

        /*
            Estructura para grafico en 2D el cual permite juntar dos o mas valores estudiados
            con el fin de persibir la relacion entre estos a travez de un mismo tiempo
        */
        {
            type : "2D",
            name : "Poblacion",
            datasets : [
                {
                    type:"scatter", 
                    label: "temperatura",
                    data: [...values.temperatura]
                }
            ]
        },{
            type : "2D",
            name : "PoblacionAlterna",
            datasets : [
                {
                    type:"scatter", 
                    label: "temperaturaAlterna",
                    data: [...values.temperatura_B]
                }
            ]
        },
        /* 
            Estructura para graficos en 3D
        */
        {
            type : "3D",
            name : "XYZ",
            data: [...values.xyz]
        }
    ]

    
    const names = graphs.map(item=>{return item.name});
    return [graphs, names];
}
