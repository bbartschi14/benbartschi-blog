import { GetStaticProps } from "next";
import { getPostSlugs, getPostBySlug } from "@/lib/api";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";

type Props = {
  frontmatters: {
    [key: string]: any;
  }[];
};

export default function Home({ frontmatters }: Props) {
  return (
    <>
      <Head>
        <title>Bartschi Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: "32px",
        }}
      >
        {frontmatters.map((frontmatter) => {
          return <BlogCard key={frontmatter.slug} frontmatter={frontmatter} />;
        })}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paths = await getPostSlugs();
  console.log(paths);
  const frontmatters: {
    [key: string]: any;
  }[] = [];

  for (const path of paths) {
    const post = await getPostBySlug(path.params.slug as string);
    frontmatters.push({ ...post.frontmatter, slug: post.slug });
  }

  console.log(frontmatters);

  return {
    props: {
      frontmatters: frontmatters,
    },
  };
};
