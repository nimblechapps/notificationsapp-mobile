import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

import CustomIcon from "../customIcon";

function IconButton(props: any): JSX.Element {
  const { style, disabled, onPress, iconName, iconStyle } = props;

  return (
    <TouchableOpacity style={style} disabled={disabled} onPress={onPress}>
      <CustomIcon disabled={true} name={iconName} style={iconStyle} />
    </TouchableOpacity>
  );
}

IconButton.propTypes = {
  style: PropTypes.any,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default IconButton;
