import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Task from "./task";
import { colourPick } from "./taskgraveyard";



function UpcomingTasks(){

    const insets = useSafeAreaInsets();
    const [upcomingTasks, setUpcomingTasks] = useState([1,2])

    return( <View style={[styles.upcomingTasks]}>
        {upcomingTasks.map(task => {
            return(<Task key={task} isCurrentTask={false} bgCol={colourPick(task)}></Task>)
        })}

    </View>);
}

export default UpcomingTasks;

const styles = StyleSheet.create({
    upcomingTasks:{
        //An odd number deletes a line within the task boxes
        backgroundColor: 'green',
        flex: 1,
        bottom:0,
        
    },
    task: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    }
})