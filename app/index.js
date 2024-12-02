import { StatusBar } from 'expo-status-bar';
import {  View ,Image, FlatList,Text,ScrollView, Pressable } from 'react-native';
import { photos } from '../data';
import styles from '../Styles/styles';
import { useWindowDimensions } from 'react-native';
import Carousel from '../Carousel';
import { Link } from 'expo-router';
import { useState } from 'react';

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
        <Image source={photos[0].image} style={{width,height:"100%"}} resizeMode="cover"/>
        <Image source={photos[1].image} style={{width,height:"100%"}} resizeMode="cover"/>
      </ScrollView>

        <View style={styles.trackercontainer}>
            {Array(3).fill(0).map((item, index) => (
              <View key={index} style={styles.pagetracker} />
            ))}
        </View>

     

        <Carousel title="Albums" photos={photos.splice(0, 6)}/>
        <Carousel title="People" photos={photos.splice(3, 6)}/>
        <Carousel title="Featured" photos={photos.splice(6, 9)}/>
    



      </ScrollView>
    </View>
  );
}  


