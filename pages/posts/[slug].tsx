import * as React from "react";
import Head from "next/head";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPostSlugs, getPostBySlug } from "@/lib/api";
import Image from "next/image";

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
      <article>
        <header>
          <div>
            <h1 itemProp="headline">{frontmatter.title}</h1>
          </div>
        </header>
        <section itemProp="articleBody">
          <Component
            components={{
              img: ({
                src,
                className,
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
