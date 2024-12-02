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
      paddingHorizontal:20
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
    }
  });
  
  export default styles;
  