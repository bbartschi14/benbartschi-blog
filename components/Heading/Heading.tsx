import { convertHeadingToId } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
import styles from "./Heading.module.css";

type Props = {
  children?: React.ReactNode | undefined;
  level?: number;
};

const Heading: React.FC<Props> = (props) => {
  const idText = convertHeadingToId(props.children as string);

  const newProps = { id: idText, className: styles.heading };
  if (props.level === 1) {
    return <h1 {...newProps}>{props.children}</h1>;
  } else if (props.level === 2) {
    return <h2 {...newProps}>{props.children}</h2>;
  } else if (props.level === 3) {
    return <h3 {...newProps}>{props.children}</h3>;
  } else if (props.level === 4) {
    return <h4 {...newProps}>{props.children}</h4>;
  } else {
    return <h5 {...newProps}>{props.children}</h5>;
  }
};

export default Heading;
