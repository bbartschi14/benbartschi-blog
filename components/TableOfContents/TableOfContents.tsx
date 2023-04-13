"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import styles from "./TableOfContents.module.css";
import { HeadingItem } from "@/lib/lib";
import { convertHeadingToId } from "@/lib/utils";

type Props = {
  headingItems: HeadingItem[];
  children?: React.ReactNode | undefined;
};

const TableOfContents: React.FC<Props> = ({ children, headingItems }) => {
  const [activeHeading, setActiveHeading] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.sort((a, b) => {
        // Sort by the top of the element
        return a.boundingClientRect.y - b.boundingClientRect.y;
      });
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
        }
      });
    }, {});
    document.querySelectorAll("h2, h3").forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.TableOfContents}>
      <span className={styles.Title}>Table of Contents</span>
      <div className={styles.HeadingsContainer}>
        {headingItems.map((heading, i) => {
          const id = convertHeadingToId(heading.text);
          return (
            <a
              key={i}
              className={`${styles.Item} ${activeHeading === id ? styles.selected : ""}`}
              href={`#${id}`}
              style={{ marginLeft: `${(heading.level - 2) * 12}px` }}
            >
              {heading.text}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default TableOfContents;
