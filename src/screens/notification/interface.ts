import { NotificationList } from "../home/interface";

export interface notificationProps {
  notificationList: NotificationList[];
  onPressNotification: (notification: NotificationList) => void;
  onPressReadAll: () => void;
}
