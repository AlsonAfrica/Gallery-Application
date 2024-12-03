import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      height: 1400/2,
    },
    container:{
      marginVertical:10
    },
    title:{
      padding:15,
      fontWeight:"600",
      fontSize:30
    },
    images:{
      gap:10,
      paddingHorizontal:20,
      marginBottom:50
    } ,
    image:{
      width:250,
      height:150,
      borderRadius:20
    },
    carouselcontainer:{
      backgroundColor:"grey"
    },
    trackercontainer:{
       padding:10,
       justifyContent:'center',
       flexDirection:'row',
       alignItems:"center",
       gap:5,
    },
    pagetracker:{
      width:10,
      aspectRatio:1,
      backgroundColor:'gray',
      borderRadius:5
    }, 
    utils:{
      display:"flex",
      flexDirection:"row",
      gap:10,
      height:40,
      justifyContent:"center",
      alignItems:"center",
      marginBottom:10,
      backgroundColor:"transparent" 
    },
    input:{
      borderWidth:2,
      color:"blue",
      width:400,
      height:40,
      borderRadius:20,
      padding:20
    },
    containercamera: {
      flex: 1,
      backgroundColor: '#fff', // For better visualization
    },
    camerabutton: {
      position: 'absolute',
      bottom: 50, // Distance from the bottom
      right: 20,  // Distance from the right
      backgroundColor: '#007AFF', // Button color
      borderRadius: 30, // Makes the button circular
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // For shadow on Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 }, // Shadow position
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    buttonText: {
      color: 'white', // Text color
      fontWeight: 'bold',
    },
  });
  
  export default styles;
  