import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";

import colors from "@/constants/colors";

type CameraPermissionProps = {
  onPressEnableCamera: () => void;
};

export default function CameraPermission({
  onPressEnableCamera,
}: CameraPermissionProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Ionicons name="camera-outline" size={80} color={colors.tint} />

          <Text style={styles.title}>Enable Camera</Text>
          <Text style={styles.subTitle}>
            We'll need this to take photos or record video.
          </Text>
        </View>

        <Button text="Enable Camera" onPress={onPressEnableCamera} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  subTitle: {
    color: "grey",
    marginTop: -4,
  },
});
