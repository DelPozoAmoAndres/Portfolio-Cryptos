import React from 'react'
import {View} from 'react-native'
import { getTotal } from '../services/balanceService';
import { Chart, Line, Area, Tooltip, VerticalAxis } from 'react-native-responsive-linechart'


export const LineGraph = (props) => {
    const clone = (items) => items.map(item => (Array.isArray(item) ? clone(item) : item));
    var data = clone(props.data);
    data.forEach((element, index, array) => {
        array[index] = {
            x: index,
            y: getTotal(element, props.currency)

        }
    });
    var color = 'rgb(0,181,137)'
    if (data.length > 1 && data[data.length - 1]["y"] < data[data.length - 2]["y"])
        color = 'rgb(252,68,34)'
    if (data.length > 30) {
        var data1 = []
        let count = 0;
        for (var i = data.length - 1; i > data.length - 30; i--) {
            data1[count - 29] = data[i];
            count++;
        }
        data = data1;
    }

    console.log(data)
    return (
        (data.length>0)?
        <Chart style={{ height: "100%", width: '100%' }}
            xDomain={{ min: 0, max: data.length - 1 }}
            yDomain={{ min: getMinY(data), max: getMaxY(data) }}
            data={data}
            disableTouch={true}
            >
            <Area theme={{ gradient: { from: { color: color }, to: { color: color, opacity: 0.2 } } }} />
            <Line theme={{ stroke: { color: color, width: 1 } }} />
        </Chart>:<View/>
    )
}

const getMaxY = (data) => {
    var max = 0
    for (var index in data) {
        if (data[index]["y"] > max)
            max = data[index]["y"]
    }
    return max;
}

const getMinY = (data) => {
    var min = Infinity
    for (var index in data) {
        if (data[index]["y"] < min)
            min = data[index]["y"]
    }
    return min;
}