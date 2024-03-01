import React from "react";
import ListItem from "./ui/ListItem";
import List from "./ui/List";

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
    Whishlist: {
      label: "Whishlist",
      action: () => {
        console.log("Whishlist");
      },
    },
    Orders: {
      label: "Orders",
      action: () => {
        console.log("Orders");
      },
    },
    Messages: {
      label: "Messages",
      action: () => {
        console.log("Messages");
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
  Logout: {
    Logout: {
      label: "Logout",
      action: () => {
        console.log("Logout");
      },
    },
  },
  MoreFromCarcheck: {
    sellOnCarcheck: {
      label: "Sell on Carcheck",
      action: () => {
        console.log("Sell on Carcheck");
      },
    },
    Advertise: {
      label: "Advertise",
      action: () => {
        console.log("Advertise");
      },
    },
    CarcheckPay: {
      label: "Carcheck Pay",
      action: () => {
        console.log("Carcheck Pay");
      },
    },
    Services: {
      label: "Services",
      action: () => {
        console.log("Services");
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

    // if parentKey contains more than 1 uppercase letter, then split parentKey and join with space
    const matchResult = parentKey.match(/[A-Z][a-z]+/g);
    if (matchResult && matchResult.length > 1) {
      parentKey = matchResult.join(" ");
    }

    return (
      <div key={parentKey} className="pb-3 mb-1 border-b-[0.05rem]">
        <h3 className="pt-4 pb-2 text-gray-300 font-medium">{parentKey}</h3>
        <List items={items} />
      </div>
    );
  });
}

function MobileNavList() {
  return <div className="px-4">{makeList()}</div>;
}

export default MobileNavList;
