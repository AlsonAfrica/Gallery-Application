import { StatusBar } from "expo-status-bar";
import { Image,View,Text } from "react-native";
import { photos } from "../../data";
import { useLocalSearchParams } from "expo-router";

export default function PhotoScreen(){
    const { id } = useLocalSearchParams(); // No type annotations

    const photo = photos.find((p) => p.id === parseInt(id)); // Using parseInt without "Number."
    
    if (!photo) {
      return <Text>Photo not found</Text>;
    }

  return(
    <View>
        <StatusBar
        animated={true}
        backgroundColor="blue"
        />
       <Image source={photo.image} style={{width:'100%', height:"100%"}} resizeMode="contain"/>
    </View>
  )
}