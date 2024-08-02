import React, { ReactNode } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { Colors } from "../../utils/theme";

interface LabelProps {
  style?: TextStyle | TextStyle[];
  labelStyle?: TextStyle | TextStyle[];
  numberOfLines?: number;
  children: ReactNode;
  onPress?: () => void | null;
}

const Label: React.FC<LabelProps> = ({
  style,
  numberOfLines,
  children,
  onPress,
}: LabelProps) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.labelStyle, style]}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: Colors.WHITE,
  },
});

export default Label;
