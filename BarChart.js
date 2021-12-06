import React,{ useEffect, useState} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export  const BarChart = (props)=>{

    const [width,setWidth] = useState(props.width);
    const [height,setHeight] = useState(props.height);
    const [data,setData] = useState(props.data);
    const [dataHorizontalLength,setDataHorizontalLength] = useState(props.data.length);
    const [yDataPoints,setyDataPoints] = useState([0]);
    const colors =['red','yellow','green', 'blue','orange','purple','cyan','magenta'];
    const [maxValue,setMaxValue] = useState(1);
    const [outputs,setOutput] = useState(1);
    const [indexx,setIndexx]= useState(0);
    const [indexy,setIndexy]= useState(0);
    useEffect(()=>{
        setWidth(props.width);
        setHeight(props.height);
        setData(props.data);
        let verticalPoints=[];
        let maxValue = 0;
        let outputs= 0;
        for(let i=0;i<props.data.length;i++)
        {
            for(let j=0;j<props.data[i].y.length;j++)
            {
                outputs+=1;
                maxValue=Math.max(maxValue,props.data[i].y[j]);
            }
        }
        setOutput(outputs);
        let range = 5;
        if(props.range!=undefined)
        {
            range=props.range;
        }
        setDataHorizontalLength(props.data.length);
        for(let i=0;i<=maxValue;i+=range)
        {
            verticalPoints.push(i);
        }
        setyDataPoints(verticalPoints);
        setMaxValue(maxValue+5);
    },[props.width, props.height, props.data,props.range]);

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
                                    //width: 0.03*width,
                                    //height: 0.8*height/dataVerticalLength,
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
                {
                    data.map((dataPoint,index)=>{
                        return(
                            <View style={{
                                width: 0.8*width/dataHorizontalLength,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                position: 'absolute',
                                bottom: 0,
                                left: (index)*0.8*width/dataHorizontalLength,
                                alignItems: 'flex-end',
                            }} key={index}>
                                {
                                    dataPoint.y.map((yValue,yindex)=>{
                                        return(
                                            <TouchableOpacity style={{
                                                width: 0.8*width/dataHorizontalLength/outputs,
                                                height: yValue*0.80*height/maxValue,
                                                backgroundColor: colors[(index+yindex)%8],
                                            }} onPress={()=>{
                                                setIndexx(index);
                                                setIndexy(yindex);
                                            }} key={yindex}/>

                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
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
            <Text style={{position: 'absolute',alignSelf: 'flex-end',right: 0.05*width,top:0.05*height}}>{"x : "+ data[indexx].x+" , "+"y : "+  data[indexx].y[indexy]}</Text>
        </View>
    )

}