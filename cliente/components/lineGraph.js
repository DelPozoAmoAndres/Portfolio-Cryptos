import React from 'react'
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import { getTotal } from '../services/balanceService';

export const LineGraph =(props)=> {
        const Shadow = ({ line }) => (
            <Path
                key={'shadow'}
                y={2}
                d={line}
                fill={'none'}
                strokeWidth={4}
                stroke={'rgba(0, 0, 0, 0)'}
            />
        )
        var data=props.data;
        data.forEach((element,index,array) => {
            array[index]=getTotal(element,props.currency) 
        });
        var color='rgb(0, 255, )'
        if(props.data.length>1 && props.data[props.data.length-1]<props.data[props.data.length-2])
            color='rgb(255, 0, 0)'
        console.log(data)
        return (
            <LineChart
                style={ { height: props.height,width:props.width } }
                data={ data }
                svg={{ stroke: color }}
                contentInset={ { top: 20, bottom: 20 } }
            >
                <Grid/>
                <Shadow/>
            </LineChart>
        )
    }