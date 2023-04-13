import React, { PropsWithChildren } from "react";
import styles from "./BlogCard.module.css";
import Link from "next/link";

type Props = {
  frontmatter: {
    [key: string]: any;
  };
};

const BlogCard: React.FC<Props> = (props) => {
  return (
    <div className={styles.card}>
      <Link
        href={`/posts/${props.frontmatter.slug}`}
        style={{ position: "relative", display: "block" }}
      >
        <h3 style={{ margin: 0 }}>{props.frontmatter.title}</h3>
        <p style={{ fontSize: "var(--font-size-small)" }}>{props.frontmatter.description}</p>
        <span style={{ fontWeight: "bold" }}>{`Read post`}</span>
      </Link>
    </div>
  );
};

export default BlogCard;
