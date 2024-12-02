import { StatusBar } from "expo-status-bar";
import { Text,View } from "react-native";

export default function PhotoScreen(){
  return(
    <View>
        <StatusBar
        animated={true}
        backgroundColor="blue"
        />
        <Text>Hello</Text>
    </View>
  )
}