
import Button from "../../../components/ui/Button";
import { FaRegBell } from "react-icons/fa";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

function NotificationIcon() {
    const { unreadCount} = useSelector((state: RootState) => state.notification);
  return (
    <div className="relative">
      <Button intent={"iconRound"} size={"mediumRound"}>
        <FaRegBell />
      </Button>
      {/* unread count */}
        {unreadCount > 0 && (<div className="absolute -top-1 -right-2 flex items-center justify-center bg-red-600 text-white rounded-full h-5 aspect-square">
            <p className="text-sm">{unreadCount}</p>
            </div>)}
    </div>
  );
}

export default NotificationIcon;
