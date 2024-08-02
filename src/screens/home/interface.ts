export interface homeScreenInterface {
  onPressIcon: () => void;
  handleButtonPress: (value: number) => void;
  isAllNotificationRead: boolean;
  loadingButton: number;
}
export interface NotificationList {
  _id: string;
  title: string | undefined;
  content: string | undefined;
  isRead: boolean;
  date: string;
}
