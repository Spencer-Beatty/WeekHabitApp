import { useState } from "react";
import { Text,StyleSheet, View } from "react-native";



function TaskGraveyard(){
    
    const [deadTasks, setDeadTasks] = useState([0,1,2,3])
    
    
    return( 
    <View>
        {deadTasks.map( task => {
            return <View key={task} style={[styles.deadTask, {backgroundColor: colourPick(task)}]} ></View>
        })}
    </View>);
}

export function colourPick(color: number){
    const colorWheel = ['#32ADE6', '#FF3B30', '#FFCC00', '#00C7BE']
    return colorWheel[color]
}



export default TaskGraveyard;

const styles = StyleSheet.create({
    task: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    deadTask: {
        height: 5, 
    }
})