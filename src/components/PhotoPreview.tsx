import { StyleSheet, ImageBackground, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraCapturedPicture } from "expo-camera";

import FooterCard from "@/components/FooterCard";

type PhotoPreviewProps = {
  photo: CameraCapturedPicture;
  onDiscard: () => void;
  onSave: () => void;
};

export default function PhotoPreview({
  photo,
  onDiscard,
  onSave,
}: PhotoPreviewProps) {
  return (
    <ImageBackground style={{ flex: 1 }} source={{ uri: photo.uri }}>
      <SafeAreaView style={{ flex: 1 }}>
        <FooterCard>
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
        </FooterCard>
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
