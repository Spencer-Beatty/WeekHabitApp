import { useEffect, useRef, useState } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";
import CircleButton from "./circleButton";
import * as Progress from 'react-native-progress';


function Task( props: any){
    
    const progressOpacity = useRef(new Animated.Value(1)).current

    const isCurrentTask = props.isCurrentTask
    const bgCol = props.bgCol

    const timeMargin = 40
    const [progress, setProgress] = useState(0.1)

    useEffect(() => {
        
    }, [progress])


    function handleProgress(){
        setProgress(current => {
            if( current < 1.2){
                
                return current + 0.01
            }  else{
                Animated.timing(progressOpacity, {toValue: 0, useNativeDriver: false}).start(({finished}) => {
                    hp2();
                });
                return 0.01
                
            }
        })
    }

    function hp2(){
        Animated.timing(progressOpacity, {toValue: 1, useNativeDriver: false}).start()
    }

    return( <View
    style={[styles.task, {backgroundColor:bgCol}]}>
        <View style={styles.taskType}>
            <Text style={[styles.taskHeader, isCurrentTask?{marginLeft:30}:{marginLeft:0}]}>Meeting</Text>
            {isCurrentTask ? 
            <CircleButton handleProgress={handleProgress} hp2={hp2}/>: <View></View> }
        </View>


        {isCurrentTask ? <Animated.View style={[styles.progress, {opacity: progressOpacity}]}>
            <Progress.Bar style={[{alignSelf:'flex-end'}]} progress={progress} width={320} height={20} color="black" />
            {/*<Progress.Pie progress={0.3} size={50} color="black"/>*/}
        </Animated.View>: <></>}


        <View style={styles.timeLine}>
            <View style={[styles.timeElement,  { marginLeft: timeMargin}]}>
                <Text style={[styles.timeNumber,{textAlign: "left"}]}>
                    3:00 PM
                </Text>
                <Text style={styles.timeDesignate}>
                    Start
                </Text>
            </View>
            <View>
                <Text style={styles.timeDuration}>
                    {"(30 MINS)"}
                </Text>
            </View>
            <View style={[styles.timeElement,  { marginRight: timeMargin, alignItems: 'flex-end'}]}>
                <Text style={styles.timeNumber}>
                    3:30 PM
                </Text>
                
                <Text style={styles.timeDesignate}>
                    End
                </Text>
            </View>
        </View>
    </View>);
}

export default Task;

const styles = StyleSheet.create({
    task: {
       
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: 0.8,
    },
    taskType: {
       
        flex: 1,
        flexDirection: 'row',
    },
    taskHeader:{
        
        textAlign: 'center',
        marginTop: 25,
        
        fontSize: 42,
        flex: 1,
    },
    buttonView:{
        backgroundColor: 'white',
        
        fontSize: 50,
        textAlign: 'center',
        marginTop: 20,
        marginRight: 0,    
        flex: 1
    },
    buttonStyle: {
        backgroundColor: 'red'
    },
    progress: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'flex-end'
        
    },
    timeLine: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        


    },
    timeElement:{
        
        flexDirection: 'column'
    },
    timeNumber: {
        fontSize: 23
    
    },
    timeDesignate: {
        fontSize: 18
    },
    timeDuration:{
        fontSize: 16
    }


})