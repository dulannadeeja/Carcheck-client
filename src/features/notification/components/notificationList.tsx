import React from "react";
import { cn } from "../../../utils/mergeClasses";

type TNotificationListProps = React.HTMLAttributes<HTMLDivElement>;

function NotificationList({ className, ...rest }: TNotificationListProps) {
  return (
    <div className={cn("", className)} {...rest}>
      notificationList
    </div>
  );
}

export default NotificationList;
