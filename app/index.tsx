import { SafeAreaView, Text,StyleSheet, View } from "react-native";
import Overview from "./Components/overview";
import TaskGraveyard from "./Components/taskgraveyard";
import Task from "./Components/task";
import UpcomingTasks from "./Components/upcomingtasks";

//import {IosStatusbar} from "./ios-status-bar";
//import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SystemUI from "expo-system-ui"


export default function Index() {

  const insets = useSafeAreaInsets();
  const [bgCol, setBgCol] = useState("green")
  const [deadTasks, setDeadTasks] = useState([])

  useEffect(() => { 
    setBgCol('blue')
    SystemUI.setBackgroundColorAsync('#FF9500');
    
  },[bgCol])


    
  
  
    
    function addToGraveyard(number: any){

        
          setDeadTasks(current=>{
            return current.concat(number)
    })
        
       
    }

  
  return (
    
    
    <View style={[styles.outerView,
      {position: "absolute",
      top:insets.top,
      left:insets.left,
      right:insets.right,
      bottom:-5}
      ]}>
        
    <StatusBar translucent hidden/>
    {/*<SafeAreaView style={[styles.taskPageView, {backgroundColor:bgCol}]}>*/}
   
  
    
    <Overview></Overview>
    <View style={styles.blackBar}></View>
    <TaskGraveyard deadTasks={deadTasks}></TaskGraveyard>
    {//<Task isCurrentTask={true} bgCol={'#FF9500'}></Task>
    }<UpcomingTasks addToGraveyard={addToGraveyard}></UpcomingTasks>
   
   {/*</SafeAreaView>*/}
   </View>
   
  );
}



const styles = StyleSheet.create({
  taskPageView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    
    
  },
  blackBar: {
    height: 10,
    backgroundColor: 'black'
  },
  outerView: {
    flex: 1,
    backgroundColor: 'orange',
  
     
     
  }
});



