import { Platform,Text,StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";


function Overview(){
    const date = new Date();

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return( <View
    style={styles.overview}
    >
        

        <Text style={[styles.date]}>{month}{".\n"}{day}{"th"}</Text>
    
        <Text style={styles.quote}>
            {'"A day spent is  \na day not wasted"'}
        </Text>
        
    </View>);
}



const styles = StyleSheet.create({
    overview: {
        height:'18.75%',
        backgroundColor: '#FF9500',
        flexDirection: 'row',
        justifyContent: 'space-between'
        
        
    },
    date: {
        alignSelf:'flex-end',
        fontSize:62,
        lineHeight: 55,
        padding:5,
        marginLeft: 3,
        marginBottom: Platform.OS === 'web' ? -5 : -15
    
        
        
        
    },
    quote: {
        textAlign: 'right',
        marginRight: 20,
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 50
        
        
    }
})

const fontSheet = StyleSheet.create({
    quoteText : {
        fontFamily: 'SFPro'
    },
    dateText : {
        fontFamily: 'SFPro'
    }
})


export default Overview;

