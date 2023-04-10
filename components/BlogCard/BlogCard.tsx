import React, { PropsWithChildren } from "react";
import styles from "./BlogCard.module.css";

type Props = {
  frontmatter: {
    [key: string]: any;
  };
};

const BlogCard: React.FC<Props> = (props) => {
  return (
    <div className={styles.card}>
      <h3>{props.frontmatter.title}</h3>
      <p>{props.frontmatter.description}</p>
      <span>{`Read ->`}</span>
    </div>
  );
};

export default BlogCard;
