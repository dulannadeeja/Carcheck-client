import React from "react";

function ContainerSmall({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[97%] lg:max-w-[55%] mx-auto">{children}</div>;
}

export default ContainerSmall;
