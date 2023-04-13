import { GetStaticProps } from "next";
import { getPostSlugs, getPostBySlug } from "@/lib/api";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import styles from "./Home.module.css";

type Props = {
  frontmatters: {
    [key: string]: any;
  }[];
};

export default function Home({ frontmatters }: Props) {
  return (
    <>
      <div style={{ background: "var(--blue-gray)" }}>
        <Head>
          <title>Bartschi Blog</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar background="var(--blue-gray)" />
        <main style={{ paddingTop: "80px" }}>
          <div
            style={{
              padding: "0 var(--page-margin)",
            }}
          >
            <h1 style={{ margin: "auto", maxWidth: "var(--max-width)", paddingLeft: "32px" }}>
              Blog
            </h1>
          </div>

          <div style={{ padding: "0px var(--page-margin)", marginTop: "24px" }}>
            <div className={styles.PostsGrid}>
              {frontmatters.map((frontmatter) => {
                return <BlogCard key={frontmatter.slug} frontmatter={frontmatter} />;
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paths = await getPostSlugs();
  const frontmatters: {
    [key: string]: any;
  }[] = [];

  for (const path of paths) {
    const post = await getPostBySlug(path.params.slug as string);
    frontmatters.push({ ...post.frontmatter, slug: post.slug });
  }

  return {
    props: {
      frontmatters: frontmatters,
    },
  };
};
