
import List from "./ui/List";
import ListItem from "./ui/ListItem";
import { useDispatch} from "react-redux";
import { logout } from "../features/authentication/authSlice";
import { useSignoutMutation } from "../features/authentication/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type TOption = {
  label: string;
  action: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

type TOptions = {
  [key: string]: {
    [key: string]: TOption;
  };
};

type TProfileLinkListProps = React.HTMLAttributes<HTMLDivElement>;

function ProfileLinkList({ className, ...rest }: TProfileLinkListProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signout] = useSignoutMutation();

  const onSignOut = async () => {
    // make a request to the server to clear the session
    try {
      // refresh the page;
      navigate("/");
      await signout().unwrap();
      toast.success("Signed out successfully");
    } catch (err) {
      console.log(err);
    }finally{
      // clear the user state
      dispatch(logout());
    }
  };

  const options: TOptions = {
    Account: {
      AccountSettings: {
        label: "Account Settings",
        action: () => {
          console.log("Account Settings");
        },
      },
      Addresses: {
        label: "Addresses",
        action: () => {
          console.log("Addresses");
        },
      },
      Orders: {
        label: "Orders",
        action: () => {
          console.log("Orders");
        },
      },
      Payments: {
        label: "Payments",
        action: () => {
          console.log("Payments");
        },
      },
      SignOut: {
        label: "Sign Out",
        action: () => {
          onSignOut();
        },
      },
    },
  };

  function makeList() {
    return Object.keys(options).map((parentKey) => {
      const items = Object.keys(options[parentKey]).map((key) => {
        return (
          <ListItem
            key={key}
            onClick={(e) => {
              options[parentKey][key].action(e);
            }}
            className="cursor-pointer hover:text-blue-300"
          >
            {options[parentKey][key].label}
          </ListItem>
        );
      });
      return (
        <div key={parentKey} className="pb-3 mb-1 border-b-[0.05rem]">
          <h3 className="pt-4 pb-2 text-gray-300 font-medium">{parentKey}</h3>
          <List items={items} />
        </div>
      );
    });
  }

  return (
    <div className={className} {...rest}>
      {makeList()}
    </div>
  );
}

export default ProfileLinkList;
