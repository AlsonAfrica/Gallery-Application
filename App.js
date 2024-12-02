import { StatusBar } from 'expo-status-bar';
import {  View ,Image, FlatList,Text,ScrollView } from 'react-native';
import { photos } from './data';
import styles from './Styles/styles';
import { useWindowDimensions } from 'react-native';
import Carousel from './Carousel';

export default function App() {
  const {height,width}=useWindowDimensions()
  
  return (
    <View style={styles.container}>
      <StatusBar 
       animated={true}
       backgroundColor="blue"
      />
      
      <ScrollView>
      {/* Header */}
      <View style={styles.header}>
        {/* FLATLIST DATA RENDERS AN ARRAY DATA={} AND RENDERS ITEMS WITHIN THAT DATA */}
        <FlatList
          data={photos}
          contentContainerStyle={{ gap: 5 }}
          columnWrapperStyle={{ gap: 4 }}
          numColumns={4}
          scrollEnabled={false}
          inverted
          renderItem={({ item }) => (
            <Image source={item.image} style={{ width: `${100 / 4}%`, height: 100 }} />
          )}
        />
      </View>

        <Carousel title="Albums" photos={photos.splice(0, 3)}/>
        <Carousel title="People" photos={photos.splice(3, 6)}/>
        <Carousel title="Featured" photos={photos.splice(6, 9)}/>


      </ScrollView>
    </View>
  );
}  


