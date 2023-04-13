import React from 'react';
import { Chart } from 'react-chartjs-2'
import 'chart.js/auto';
import { selectValues } from '../store/slices/valuesSlice';
import { useSelector } from 'react-redux';
import { makeGraphics } from '../Model';
import { selectGraphSelected, selectTogglePoints, selectToggleTooltip, selectToggleLight, selectToggleLines } from '../store/slices/toggleSlice';

export const LineGraph = () => {

    const values = useSelector(selectValues);
    const nameGraphSelected = useSelector(selectGraphSelected);
    const lines = useSelector(selectToggleLines);
    const points = useSelector(selectTogglePoints);
    const tooltip = useSelector(selectToggleTooltip);
    const light = useSelector(selectToggleLight);

    const [graph] = makeGraphics(values);


    let graphSelected =  graph.findIndex(item=>item.name===nameGraphSelected);
    
    if(graphSelected === -1)
      graphSelected = 0

    graph[graphSelected].datasets.map(item=>item.type="scatter");

    const data = {
        datasets: (graph[graphSelected].datasets)
    };
    let options = {
        elements: {
          point:{
              radius: 4,
          }
        },
        showLine: true,
        plugins:{
          tooltip:{
            enabled : true
          }
        },
        scales: {
          x: {
            display: true,
            border: {color:"#828282"},
            grid: {
              display: true,
              color:"#828282"
            },
          },
          y: {
              display: true,
              border: {color:"#828282"},
              grid: {
                display: true,
                color:"#828282"
              },
          }
        }
    }
    if (!points){
      options.elements.point.radius = 0;
    }
    if (!tooltip){
      options.plugins.tooltip.enabled = false;
    }
    if(!lines){
      data.datasets.map(item=>{
        item.borderWidth = 0
      })
    }else{
      data.datasets.map(item=>{
        item.borderWidth = 3
      })
    }
    

    return(
        <div 
          className='lineGraph' 
          style={light?{backgroundColor:"white"}:{backgroundColor:"black"}}
        
        >
            <Chart type="bubble" data={data} options={options} />
        </div>
    )
}