import { Text, View, Image, ScrollView } from "react-native";
import styles from "./Styles/styles";

export default function Carousel({ title, photos }) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.images}
        showsHorizontalScrollIndicator={false}
      >
        {photos.map((photo, index) => (
          <Image key={photo.id} source={photo.image} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
}
