import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { photos } from "../../data";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function PhotoScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const parsedId = id ? parseInt(id, 10) : NaN;

  if (isNaN(parsedId)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Invalid photo ID</Text>
      </View>
    );
  }

  const photo = Array.isArray(photos) ? photos.find((p) => p.id === parsedId) : null;

  if (!photo) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Photo not found</Text>
      </View>
    );
  }

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const gesture = Gesture.Pinch()
    .onChange((e) => {
      scale.value = e.scale;
    })
    .onEnd((e) => {
      if (e.velocity < 0) {
        runOnJS(router.back)();
      } else {
        scale.value = withTiming(1);
      }
    });

  return (
    <View style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Animated.Image
          source={photo.image}
          style={[{ width: "100%", height: "100%" }, animatedStyle]}
          resizeMode="contain"
        />
      </GestureDetector>
    </View>
  );
}
