import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Pressable, Dimensions, Image, Button, StyleSheet, Text, View, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [picture, setPicture] = useState(null);
  const camera = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  
  const takePicture = async () => {
    try {
      console.log("Button pressed");
      const pic = await camera.current.takePictureAsync({
        base64: true,
        exif: false,
        quality: 1
      });
      setPicture(pic);
    } catch (error) {
      console.error("Failed to take picture:", error);
    }
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const resetPicture = () => {
    setPicture(null);
  }

  if (picture) {
    return (
      <View style={styles.imgCont}>
        <Image
          source={{uri: `data:image/jpg;base64,${picture.base64}`}}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.buttonContainer}>
          <Button title="Retake" onPress={resetPicture} />
          <Button title="Send" onPress={() => {/* Add send logic */}} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <View style={styles.buttonContainer}>

          <Pressable style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}><MaterialCommunityIcons name="camera-flip" size={60} color="white" /></Text>
          </Pressable>

          <View style={styles.button}>
            <Pressable onPress={takePicture}>
              <View style={styles.capture}/>
            </Pressable>
          </View>
          
          <Pressable></Pressable>
        </View>
      </CameraView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:"center",
    alignContent:"center",
    backgroundColor: 'transparent',
    marginBottom:20
  },
  button: {
    justifyContent:'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },bottom:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    height:80
  },
  capture:{
    borderColor:"#fff",
    borderWidth:3,
    height:60,
    width:60,
    borderRadius:30
  },
  imgCont:{
    flex:1
  },
  image:{
    height:Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  sendCont:{
    position:"absolute",
    right:0,
    bottom:20,
    backgroundColor:"#306A68",
    height:60,
    width:60,
    borderRadius:30,
    justifyContent:"center",
    alignItems:"center"
  },
  sendItem:{
    color:"#BDBDBDB",
    marginLeft:5
  }
});
