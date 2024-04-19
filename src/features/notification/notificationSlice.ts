import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clear } from "console";

export interface NotificationDocument  {
    _id: string;
    user: string;
    title: string;
    message: string;
    isActive: boolean;
    type: NotificationType;
    link: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export enum NotificationType {
    SYSTEM = 'system',
    ACTIVITY = 'activity',
    TRANSACTION = 'transaction'
}

const initialState = {
    notifications: [] as NotificationDocument[],
    systemNotifications: [] as NotificationDocument[],
    unreadCount: 0
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<NotificationDocument>) => {
            const tempNotifications = [
                ...state.notifications,
                action.payload
            ]
            const reorderedNotifications = tempNotifications.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            });
            state.notifications = reorderedNotifications;
            if (!action.payload.read) {
                state.unreadCount++;
            }
            // set system notifications
            if (action.payload.type === NotificationType.SYSTEM) {
                state.systemNotifications = [
                    ...state.systemNotifications,
                    action.payload
                ]
            }
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(notification => notification._id === action.payload);
            if (notification) {
                notification.read = true;
                state.unreadCount--;
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(notification => notification.read = true);
            state.unreadCount = 0;
        },
        clearNotifications: (state) => {
            state.notifications = [];
            state.systemNotifications = [];
            state.unreadCount = 0;
        },
        dismissSystemNotification: (state, action: PayloadAction<string>) => {
            const filteredNotifications = state.systemNotifications.filter(notification => notification._id !== action.payload);
            state.systemNotifications = filteredNotifications;
        }
    }
});

export const { addNotification, markAsRead, markAllAsRead ,clearNotifications, dismissSystemNotification} = notificationSlice.actions;

export default notificationSlice.reducer;