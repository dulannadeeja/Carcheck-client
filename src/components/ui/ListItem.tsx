import React from "react";

interface ListItemProps extends React.HTMLProps<HTMLLIElement> {
  children: React.ReactNode;
}

function ListItem({ children, ...props }: ListItemProps) {
  return <li {...props}>{children}</li>;
}

export default ListItem;
