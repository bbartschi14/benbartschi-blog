import React, { PropsWithChildren } from "react";

const Paragraph: React.FC<PropsWithChildren> = (props) => {
  if (typeof props.children !== "string") {
    return <>{props.children}</>;
  }

  return <p>{props.children}</p>;
};

export default Paragraph;
