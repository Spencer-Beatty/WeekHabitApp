import { useEffect, useState } from "react";
import { StyleSheet, Button, View, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"

export default function CircleButton(props : any){
    const handleProgress = props.handleProgress;
    const [longPressTriggered, setLongPressTriggered] = useState(false)

    function handleLongPress(){
        setLongPressTriggered(true)

    }
    function releaseLongPress(){
        setLongPressTriggered(false)

    }

    useEffect(() => {
        if(longPressTriggered){
            const interval = setInterval(() => {
                handleProgress();
            }, 10)

            return () => clearInterval(interval);
        }
    },[longPressTriggered])

    
    return (
        <View style={styles.buttonView}>
            
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 75,
                    height: 75,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                }}
                onPress={() => props.hp3()}
                onLongPress={() => handleLongPress()}
                onPressOut={()=> releaseLongPress()}
            >
                <Icon name={"chevron-right"} size={30} color="#01a699" />
                

            </TouchableOpacity>
        </View>
    )
    }


    const styles = StyleSheet.create({
        buttonView:{
            marginRight: 25,
            marginTop: 20,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonStyle: {
            backgroundColor: 'red'
        }



    })