import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Task from "./task";
import { colourPick } from "./taskgraveyard";
import taskData from "./taskData.js"



function UpcomingTasks(props: any){

    //const insets = useSafeAreaInsets();
    const [upcomingTasks, setUpcomingTasks] = useState(taskData["data"]["tasks"].map((task,index) => ({
        ...task,
        "key" : index +1
         

       // Adding new property 'key'
       })))

    const [shrinkView, setShrinkView] = useState(1)


    function popUpcoming(){
        setUpcomingTasks(current => {
            return current.slice(1).concat(current[0])
        })
        
    }

    return( <View style={[styles.upcomingTasks]}>
        {upcomingTasks.length > 1 ?
        <View style={{flex:1}}>
        {upcomingTasks.map((task,index) => {
            if(upcomingTasks.indexOf(task) == 0) {
                return<Task key = {task["key"]} addToGraveyard={props.addToGraveyard} title={task["title"]} duration={task["duration"]} index={upcomingTasks.indexOf(task)} bgCol={colourPick(task["key"])} sv = {shrinkView} ssv = {setShrinkView} popUpcoming={popUpcoming}></Task>
            }
            else if(upcomingTasks.indexOf(task) > 0 && upcomingTasks.indexOf(task) < 3 ){
            return(<Task key={task["key"]} title={task["title"]} duration={task["duration"]} index ={upcomingTasks.indexOf(task)} bgCol={colourPick(task["key"])}  sv = {shrinkView} ssv = {setShrinkView}></Task>)
            }
            else if(upcomingTasks.indexOf(task) == 3){
                return(<Task key={task["key"]} title={task["title"]} duration={task["duration"]} index ={upcomingTasks.indexOf(task)} bgCol={colourPick(task["key"])} sv = {1-shrinkView} ssv = {setShrinkView}></Task>)
            }
        })}
        </View>: <></>}

    </View>);
}

export default UpcomingTasks;

const styles = StyleSheet.create({
    upcomingTasks:{
        //An odd number deletes a line within the task boxes
       
        flex: 1,
        flexDirection:'column',
        
       
        
    },
    task: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    }
})