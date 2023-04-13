import Link from "next/link";
import React, { PropsWithChildren } from "react";

type Props = {
  children?: React.ReactNode | undefined;
  background?: string;
};

const Navbar: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        position: "sticky",
        zIndex: 5,
        top: "0px",
        padding: "0px var(--page-margin)",
        background: props.background || "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          zIndex: 2,
          maxWidth: "var(--max-width)",
          margin: "0 auto",
        }}
      >
        <header style={{ height: "var(--nav-height)", display: "flex", alignItems: "center" }}>
          <Link href={"/"}>Ben Bartschi</Link>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
