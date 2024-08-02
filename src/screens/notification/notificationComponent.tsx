import { View, Text, FlatList } from "react-native";
import React, { useCallback } from "react";
import { notificationProps } from "./interface";
import { NotificationList } from "../home/interface";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../utils/theme";
import moment from "moment";

export default function NotificationComponent({
  notificationList,
  onPressNotification,
  onPressReadAll,
}: notificationProps) {
  const keyExtractor = useCallback(
    (item: NotificationList, index: number) => index.toString(),
    []
  );

  const renderItem = ({ item }: { item: NotificationList; index: number }) => {
    return (
      <TouchableOpacity
        disabled={item.isRead}
        style={[
          styles.notificationButton,
          { backgroundColor: item.isRead ? Colors.WHITE : Colors.BLUE },
        ]}
        onPress={() => onPressNotification(item)}
      >
        <Text style={styles.text}>Title : {item.title}</Text>
        <Text style={styles.text}>Body : {item.content}</Text>
        <Text style={styles.text}>
          Time : {moment(item.date).format("hh:mm A")}
        </Text>
      </TouchableOpacity>
    );
  };
  const ListHeaderComponent = () => {
    return (
      <>
        {notificationList.length > 0 && (
          <TouchableOpacity onPress={onPressReadAll}>
            <Text style={styles.ReadAlltext}>Read All</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <>
        <View style={styles.emptyStyleComponent}>
          <Text style={styles.text}>No notification yet</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationList}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.contentCointainerStyle}
        renderItem={renderItem}
        extraData={notificationList}
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}
