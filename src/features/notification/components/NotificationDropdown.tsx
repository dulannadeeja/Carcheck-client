import React from "react";
import HeaderDropdownModal from "../../../components/HeaderDropdownModal";
import NotificationList from "./NotificationList";

type TNotificationDropdownProps = React.HTMLAttributes<HTMLDivElement>;

function NotificationDropdown({
  className,
  ...rest
}: TNotificationDropdownProps) {
  return (
    <HeaderDropdownModal className={className} {...rest}>
      <h2 className="text-lg font-medium text-gray-900 mb-8 px-4">Notifications</h2>
      <NotificationList className="overflow-y-scroll px-4" />
    </HeaderDropdownModal>
  );
}

export default NotificationDropdown;
