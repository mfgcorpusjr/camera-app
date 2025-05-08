import { StyleSheet, ImageBackground, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraCapturedPicture } from "expo-camera";

import Card from "@/components/Card";

type PicturePreviewProps = {
  picture: CameraCapturedPicture;
  onDiscard: () => void;
  onSave: () => void;
};

export default function PicturePreview({
  picture,
  onDiscard,
  onSave,
}: PicturePreviewProps) {
  return (
    <ImageBackground style={{ flex: 1 }} source={{ uri: picture.uri }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Card style={{ margin: 12, marginTop: "auto" }}>
          <View style={styles.controlsContainer}>
            <Ionicons
              style={styles.controlIcon}
              name="close-outline"
              size={24}
              color="white"
              onPress={onDiscard}
            />

            <Ionicons
              style={styles.controlIcon}
              name="checkmark-outline"
              size={24}
              color="white"
              onPress={onSave}
            />
          </View>
        </Card>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 60,
  },
  controlIcon: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 50,
  },
});
