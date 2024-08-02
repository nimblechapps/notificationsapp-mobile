import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import IconButton from "../iconButton";
import { Colors, Font } from "../../utils/theme";

function HeaderRight(props: any): JSX.Element {
  const { onPress, iconName, iconStyle, isAllNotificationRead } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      {isAllNotificationRead ? null : <View style={styles.dotStyle} />}
      <IconButton
        style={styles.container}
        iconName={iconName}
        disabled={true}
        iconStyle={[styles.iconStyle, iconStyle]}
      />
    </TouchableOpacity>
  );
}

HeaderRight.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isAllNotificationRead: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginLeft: -5,
    paddingVertical: 5,
  },
  iconStyle: {
    fontSize: Font.SIZE_24,
    color: Colors.BLACK,
  },
  dotStyle: {
    borderRadius: 6,
    backgroundColor: Colors.BLUE,
    position: "absolute",
    height: 10,
    width: 10,
    right: 5,
  },
});

export default HeaderRight;
