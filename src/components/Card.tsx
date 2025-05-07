import { PropsWithChildren } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

type CardProps = {
  style?: StyleProp<ViewStyle>;
};

export default function Card({
  style,
  children,
}: PropsWithChildren<CardProps>) {
  return <View style={[styles.container, style || {}]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#00000099",
    borderRadius: 12,
  },
});
