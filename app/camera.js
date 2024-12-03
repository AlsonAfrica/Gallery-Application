import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Pressable, Dimensions, Image, Button, StyleSheet, Text, View, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import { saveImage } from '../Database/sql';
import { photos } from '../data';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [picture, setPicture] = useState(null);
  const [location, setLocation] = useState(null);  // Store location
  const [timestamp, setTimestamp] = useState(null);  // Store timestamp
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

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData.coords);  // Store location data
      } else {
        console.log('Permission for location not granted');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const takePicture = async () => {
    try {
      console.log("Button pressed");
  
      // Fetch location when taking a picture
      await getLocation();
  
      // Capture picture
      const pic = await camera.current.takePictureAsync({
        base64: true,
        exif: false,
        quality: 1,
      });
  
      // Get current timestamp
      const currentTimestamp = new Date().toISOString();
      setTimestamp(currentTimestamp);
      setPicture(pic);
  
      console.log("Captured Picture:", pic);
      console.log("Timestamp:", currentTimestamp);
      console.log("Location:", location ? `Lat: ${location.latitude}, Long: ${location.longitude}` : 'Location not available');
  
      // Save image to the database
      if (location) {
        const { latitude, longitude } = location;
        const result = await saveImage(pic.uri, latitude, longitude); // Assume `userId` is available
        console.log("Image saved to database:", result);
      } else {
        console.warn("Location not available, image not saved.");
      }
    } catch (error) {
      console.error("Failed to take picture:", error);
    }
  };
  

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const resetPicture = () => {
    setPicture(null);
    setLocation(null);  // Reset location when retaking picture
    setTimestamp(null);  // Reset timestamp when retaking picture
  };

  if (picture) {
    return (
      <View style={styles.imgCont}>
        <Image
          source={{uri: `data:image/jpg;base64,${picture.base64}`}}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Timestamp: {timestamp}</Text>
          <Text style={styles.infoText}>
            Location: {location ? `Lat: ${location.latitude}, Long: ${location.longitude}` : 'Loading...'}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Retake" onPress={resetPicture} />
          <Button title="Send" onPress={() => {/* Add send logic */}} />
        </View>
      </View>
    );
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
              <View style={styles.capture} />
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
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  capture: {
    borderColor: "#fff",
    borderWidth: 3,
    height: 60,
    width: 60,
    borderRadius: 30
  },
  imgCont: {
    flex: 1,
  },
  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  infoContainer: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  sendCont: {
    position: "absolute",
    right: 0,
    bottom: 20,
    backgroundColor: "#306A68",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  sendItem: {
    color: "#BDBDBDB",
    marginLeft: 5
  }
});
