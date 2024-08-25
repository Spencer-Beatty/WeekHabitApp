import { useEffect, useRef, useState } from "react";
import { Animated, Text, StyleSheet, View, LayoutAnimation } from "react-native";
import CircleButton from "./circleButton";
import * as Progress from 'react-native-progress';


function Task( props: any){

    const title = props.title
    const duration = props.duration

    //goofy type changer
    const fontList = ["Arial", "Helvetica", "Times New Roman", "Courier New", "Verdana", "Georgia", "Trebuchet MS", "Comic Sans MS", "Impact", "Lucida Console", "Palatino Linotype", "Tahoma", "Garamond", "Century Gothic", "Brush Script MT", "Candara", "Calibri", "Segoe UI", "Gill Sans", "Futura"]
    const [fontIndex, setFontIndex] = useState(0)
    
    const progressOpacity = useRef(new Animated.Value(0)).current
    const timeOpacity = useRef(new Animated.Value(1)).current
    const scale = useRef(new Animated.Value(0)).current
    
    const bgCol = props.bgCol

    const timeMargin = 40
    const [progress, setProgress] = useState(0.1)
    const [shrinkView, setLocalShrinkView] = useState(props.sv)
    const setShrinkView = props.ssv
    

    const [isCurrentTask, setIsCurrentTask] = useState(props.index === 0)

    const [inTransition, setInTranstion] = useState(props.isCurrentTask || props.inTransition)
    
   
    
   useEffect(() => {
    setLocalShrinkView(props.sv)
   },[props.sv])

  

    useEffect(()=>{
        console.log(props.index)
        setInTranstion(props.index === 3 )
        setIsCurrentTask(props.index === 0)
        if(props.index === 0){
            LayoutAnimation.configureNext(
                {//duration:2000, create: {type: "spring", property: 'scaleY'},
                    
                    duration: 1000,
                    
                    create: { type: 'linear', property: 'opacity' },
                    update: { type: 'spring', springDamping: 0.9 },
                    delete: { type: 'linear', property: 'opacity' }
                    
                }
            );
            Animated.timing(scale, {toValue: 1, duration:1000, useNativeDriver:true}).start()
            Animated.timing(progressOpacity, {toValue: 1, duration:1000, useNativeDriver:true}).start()
        }
        
    }, [props.index])
    
    

    useEffect(() => {
        if(isCurrentTask){
            
            setInTranstion(isCurrentTask)
           
        }
        
    }, [isCurrentTask])

    function getFontSize(size: 'small' | 'medium' | 'large'): number {
        const sizes: { [key: string]: number } = {
          small: 12,
          medium: 16,
          large: 25
        };
        
        return sizes[size] || sizes.medium;
    }

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

    function fillButtonOnPress(){
        const interval = setInterval(() =>{
            handleProgress()
        }, 10)

       setTimeout(() => {clearInterval(interval)},2000)
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
                let count = 0;

                const interval = setInterval(() => {
                    count++;
                    setShrinkView((current: number) => {
                        //if (current-0.1>0){return current-0.1 }else{ return 0}
                        
                        function inc(){
                            
                            if(count < 30){
                                return( -1 * 0.025 * (count /(count + count)))
                            }
                            return(  0.025 * (count + count)/count)
                        }
                        return current-inc()>0 ? current-inc() : 0
                    })
                }, 15)
                Animated.timing(timeOpacity, {toValue: 0, duration:1000, useNativeDriver:true}).start()
                //remove code
                /*const fontInterval = setInterval(() => {
                    setFontIndex((current: number) => {
                        //if (current-0.1>0){return current-0.1 }else{ return 0}
                        if(current + 1 < fontList.length){
                            return current + 1
                        }else{
                            return 0
                        }
                    })
                }, 50)*/

                setTimeout(() => { hp3(); setShrinkView(1);  clearInterval(interval); /*clearInterval(fontInterval);*/}, 3000)
        }   
        Animated.timing(scale, {toValue: 0, useNativeDriver: true}).start(({finished}) => {
            setIsCurrentTask(false)
            shrinkViewFunc();
        });
       
       
        
       
    }

    function hp3(){

        //This is where the task should be sent to the graveyard and the next task promoted to current.
        props.popUpcoming()
        //setIsCurrentTask(true)
        
        
        //Animated.timing(progressOpacity, {toValue: 1, useNativeDriver: false}).start()
        //Animated.timing(scale, {toValue: 1, useNativeDriver: true}).start()
    }

    return( <View
        style={[styles.task, {backgroundColor:bgCol}, inTransition?{height:5, flex:shrinkView}:{height:100}]}>
        <View style={[styles.taskType]}>
            {//<View style={[styles.taskHeaderView,isCurrentTask?{ alignItems: 'flex-end'}: { alignItems: 'center'}]}>
}
            <Animated.Text style={[styles.taskHeader, {fontSize: getFontSize("large")},{opacity:timeOpacity},fontIndex!==0?{fontFamily:fontList[fontIndex]}:{fontFamily:'arial'}]}>{title}</Animated.Text>
            
            { isCurrentTask
            ? 
            <Animated.View style={{flex:0.5, justifyContent:'flex-end', opacity:progressOpacity, transform:  [{ scale }] }}>
            <CircleButton handleProgress={handleProgress} hp3={fillButtonOnPress}/>
            </Animated.View>: <View style={{flex:0.5}}/> //<View style={inTransition?{flex:shrinkView}:{flex:0}}/>
            }
        </View>


        {isCurrentTask ? <Animated.View style={[styles.progress, {opacity: progressOpacity, transform: [{ scale }] }]}>
            <Progress.Bar style={[{alignSelf:'flex-end'}]} progress={progress} width={320} height={20} color="black" />
            {/*<Progress.Pie progress={0.3} size={50} color="black"/>*/}
        </Animated.View>: <></>}


        <Animated.View style={[styles.timeLine, {opacity:timeOpacity}]} >
            <View style={[styles.timeElement,  { marginLeft: timeMargin}]}>
                <Text style={[styles.timeNumber,{textAlign: "left", fontSize: getFontSize("small")}]}>
                    3:00 PM
                </Text>
                <Text style={[styles.timeDesignate, {fontSize: getFontSize("small")}]}>
                    Start
                </Text>
            </View>
            <View>
                <Text style={[styles.timeDuration,, {fontSize: getFontSize("small")}]}>
                    {"("}{duration}{" MINS)"}
                </Text>
            </View>
            <View style={[styles.timeElement,  { marginRight: timeMargin, alignItems: 'flex-end'}]}>
                <Text style={[styles.timeNumber, {fontSize: getFontSize("small")}]}>
                    3:30 PM
                </Text>
                
                <Text style={[styles.timeDesignate,{fontSize: getFontSize("small")}]}>
                    End
                </Text>
            </View>
        </Animated.View>
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
        flex:1,
        //backgroundColor:'purple',
        bottom: 10,
        alignSelf: 'center',

        
        paddingLeft: 25
        //alignSelf:'flex-start',
        
        //marginTop: 25,
        
        //fontSize: 42,
        
    },
    buttonView:{
        backgroundColor: 'white',
        
        fontSize: 50,
        textAlign: 'center',
        marginTop: 20,
        marginRight: 0,    
        flex: 0.5
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