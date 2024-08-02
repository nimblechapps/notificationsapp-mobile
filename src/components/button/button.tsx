import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import Label from "../label";
import { Colors } from "../../utils/theme";

// Define the props type
interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  activeOpacity?: number;
  loading: boolean;
}

const CustomButton = ({
  title,
  onPress,
  style,
  disabled,
  activeOpacity = 1,
  loading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} />
      ) : (
        <Label style={[styles.text]}>{title}</Label>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.DARK_BLUE,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.WHITE,
    fontSize: 16,
  },
});

export default CustomButton;
