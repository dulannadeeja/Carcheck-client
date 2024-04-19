import React, { useEffect } from "react";
import { useGetNotificationsQuery } from "../notificationApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  addNotification,
  clearNotifications,
  dismissSystemNotification,
} from "../notificationSlice";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";

function NotificationArea() {
  const dispatch = useDispatch();
  const { data } = useGetNotificationsQuery();
  const { systemNotifications } = useSelector(
    (state: RootState) => state.notification
  );
  useEffect(() => {
    dispatch(clearNotifications())
    // set the notifications in the redux store
    if (data) {
      data.forEach((item) => {
        dispatch(addNotification(item));
      });
    }
  }, [data, dispatch]);

  const onDismiss = (id: string) => {
    dispatch(dismissSystemNotification(id));
  }

  return (
    <>
      {systemNotifications.map((notification) => (
        <div key={notification._id
        } className="bg-gray-50 border border-red-100 rounded-md px-4 py-3 my-2 shadow-md flex gap-10 justify-between">
          <div>
            <h1 className="text-xl font-bold">{notification?.title}</h1>
            <p>{notification?.message}</p>
          </div>
          <div className="flex gap-5">
            <Button intent={"primary"} className="rounded-md">
              <Link to={notification?.link || ""} className="">
                Take me there
              </Link>
            </Button>
            <Button intent={"secondary"} className="rounded-md"
              onClick={() => onDismiss(notification._id)}
            >
              Dismiss Notification
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}

export default NotificationArea;
