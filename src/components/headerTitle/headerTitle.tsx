import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors, Font } from "../../utils/theme";
import Label from "../label";

interface HeaderTitleProps {
  title: string;
  titleStyle?: TextStyle;
  onPress?: () => () => void;
}

const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
  const { title, titleStyle, onPress = () => navigation.goBack() } = props;
  const navigation = useNavigation();
  return <Label style={[styles.title, titleStyle]}>{title}</Label>;
};

HeaderTitle.propTypes = {
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  title: {
    fontSize: Font.SIZE_20,
    color: Colors.BLACK,
    fontWeight: "700",
  },
});

export default HeaderTitle;
