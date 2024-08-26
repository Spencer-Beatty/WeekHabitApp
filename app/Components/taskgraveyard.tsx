import { Key, useEffect, useState } from "react";
import { Text,StyleSheet, View } from "react-native";



function TaskGraveyard(props: any){
    
    
    return( 
    <View>
       { props.deadTasks.map( (task : number, index:number) => {
            return <View key={index} style={[styles.deadTask, {backgroundColor: colourPick(task)}]} ></View>
        })} 
    </View>);
}


export function colourPick(color: any){
    const colorWheel = ["#a9e5bb","#fcf6b1","#f7b32b","#f72c25","#9FC2CC"]


    if(typeof(color) === "number"){
        return colorWheel[color % colorWheel.length]
    }else{
       return color
    }
    
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