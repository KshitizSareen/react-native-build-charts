import Svg, {Path} from 'react-native-svg';

import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';

export const PieChart = (props) => {

    const [data,setData]= useState([{
      percent: 0,
      color: "",
      x: 0,
      v: 0
    }]);
    const [size, setSize] = useState(0);
    const [index,setIndex]= useState(0);

    let colorsSet=new Set();
    useEffect(()=>{
        calculateData(props.data);
        setSize(props.size);
    },[props.data,props.size]);

    function calculateData(data)
    {
        let calculatedData=[];
        let totalY=0;
        data.map(value=>{
            totalY+=value.y;
        })
        data.map(value=>{
            calculatedData.push({
                percent: value.y/totalY,
                color: getRandomColor(),
                x: value.x,
                y: value.y
            })
        })
        setData(calculatedData);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        while(1)
        {
            var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        if(!colorsSet.has(color))
        {
            break;
        }
    }
    colorsSet.add(color);
        return color;
      }
  function slice() {


    //option 2  Different size pieces
    // const numberOfSlice = 6; //number for slice

    // const colorArr = ['red', 'green', 'yellow', 'blue']; //color the slice
    // for (let i = 0; i < numberOfSlice; i++) {
    //   slices.push({percent: 1 / numberOfSlice, color: colorArr[i] || 'gray'});
    // }

    let cumulativePercent = 0;

    function getCoordinatesForPercent(percent) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    }

    let arr = [];
    arr = data.map((slice,yIndex) => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += slice.percent;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
      if(!isNaN(startX) && !isNaN(startY) && !isNaN(endX) && !isNaN(endY))
      {
      const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        'L 0 0', // Line
      ].join(' ');
      return <Path d={pathData} fill={slice.color} key={pathData} onPress={()=>{
          console.log("Pressed");
          setIndex(yIndex);
        }}/>;
      }
    });
    return arr;
  }

    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {alignItems: 'center', justifyContent: 'center',flexDirection:'row'},
        ]}>
          <View style={{
            marginRight: '1%'
          }}>
            <Text style={{
                alignSelf: 'center',
                width: 0.3*size
            }}>{"x: "+data[index].x}</Text>
            <Text style={{
                alignSelf: 'center',
                width: 0.3*size
            }}>{"y: "+data[index].y}</Text>
            <Text style={{
                alignSelf: 'center',
                width: 0.3*size
            }}>{"percent: "+ data[index].percent ?  data[index].percent.toFixed(2)*100+"%" : ""}</Text>
            </View>
        <Svg
          height={size}
          width={size}
          viewBox="-1 -1 2 2"
          style={{transform: [{rotate: '-90deg'}]}}>
          {slice()}
        </Svg>
        <View style={{
                height: size,
                marginLeft: '1%',
            }}>
            <FlatList data={data} renderItem={(item)=>{
            return(
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: 0.7*size,
                    marginBottom: 0.01*size
                }}>
                    <View style={{
                        backgroundColor: item.item.color,
                        width: 0.1*size,
                        height: 0.1*size,
                    }}/>
                    <Text style={{
                      width: 0.5*size
                    }}>{"x: "+item.item.x+", y: "+item.item.y}</Text>
                </View>
            )
        }}/>
        </View>
      </View>
    );
}