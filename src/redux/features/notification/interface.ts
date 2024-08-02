import { NotificationList } from "../../../screens/home/interface";

export interface NotificationSlice {
  notificationList: NotificationList[];
  isAllNotificationRead: boolean;
  deviceToken: string;
  accessToken: string;
  refreshToken: string;
}
