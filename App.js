import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View ,Image, FlatList } from 'react-native';
import { photos } from './data';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* FLAT LIST DATA RENDERS AN ARRAY DATA={} AND RENDERS ITEMS WITHIN THAT DATA */}
      <FlatList
      data={photos}
      contentContainerStyle={{gap:5}}
      columnWrapperStyle={{gap:4}}
      numColumns={4}
      renderItem={({item})=>(<Image source={item.image} style={{width: `${100/4}%`,height:100,}}/>)}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

