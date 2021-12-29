import React,{useContext} from 'react'
import {View,StyleSheet} from 'react-native'
import { getTotal } from '../services/BalanceService';
import { Chart, Line, Area, Tooltip, VerticalAxis } from 'react-native-responsive-linechart'
import { ThemeContext } from '../theme/theme-context';

const clone = (items) => items.map(item => (Array.isArray(item) ? clone(item) : item));

export const LineGraph = (props) => {
    const { theme} = useContext(ThemeContext);
    //GetTotalAmount
    var data = clone(props.data);
    data.forEach((element, index, array) => {
        array[index] = {
            x: index,
            y: getTotal(element, props.currency)

        }
    });
    //Config colors
    ////Default green color
    var color = theme.green
    ////If the actual value is lower than the previous set color red
    if (data.length > 1 && data[data.length - 1]["y"] < data[data.length - 2]["y"])
        color = theme.red
    ////Config length of data
    if (data.length > 30) {
        var data1 = []
        let count = 0;
        for (var i = data.length - 1; i > data.length - 30; i--) {
            data1[count - 29] = data[i];
            count++;
        }
        data = data1;
    }
    //Show data
    console.log(data)
    return (
        //If there are any data
        (data.length>0)?
        <Chart style={styles.chart}
            xDomain={{ min: 0, max: data.length - 1 }}
            yDomain={{ min: getMinY(data), max: getMaxY(data) }}
            data={data}
            disableTouch={true}
            >
            <Area theme={{ gradient: { from: { color: color }, to: { color: theme.background, opacity: 0.2 } } }} />
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

const styles = StyleSheet.create({
 chart:{
    height: "100%", width: '100%'
 }
})