import { StyleSheet } from "react-native";
import { Colors } from "../../utils/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonLabelStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  iconStyle: {
    color: Colors.BLACK,
  },
});
