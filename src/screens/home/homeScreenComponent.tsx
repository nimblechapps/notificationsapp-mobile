import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderTitle from "../../components/headerTitle/headerTitle";
import { homeScreenInterface } from "./interface";
import HeaderRight from "../../components/headerRight/headerRight";
import CustomButton from "../../components/button/button";
import { styles } from "./styles";

export default function HomeScreenComponent(props: homeScreenInterface) {
  const {
    onPressIcon,
    handleButtonPress,
    isAllNotificationRead,
    loadingButton,
  } = props;

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => "",
      headerTitle: () => <HeaderTitle title={"Home"} />,
      headerRight: () => (
        <HeaderRight
          onPress={onPressIcon}
          iconName={"notification"}
          iconStyle={styles.iconStyle}
          isAllNotificationRead={isAllNotificationRead}
        />
      ),
    });
  });

  return (
    <View style={styles.container}>
      <CustomButton
        onPress={() => handleButtonPress(1)}
        title="Button 1"
        disabled={false}
        style={styles.buttonStyle}
        textStyle={styles.buttonLabelStyle}
        loading={loadingButton === 1}
      />
      <CustomButton
        onPress={() => handleButtonPress(2)}
        title="Button 2"
        disabled={false}
        style={styles.buttonStyle}
        textStyle={styles.buttonLabelStyle}
        loading={loadingButton === 2}
      />
      <CustomButton
        onPress={() => handleButtonPress(3)}
        title="Button 3"
        disabled={false}
        style={styles.buttonStyle}
        textStyle={styles.buttonLabelStyle}
        loading={loadingButton === 3}
      />
    </View>
  );
}
