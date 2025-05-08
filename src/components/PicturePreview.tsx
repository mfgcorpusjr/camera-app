import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraCapturedPicture } from "expo-camera";

import Card from "@/components/Card";
import PreviewControls from "@/components/PreviewControls";

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
          <PreviewControls onDiscard={onDiscard} onSave={onSave} />
        </Card>
      </SafeAreaView>
    </ImageBackground>
  );
}
