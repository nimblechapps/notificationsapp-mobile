import { StyleSheet } from "react-native";
import { Colors } from "../../utils/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentCointainerStyle: {
    paddingHorizontal: 24,
    flexGrow: 1,
    paddingBottom: 40,
  },
  text: {
    marginVertical: 2,
    color: Colors.BLACK,
  },
  ReadAlltext: {
    marginTop: 10,
    color: Colors.BLACK,
    textAlign: "right",
  },
  notificationButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
    backgroundColor: Colors.BLUE,
    marginVertical: 10,
  },
  ListHeaderComponentStyle: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  emptyStyleComponent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    padding: 4,
  },
  sectionHeaderText: {
    fontWeight: "500",
    color: Colors.BLACK,
    fontSize: 16,
    textAlign: "left",
  },
});
