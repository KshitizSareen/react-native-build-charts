import React,{useEffect, useState} from 'react';
import {  Text,  View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';


export  const LineChart = (props)=>{

    const [width,setWidth] = useState(props.width);
    const [height,setHeight] = useState(props.height);
    const [data,setData] = useState(props.data);
    const [dataHorizontalLength,setDataHorizontalLength] = useState(props.data.length);
    const [yDataPoints,setyDataPoints] = useState([0]);
    const [maxValue,setMaxValue] = useState(1);
    const [color,setColor] = useState('red');

    useEffect(()=>{
        setWidth(props.width);
        setHeight(props.height);
        setData(props.data);
        let verticalPoints=[];
        let maxValue = 0;
        let outputs= 0;
        for(let i=0;i<props.data.length;i++)
        {
            outputs+=1;
            maxValue=Math.max(maxValue,props.data[i].y);
        }
        let range = 5;
        if(props.range!=undefined)
        {
            range=props.range;
        }
        if(props.color!=undefined)
        {
            setColor(props.color);
        }
        setDataHorizontalLength(props.data.length);
        for(let i=0;i<=maxValue;i+=range)
        {
            verticalPoints.push(i);
        }
        setyDataPoints(verticalPoints);
        setMaxValue(maxValue+5);
    },[props.width, props.height, props.data,props.range,props.color]);

    return(

        <View style={{
            width: width,
            height: height,
        }}>
            <View style={{
                flexDirection: 'row',
                height: 0.8*height,
                position: 'absolute',
                top: 0.05*height,
                left:0.05*width
            }}>
                {
                    yDataPoints.map((dataPoint,index)=>{
                            return(
                                <View style={{
                                    position: 'absolute',
                                    height: dataPoint*0.8*height/maxValue,
                                    bottom: 0,
                                    right: 0,
                                    justifyContent: 'flex-start'
                                }} key={index}>
                                    <Text>{dataPoint} -</Text>
                                </View>
                            )
                        })
                    }
                <View style={{
                width: 1,
                backgroundColor: 'black',
                position: 'absolute',
                height:0.8*height
            }}/>
            <Svg style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center'
            }} height={0.8*height} width={0.8*width}>
                {
                    data.map((dataPoint,index)=>{
                        if(index<data.length-1)
                        {
                        return(
                            <Svg>
                            <Circle cx={((index)*0.8*width/dataHorizontalLength)+((0.8*width/dataHorizontalLength)/2)} cy={0.8*height-(dataPoint.y*( 0.8*height/maxValue))} r="2" fill="black"/>
                            <Line x1={((index)*0.8*width/dataHorizontalLength)+((0.8*width/dataHorizontalLength)/2)} y1={0.8*height-(dataPoint.y*( 0.8*height/maxValue))} x2={((index+1)*0.8*width/dataHorizontalLength)+((0.8*width/dataHorizontalLength)/2)} y2={0.8*height-(data[index+1].y*( 0.8*height/maxValue))} stroke={color} strokeWidth="1"/> 
                            </Svg>
                        )
                        }
                        else
                        {
                            return(
                                <Svg>
                                    <Circle cx={((index)*0.8*width/dataHorizontalLength)+((0.8*width/dataHorizontalLength)/2)} cy={0.8*height-(dataPoint.y*( 0.8*height/maxValue))} r="2" fill="black"/>
                                    </Svg>
                            )
                        }
                    })
}
            </Svg>
                </View>
            <View style={{
                width: 0.8*width,
                left: 0.05*width,
                position: 'absolute',
                top: 0.85*height
            }}>
            <View style={{
                height: 1,
                backgroundColor: 'black',
                position: 'absolute',
                width: 0.8*width
            }}/>
            <View style={{
                flexDirection: 'row',
                position: 'absolute'
            }}>
            {
                data.map((dataPoint,index)=>{
                    return(
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 0.8*width/dataHorizontalLength,
                            height: 0.05*height,
                            position: 'absolute',
                            left: (index)*0.8*width/dataHorizontalLength
                        }} key={index}>
                            <Text>|</Text>
                            <Text>{dataPoint.x}</Text>
                        </View>
                    )
                })
            }
            </View>
            </View>
        </View>
    )

}