import React from 'react';
import { Chart } from 'react-chartjs-2'
import 'chart.js/auto';
import { selectValues } from '../features/valuesSlice';
import { useSelector } from 'react-redux';
import { makeGraphics } from '../Model';
import { selectGraphSelected } from '../features/toogleMenuSlice';

export const LineGraph = () => {

    const values = useSelector(selectValues);
    const nameGraphSelected = useSelector(selectGraphSelected);
    const [graph] = makeGraphics(values);

    let graphSelected =  graph.findIndex(item=>item.name===nameGraphSelected);
    if(graphSelected === -1)
      graphSelected = 0


    const data = {
        datasets: (graph[graphSelected].datasets)
    };
    const options = {
        elements: {
          point:{
              radius: 3
          }
        },
        showLine: true,
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
    

    return(
        <div className='lineGraph'>
            <Chart type="bubble" data={data} options={options} />
        </div>
    )
}