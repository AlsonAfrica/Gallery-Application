import { StatusBar } from 'expo-status-bar';
import {  View ,Image, FlatList,Text,ScrollView, Pressable,TextInput } from 'react-native';
import { photos } from '../data';
import styles from '../Styles/styles';
import { useWindowDimensions } from 'react-native';
import Carousel from '../Carousel';
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';


export default function App() {
  const {width}=useWindowDimensions()


  return (
    <View style={styles.container}>
      <StatusBar 
       animated={true}
       backgroundColor="blue"
      />
      <View style={styles.utils}>
      <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#aaa"
        />
        <Link href='./map' asChild>
          <Pressable>
            <Feather name="map" size={24} color="black" />
          </Pressable>
        </Link>
        

      </View>
      <ScrollView>
        {/* Header */}
        <ScrollView  horizontal style={styles.header} showsHorizontalScrollIndicator={false} >
        
          {/* FLATLIST DATA RENDERS AN ARRAY DATA={} AND RENDERS ITEMS WITHIN THAT DATA */}
          <FlatList
            data={photos}
            style={{width}}
            contentContainerStyle={{ gap: 5 }}
            columnWrapperStyle={{ gap: 4 }}
            numColumns={4}
            scrollEnabled={false}
            inverted
            renderItem={({ item }) => (
              <Link href={`/photo/${item.id}`} asChild>
                <Pressable style={{ width: `${100 / 4}%`, height: 100 }}>
                  <Image source={item.image} style={{width:"100%",height:"100%"}} />
                </Pressable>
              </Link>
              
            )}
          />
          <View style={{width,height:"100%",overflow:"hidden"}} >
            <Image source={photos[0].image} resizeMode="cover" style={{width:width, height:"100%", transform:[{scale:1.5}]}}/>
          </View>
          <Image source={photos[1].image} style={{width,height:"100%"}} resizeMode="cover"/>
        </ScrollView>
       
      
          <View style={styles.trackercontainer}>
              {Array(3).fill(0).map((item, index) => (
                <View key={index} style={styles.pagetracker} />
              ))}
          </View>
    
          <Carousel title="Albums" photos={photos.splice(0, 6)}/>
          <Carousel title="People" photos={photos.splice(3, 6)} />
          {/* <Carousel title="Featured" photos={photos.splice(6, 9)}/> */}
       
      </ScrollView>

         <View style={styles.containercamera}>
            <View style={styles.camerabutton}>
             <Link href="./camera" asChild>
              <Pressable>
                <Text style={styles.buttonText}><Entypo name="camera" size={24} color="black" /></Text>
              </Pressable>
             </Link>
              

            </View>
          </View>

    </View>
  );
}  


