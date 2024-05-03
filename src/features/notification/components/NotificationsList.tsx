import React from "react";
import { cn } from "../../../utils/mergeClasses";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { limitString } from "../../../utils/format";



type TNotificationListProps = React.HTMLAttributes<HTMLDivElement>;

function NotificationsList({ className, ...rest }: TNotificationListProps) {
  
  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );

  return (
    <div className={cn("overflow-y-scroll", className)} {...rest}>
      {notifications.map((notification) => (
        <div
          key={notification._id}
          className={
            cn("bg-gray-50 border border-red-100 rounded-md px-4 py-3 my-2 shadow-md flex gap-10 justify-between text-sm",{
            "text-gray-800 bg-blue-150": !notification.read
            })
          } 
        >
          <div>
            <h1 className="font-medium">{notification?.title}</h1>
            <p className="text-gray-400">{limitString(notification?.message,60)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationsList;
