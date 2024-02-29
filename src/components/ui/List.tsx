import React from "react";

import { cn } from "../../utils/mergeClasses";

interface ListProps extends React.HTMLProps<HTMLUListElement> {
  items: React.ReactNode[];
}

function List({ items, className, ...props }: ListProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)} {...props}>
      {items.map((item) => item)}
    </ul>
  );
}

export default List;
