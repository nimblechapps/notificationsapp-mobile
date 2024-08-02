import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import React from "react";
import { Colors, Font } from "../../utils/theme";
import { URLS } from "../../redux/urls";

export default function SplashScreenComponent() {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.imageStyle}
      />
      <Text style={styles.labelStyle}>Nimblechapps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 120,
    height: 120,
  },
  labelStyle: {
    marginTop: 20,
    fontSize: Font.SIZE_20,
    color: Colors.BLACK,
    fontWeight: "500",
  },
});
