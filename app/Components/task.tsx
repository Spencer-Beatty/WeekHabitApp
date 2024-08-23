import { useEffect, useRef, useState } from "react";
import { Animated, Text, StyleSheet, View, LayoutAnimation } from "react-native";
import CircleButton from "./circleButton";
import * as Progress from 'react-native-progress';


function Task( props: any){
    
    const progressOpacity = useRef(new Animated.Value(1)).current
    const scale = useRef(new Animated.Value(1)).current
    
    const [shrinkView,setShrinkView] = useState(1)
    const [isCurrentTask, setIsCurrentTask] = useState(props.isCurrentTask)
    const [inTransition, setInTranstion] = useState(props.isCurrentTask)
    
    
    const bgCol = props.bgCol

    const timeMargin = 40
    const [progress, setProgress] = useState(0.1)

    useEffect(() => {
        if(isCurrentTask){
            setInTranstion(isCurrentTask)
        }
    }, [isCurrentTask])


    function handleProgress(){
        setProgress(current => {
            if( current < 1){
                
                return current + 0.01
            }  else{
                Stage1();
                return 0.01
                
            }
        })
    }

    function Stage1(){
        //Stage 1 will reduce the progress bar in size and remove it as well as the button, then center the new elements
        //Setting up layout animation for stage 1 when task completes
         //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        LayoutAnimation.configureNext(
            {//duration:2000, create: {type: "spring", property: 'scaleY'},
                
                duration: 1000,
                
                create: { type: 'linear', property: 'opacity' },
                update: { type: 'spring', springDamping: 0.9 },
                delete: { type: 'linear', property: 'opacity' }
                
            }
        );
        const shrinkViewFunc = () => {
                const interval = setInterval(() => {
                    setShrinkView(current => {
                        //if (current-0.1>0){return current-0.1 }else{ return 0}
                        function inc(){
                            return(0.025)
                        }
                        return current-inc()>0 ? current-inc() : 0
                    })
                }, 10)

                setTimeout(() => { hp3(); setShrinkView(1); clearInterval(interval);}, 3000)
        }   
        Animated.timing(scale, {toValue: 0, useNativeDriver: true}).start(({finished}) => {
            setIsCurrentTask(false)
            shrinkViewFunc();
        });
       
       
        
       
    }

    function hp3(){
        setIsCurrentTask(true)
        
        
        //Animated.timing(progressOpacity, {toValue: 1, useNativeDriver: false}).start()
        Animated.timing(scale, {toValue: 1, useNativeDriver: true}).start()
    }

    return( <View
        style={[styles.task, {backgroundColor:bgCol}, inTransition?{height:5, flex:shrinkView}:{height:100}]}>
        <View style={[styles.taskType]}>
            <View style={[styles.taskHeaderView,isCurrentTask?{ alignItems: 'flex-end'}: { alignItems: 'center'}]}>

            <Text style={styles.taskHeader}>Meeting</Text>
            </View>
            {isCurrentTask // inTransition
            ? 
            <Animated.View style={{flex:1, opacity:progressOpacity, transform:  [{ scale }] }}>
            <CircleButton handleProgress={handleProgress} hp3={hp3}/>
            </Animated.View>: <View/> //<View style={inTransition?{flex:shrinkView}:{flex:0}}/>
            }
        </View>


        {isCurrentTask ? <Animated.View style={[styles.progress, {opacity: progressOpacity, transform: [{ scale }] }]}>
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
    taskHeaderView:{
        flex: 1,
        //backgroundColor: 'red',
        justifyContent:'flex-end'
        
    },
    taskHeader:{
        
        //backgroundColor:'yellow',
        bottom: 10,
        
        
        //marginTop: 25,
        
        fontSize: 42,
        
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