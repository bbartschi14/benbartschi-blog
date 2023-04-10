import * as React from "react";
import Head from "next/head";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPostSlugs, getPostBySlug } from "@/lib/api";
import Image from "next/image";
import Paragraph from "@/components/Paragraph";
import Navbar from "@/components/Navbar";
import TableOfContents from "@/components/TableOfContents";

type Props = {
  code: string;
  frontmatter: any;
};

export default function BlogPost({ code, frontmatter }: Props) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ background: "var(--color-primary)" }}>
        <Navbar />

        <header style={{ position: "relative", zIndex: 4 }}>
          <div
            style={{
              height: "var(--nav-height)",
              background: "var(--color-primary)",
              position: "sticky",
              top: "0px",
              zIndex: 4,
            }}
          ></div>
          <div
            style={{
              backgroundColor: "var(--color-primary)",
              padding: "40px var(--page-margin)",
            }}
          >
            <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
              <h1 itemProp="headline">{frontmatter.title}</h1>
              <span>{frontmatter.date}</span>
            </div>
          </div>
        </header>
        <div
          style={{
            height: "calc(2px + var(--nav-height))",
            background: "white",
            position: "sticky",
            top: "0px",
            zIndex: 4,
            marginTop: "-1px",
          }}
        />
        <main style={{ position: "relative", background: "white" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              margin: "0 auto",
              padding: "0px var(--page-margin)",
              background: "white",
            }}
          >
            <article
              style={{
                maxWidth: "var(--max-width)",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "center",
              }}
            >
              <TableOfContents />
              <section
                itemProp="articleBody"
                style={{ flexShrink: 1, maxWidth: "var(--max-width-smaller)" }}
              >
                <Component
                  components={{
                    p: Paragraph,
                    img: ({
                      src,
                      height,
                      width,
                      alt,
                    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
                      <Image
                        style={{ maxWidth: "100%", height: "auto" }}
                        priority
                        src={src as string}
                        height={height as number}
                        width={width as number}
                        alt={alt as string}
                      />
                    ),
                  }}
                />
              </section>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostBySlug(params?.slug as string);
  return {
    props: {
      ...postData,
    },
  };
};
