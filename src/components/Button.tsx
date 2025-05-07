import { StyleSheet, Pressable, Text, PressableProps } from "react-native";

import colors from "@/constants/colors";

type ButtonProps = {
  text: string;
} & PressableProps;

export default function Button({ text, ...rest }: ButtonProps) {
  return (
    <Pressable {...rest} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.tint,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
