import List from "./ui/List";
import ListItem from "./ui/ListItem";

type TOption = {
  label: string;
  action: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

type TOptions = {
  [key: string]: {
    [key: string]: TOption;
  };
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
  },
  Profile: {
    ProfileSettings: {
      label: "Profile Settings",
      action: () => {
        console.log("Profile Settings");
      },
    },
    ProfileInfo: {
      label: "Profile Info",
      action: () => {
        console.log("Profile Info");
      },
    },
    ProfilePhoto: {
      label: "Profile Photo",
      action: () => {
        console.log("Profile Photo");
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

type TProfileLinkListProps = React.HTMLAttributes<HTMLDivElement>;

function ProfileLinkList({
    className,
    ...rest
    }: TProfileLinkListProps) {
    return <div className={className}
    {...rest}
    >{makeList()}</div>;
}

export default ProfileLinkList;
